// CustomDropdown.jsx
import React, { useState } from "react";
import "./CustomDropdown.css";

export default function CustomDropdown({ options, selected, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="custom-dropdown">
      <div
        className="selected"
        onClick={() => setOpen(!open)}
      >
        {selected.charAt(0).toUpperCase() + selected.slice(1).toLowerCase()}
      </div>
      {open && (
        <ul className="options">
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt.charAt(0).toUpperCase() + opt.slice(1).toLowerCase()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
