/* eslint-disable react-hooks/exhaustive-deps */
import {
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Select,
  Switch,
  withStyles,
} from "@material-ui/core";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "../../../store";
import client from "../../../utils/client";
import firebase from "firebase";
import {
  ContentType,
  setBakalariDates,
  setBakalariFileLoading,
  setSelectedBakalariOption,
  setUpdatingMedia,
  updateUpdatingMediaLmao,
} from "../contentSlice";
import NextBackButtons from "../NextBackButtons";

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
  const media = useSelector((state) => state.content.updatingMedia);
  const fetchDates = async () => {
    dispatch(setBakalariFileLoading(true));
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
    dispatch(setBakalariFileLoading(false));
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
  useEffect(() => void updateFile(), [selectedOption]);
  const manualDate = selectedOption !== "auto";
  const firestore = useFirestore();
  const handleNextClick = async () => {
    const newMedia = {
      ...media,
      bakalariConfiguration: selectedOption,
      bakalariType,
      name:
        bakalariType === "bakalari-planakci"
          ? "Bakaláři - Plán Akcí"
          : "Bakaláři - Suplování",
    };
    const { id } = await firestore.add("media", {
      ...newMedia,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    });
    dispatch(setUpdatingMedia({ ...newMedia, id }));
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
        {manualDate && (
          <Select
            margin="none"
            variant="outlined"
            value={selectedOption}
            onChange={(event) =>
              dispatch(setSelectedBakalariOption(event.target.value as string))
            }
          >
            {dates.map((date) => (
              <MenuItem key={date} value={date}>
                {moment(date).format("DD. MM.")}
              </MenuItem>
            ))}
          </Select>
        )}
      </FormContainer>
      <NextBackButtons onNextClick={handleNextClick} />
    </>
  );
};

export default BakalariConfigurationStage;
