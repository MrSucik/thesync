/* eslint-disable react-hooks/exhaustive-deps */
import {
  FormControlLabel,
  FormGroup,
  FormLabel,
  LinearProgress,
  MenuItem,
  Select,
  Switch,
  withStyles,
} from "@material-ui/core";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "../../../store";
import client from "../../../utils/client";
import firebase from "firebase/app";
import {
  ContentType,
  setBakalariDates,
  setBakalariFileLoading,
  setSelectedBakalariOption,
  updateUpdatingMediaLmao,
} from "../contentSlice";
import NextBackButtons from "../NextBackButtons";

const generateName = (bakalariType: string, manualDate: Moment) =>
  bakalariType === "bakalari-suplovani"
    ? `Suplování (${manualDate.format("DD. MM.")})`
    : `Plán Akcí (${manualDate
        .startOf("isoWeek")
        .format("DD. MM.")} - ${manualDate
        .startOf("isoWeek")
        .add(5, "days")
        .format("DD. MM.")})`;

const FormContainer = withStyles({
  root: { width: "min(80%, 240px)", margin: "auto" },
})(FormGroup);

const BakalariConfigurationStage = () => {
  const bakalariType = useSelector<ContentType>(
    (state) => state.content.type as ContentType
  );
  const dispatch = useDispatch();
  const dates = useSelector((state) => state.content.bakalariDates);
  const selectedOption = useSelector(
    (state) => state.content.bakalariSelectedOption
  );
  const [datesLoading, setDatesLoading] = useState(true);
  const media = useSelector((state) => state.content.updatingMedia);
  const fetchDates = async () => {
    dispatch(setSelectedBakalariOption("auto"));
    const response =
      bakalariType === "bakalari-planakci"
        ? await client.bakalariPlanAkciDates()
        : await client.bakalariSuplovaniDates();
    dispatch(
      setBakalariDates(
        response.data.map((x) => moment(x, "DD-MM-YYYY").format())
      )
    );
    setDatesLoading(false);
  };
  const updateFile = async () => {
    dispatch(setBakalariFileLoading(true));
    const response =
      bakalariType === "bakalari-planakci"
        ? await client.bakalariProcessPlan(selectedOption)
        : await client.bakalariProcessSupl(selectedOption);
    const file = response.data;
    dispatch(
      updateUpdatingMediaLmao({
        file,
        fileType: "image",
      })
    );
    dispatch(setBakalariFileLoading(false));
  };
  useEffect(() => void fetchDates(), []);
  const manualDate = selectedOption !== "auto";
  const firestore = useFirestore();
  const handleNextClick = async () => {
    await updateFile();
    const newMedia = {
      ...media,
      bakalariConfiguration: selectedOption,
      bakalariType,
      name: generateName(
        bakalariType,
        manualDate ? moment(selectedOption) : moment()
      ),
    };
    const { id } = await firestore.add("media", {
      ...newMedia,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    });
    dispatch(updateUpdatingMediaLmao({ ...newMedia, id }));
  };
  return (
    <>
      <FormContainer>
        <FormLabel style={{ marginTop: 24 }} component="legend">
          Nastavit datum
        </FormLabel>
        <FormControlLabel
          label="Automaticky"
          control={
            <Switch
              checked={!manualDate}
              onChange={(_, checked) =>
                dispatch(setSelectedBakalariOption(checked ? "auto" : dates[0]))
              }
            />
          }
        />
        {manualDate &&
          (datesLoading ? (
            <LinearProgress />
          ) : (
            <Select
              margin="none"
              variant="outlined"
              value={selectedOption}
              onChange={(event) =>
                dispatch(
                  setSelectedBakalariOption(event.target.value as string)
                )
              }
            >
              {dates.map((date) => (
                <MenuItem key={date} value={date}>
                  {moment(date).format("DD. MM.")}
                </MenuItem>
              ))}
            </Select>
          ))}
      </FormContainer>
      <NextBackButtons onNextClick={handleNextClick} />
    </>
  );
};

export default BakalariConfigurationStage;
