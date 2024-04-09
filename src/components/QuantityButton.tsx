import React, { FC } from "react";
import plus from "../Pictures/icon-plus.svg";
import minus from "../Pictures/icon-minus.svg";

interface QuantityButtonProps {
  onQuant: number;
  onRemove: () => void;
  onAdd: () => void;
}

const QuantityButton: FC<QuantityButtonProps> = ({ onQuant, onRemove, onAdd }) => {
  return (
    <div className="amount">
      <button className="minus" onClick={onRemove} disabled={onQuant === 0}>
        <img src={minus} alt="icon-minus" />
      </button>
      <p>{onQuant}</p>
      <button className="plus" onClick={onAdd} disabled={onQuant === 100}>
        <img src={plus} alt="icon-plus" />
      </button>
    </div>
  );
};

export default QuantityButton;
