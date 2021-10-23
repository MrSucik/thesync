import { Box, Typography } from "@mui/material";
import { NameDayModel } from "../../definitions";
import { useSelector } from "../../store/useSelector";

interface FirestoreDatabase {
  nameday: { current: NameDayModel };
}

const useFirestoreData = <T,>(selector: (state: FirestoreDatabase) => T) =>
  selector(useSelector(state => state.firestore.data as FirestoreDatabase));

const NameDay = () => {
  const { name } = useFirestoreData(state => state.nameday.current);
  return (
    <Box
      sx={{
        paddingLeft: 3,
        height: 64,
        display: "flex",
        alignItems: "center",
        position: "absolute",
        left: 0,
      }}>
      <Typography
        variant="caption"
        sx={{
          fontSize: "1rem",
          fontWeight: "bold",
          whiteSpace: "nowrap",
        }}>
        Dnes má svátek: {name}
      </Typography>
    </Box>
  );
};

export default NameDay;
