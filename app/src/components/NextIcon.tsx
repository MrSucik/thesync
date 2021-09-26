import { Icon } from "@mui/material";
import { keyframes } from "@mui/styled-engine";

const slide = keyframes`
0%: {
  transform: translateX(4px),
},
100%: {
  transform: translateX(0),
}`;

const NextIcon = () => {
  return (
    <Icon
      sx={{
        marginLeft: 4,
        fontSize: 16,
        alignSelf: "center",
        animation: slide + " 1s alternate infinite ease-in-out",
      }}
    >
      arrow_forward_ios
    </Icon>
  );
};

export default NextIcon;
