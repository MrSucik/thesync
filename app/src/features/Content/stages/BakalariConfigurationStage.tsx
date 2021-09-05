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
import moment from "moment";
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
  setContentOpen,
  setSelectedBakalariOption,
  updateUpdatingMediaLmao,
} from "../contentSlice";
import NextBackButtons from "../NextBackButtons";
import { useSnackbar } from "notistack";
import {
  czechDateFormat,
  czechShortDateFormat,
  internalDateFormat,
} from "../../../utils/constants";
import { useCurrentScene } from "../../../hooks/useCurrentScene";

const generateName = (type: ContentType, date: string) =>
  `${type === "bakalari-suplovani" ? "Suplování" : "Plán Akcí"} (${
    type === "bakalari-suplovani"
      ? moment(date).format(czechDateFormat)
      : moment(date).format(czechShortDateFormat) +
        " - " +
        moment(date).add(4, "days").format(czechShortDateFormat)
  })`;

const FormContainer = withStyles({
  root: { width: "min(80%, 240px)", margin: "auto" },
})(FormGroup);

const BakalariConfigurationStage = () => {
  const scene = useCurrentScene();
  const [defaultDate, setDefaultDate] = useState("");
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
  const { enqueueSnackbar } = useSnackbar();
  const fetchDates = async () => {
    dispatch(setSelectedBakalariOption("auto"));
    const response =
      bakalariType === "bakalari-planakci"
        ? await client.bakalariPlanAkciDates()
        : await client.bakalariSuplovaniDates();
    dispatch(setBakalariDates(response.data.dates));
    setDefaultDate(response.data.selected);
    setDatesLoading(false);
  };
  const updateFile = async () => {
    try {
      dispatch(setBakalariFileLoading(true));
      const formattedDate =
        selectedOption === "auto"
          ? selectedOption
          : moment(selectedOption, internalDateFormat).format();
      const response =
        bakalariType === "bakalari-planakci"
          ? await client.bakalariProcessPlan(formattedDate)
          : await client.bakalariProcessSupl(formattedDate);
      const { file, date } = response.data;
      const {
        data: { width, height },
      } = await client.getImageSize(file);
      const name = generateName(bakalariType, date);
      dispatch(
        updateUpdatingMediaLmao({
          file,
          fileType: "image",
          width,
          height,
        })
      );
      dispatch(setBakalariFileLoading(false));
      return name;
    } catch (error) {
      enqueueSnackbar("Nepodařilo se načíst Bakaláře", { variant: "error" });
      dispatch(setContentOpen(false));
      setTimeout(() => {
        dispatch(setContentOpen(false));
      }, 1000);
    }
  };
  useEffect(() => void fetchDates(), []);
  const manualDate = selectedOption !== "auto";
  const firestore = useFirestore();
  const author = useSelector((state) => state.firebase.auth.email);
  const handleNextClick = async () => {
    const name = await updateFile();
    const newMedia = {
      ...media,
      name: name + "",
      bakalariConfiguration: selectedOption,
      bakalariType,
      author: author + "",
      backgroundColor: scene.backgroundColor,
    };
    const { id } = await firestore.add("media", {
      ...newMedia,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    });
    dispatch(updateUpdatingMediaLmao({ ...newMedia, id }));
  };
  const handleSwitchChanged = (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => dispatch(setSelectedBakalariOption(checked ? "auto" : defaultDate));
  console.log(selectedOption, defaultDate);

  return (
    <>
      <FormContainer>
        <FormLabel style={{ marginTop: 24 }} component="legend">
          Nastavit datum
        </FormLabel>
        <FormControlLabel
          label="Automaticky"
          control={
            <Switch checked={!manualDate} onChange={handleSwitchChanged} />
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
                  {moment(date).format(czechShortDateFormat)}
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
