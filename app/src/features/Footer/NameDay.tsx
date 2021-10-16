import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../store/useSelector";
import { fetchNameDay } from "./nameDaySlice";

const NameDay = () => {
  const { initialized, name } = useSelector(state => state.nameDay);
  const dispatch = useDispatch();
  useEffect(() => {
    const updateNameDay = () => dispatch(fetchNameDay());
    updateNameDay();
    const interval = setInterval(updateNameDay, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  return !initialized ? null : (
    <Box
      style={{
        paddingLeft: 4,
        height: 64,
        display: "flex",
        alignItems: "center",
        position: "absolute",
        right: 0,
      }}>
      <Typography
        variant="caption"
        style={{
          fontSize: "1rem",
          fontWeight: "bold",
          textAlign: "right",
          textTransform: "capitalize",
          whiteSpace: "nowrap",
        }}>
        {name}
      </Typography>
    </Box>
  );
};

export default NameDay;
