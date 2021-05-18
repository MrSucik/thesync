import React, { forwardRef } from "react";
import { Box, BoxProps } from "@material-ui/core";
import Glowing from "./Glowing";
import Disabled from "./Disabled";

interface Props {
  disabled?: boolean;
  fill?: boolean;
  clickable?: boolean;
  outerBoxProps?: BoxProps;
}

const Card: React.FC<Props> = forwardRef<any, Props>(
  ({ children, outerBoxProps, disabled, fill, clickable }, ref) => {
    return (
      <Box
        // @ts-ignore
        ref={ref}
        flex={1}
        margin={3}
        marginBottom={3}
        {...outerBoxProps}
      >
        <Box
          position="relative"
          style={{
            backgroundColor: fill ? "rgb(66, 96, 143)" : "transparent",
            cursor: clickable ? "pointer" : "auto",
            borderRadius: 4,
            overflow: "auto",
            paddingTop: fill ? 0 : 8,
          }}
        >
          {clickable && <Glowing />}
          {disabled && <Disabled />}
          {children}
        </Box>
      </Box>
    );
  }
);

export default Card;
