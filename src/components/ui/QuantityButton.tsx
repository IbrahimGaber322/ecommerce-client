import React, { FC } from "react";
import plus from "../../assets/icons/icon-plus.svg";
import minus from "../../assets/icons/icon-minus.svg";
import { Box, IconButton } from "@mui/material";

interface QuantityButtonProps {
  onQuant: number;
  onRemove: () => void;
  onAdd: () => void;
}

const QuantityButton: FC<QuantityButtonProps> = ({
  onQuant,
  onRemove,
  onAdd,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 3 }}>
      <IconButton className="minus" onClick={onRemove} disabled={onQuant === 0}>
        <img src={minus} alt="icon-minus" />
      </IconButton>
      <p>{onQuant}</p>
      <IconButton className="plus" onClick={onAdd} disabled={onQuant === 100}>
        <img src={plus} alt="icon-plus" />
      </IconButton>
    </Box>
  );
};

export default QuantityButton;
