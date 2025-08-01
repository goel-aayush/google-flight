import React from "react";

const Chip = ({ label, index, icon, variant }) => {
  return (
    <Chip
      key={index}
      label={label}
      icon={icon}
      variant={variant}
      sx={{
        fontWeight: "bold",
        padding: "17px",
        cursor: "pointer",
        fontSize: "14px",
        whiteSpace: "nowrap",
        borderRadius: "20px",
      }}
    />
  );
};

export default Chip;
