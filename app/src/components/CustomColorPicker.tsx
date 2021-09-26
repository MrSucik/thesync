import React, { useState } from "react";
import reactCSS from "reactcss";
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
  const styles = reactCSS({
    default: {
      color: {
        height: "14px",
        borderRadius: "2px",
        backgroundColor: value,
        margin: "4px 0",
      },
      swatch: {
        background: "#fff",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
        backgroundColor: "rgba(255, 255, 255, 0.09)",
        width: "100%",
        padding: "4px 12px",
        borderRadius: 4,
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.15)",
        },
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        inset: 0,
      },
      label: {
        paddingBottom: 6,
        fontSize: "0.8rem",
      },
    },
  }) as any;

  return (
    <>
      <div style={styles.swatch} onClick={handleClick}>
        <span style={styles.label}>{label}</span>
        <div style={styles.color} />
      </div>
      {displayPicker && (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <SketchPicker onChange={handleChange} color={value} />
        </div>
      )}
    </>
  );
};

export default CustomColorPicker;
