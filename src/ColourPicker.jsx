import React, { useState } from "react";
import { ChromePicker } from "react-color";

const ColorPicker = () => {
  const [color, setColor] = useState({
    hex: "#ffffff",
    rgb: { r: 255, g: 255, b: 255 },
  });
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  const handlePickerToggle = () => {
    setShowPicker((prev) => !prev);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "hex") {
      setColor((prevColor) => ({ ...prevColor, hex: value }));
    } else if (name === "r" || name === "g" || name === "b") {
      setColor((prevColor) => {
        const newRGB = {
          ...prevColor.rgb,
          [name]: parseInt(value) || 0,
        };
        const newHex = rgbToHex(newRGB);
        return { hex: newHex, rgb: newRGB };
      });
    }
  };

  const rgbToHex = (rgb) => {
    const { r, g, b } = rgb;
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  };

  const chromePickerStyles = {
    default: {
      input: {
        color: "white",
        backgroundColor: "#434343",
      },
    },
  };

  return (
    <div>
      <button onClick={handlePickerToggle}>Pick a Color</button>
      {showPicker && (
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ChromePicker
            color={color}
            onChange={handleColorChange}
            styles={chromePickerStyles}
          />
        </div>
      )}
      <div
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <label htmlFor="hex">Hex:</label>
        <input
          type="text"
          name="hex"
          value={color.hex}
          onChange={handleInputChange}
          placeholder="Hex value"
        />
        <label htmlFor="r">R:</label>
        <input
          type="number"
          name="r"
          value={color.rgb.r}
          onChange={handleInputChange}
          min="0"
          max="255"
        />
        <label htmlFor="g">G:</label>
        <input
          type="number"
          name="g"
          value={color.rgb.g}
          onChange={handleInputChange}
          min="0"
          max="255"
        />
        <label htmlFor="b">B:</label>
        <input
          type="number"
          name="b"
          value={color.rgb.b}
          onChange={handleInputChange}
          min="0"
          max="255"
        />
      </div>
      <div style={{ marginTop: "20px", textAlign: "center", color: color.hex }}>
        The selected color is: {color.hex}
      </div>
    </div>
  );
};

export default ColorPicker;
