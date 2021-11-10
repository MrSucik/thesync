import React, { useState } from "react";
import { SketchPicker, ColorResult } from "react-color";

interface Props {
  value: string;
  name: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const CustomColorPicker: React.FC<Props> = ({
  onChange,
  value,
  label,
  name,
}) => {
  const [displayPicker, setDisplayPicker] = useState(false);
  const handleClick = () => setDisplayPicker(!displayPicker);
  const handleClose = () => setDisplayPicker(false);
  const transformEvent = (
    event: React.ChangeEvent<HTMLInputElement>,
    color: ColorResult
  ) => {
    event.target.name = name;
    // event.target.value = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    event.target.value = color.hex;
  };
  const handleChange = (
    color: ColorResult,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    transformEvent(event, color);
    onChange(event);
  };

  return (
    <>
      <div
        style={{
          background: "#fff",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-block",
          cursor: "pointer",
          backgroundColor: "rgba(255, 255, 255, 0.09)",
          width: "100%",
          padding: "4px 12px",
          borderRadius: 4,
          // "&:hover": {
          //   backgroundColor: "rgba(255, 255, 255, 0.15)",
          // },
        }}
        onClick={handleClick}>
        <span
          style={{
            paddingBottom: 6,
            fontSize: "0.8rem",
          }}>
          {label}
        </span>
        <div
          style={{
            height: "14px",
            borderRadius: "2px",
            backgroundColor: value,
            margin: "4px 0",
          }}
        />
      </div>
      {displayPicker && (
        <div
          style={{
            position: "absolute",
            zIndex: 2,
          }}>
          <div
            style={{
              position: "fixed",
              inset: 0,
            }}
            onClick={handleClose}
          />
          <SketchPicker onChange={handleChange} color={value} />
        </div>
      )}
    </>
  );
};

export default CustomColorPicker;
