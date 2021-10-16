import { Avatar, ListItemAvatar } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { List } from "../../../components/List";
import ListItem from "../../../components/ListItem";
import { ListItemText } from "../../../components/ListItemText";
// import { useSelector } from "../../../store";
import { getIconSourceSvg } from "../../../utils/icons";
import { ContentType, setActiveStep, setContentType } from "../contentSlice";
import NextBackButtons from "../NextBackButtons";

interface Option {
  type: ContentType;
  name: string;
  icon: JSX.Element;
}

const options: Option[] = [
  // {
  //   type: "existing",
  //   name: "Vybrat existující",
  //   icon: <Avatar src={getIconSource("plus")} />,
  // },
  {
    type: "upload",
    name: "Nahrát soubor",
    icon: <Avatar src={getIconSourceSvg("upload-file")} />,
  },
  {
    type: "bakalari-suplovani",
    name: "Bakaláři - Suplování",
    icon: <Avatar src={getIconSourceSvg("bakalari")} />,
  },
  {
    type: "bakalari-planakci",
    name: "Bakaláři - Plán akcí",
    icon: <Avatar src={getIconSourceSvg("bakalari")} />,
  },
];

const ChooseTypeStage = () => {
  const dispatch = useDispatch();
  const createClickHandler = (type: ContentType) => () => {
    dispatch(setContentType(type));
    dispatch(setActiveStep(1));
  };
  return (
    <Box
      sx={{
        width: "80%",
        marginInline: "auto",
        marginBlock: "2rem",
        overflow: "visible",
        userSelect: "none",
      }}>
      <List>
        {options.map(option => (
          <ListItem
            sx={{ cursor: "pointer" }}
            key={option.type}
            onClick={createClickHandler(option.type)}>
            <ListItemAvatar>{option.icon}</ListItemAvatar>
            <ListItemText primary={option.name} />
          </ListItem>
        ))}
      </List>
      <NextBackButtons backHidden nextHidden />
    </Box>
  );
};

export default ChooseTypeStage;
