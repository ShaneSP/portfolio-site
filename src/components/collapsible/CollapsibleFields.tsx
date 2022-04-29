import { ChevronDownIcon } from "components/icons/Chevron";
import React, { useState } from "react";
import "./collapsibleFields.scss";

export interface FieldType {
  label: string;
  value: any;
}

interface CollapsibleFieldsProps {
  title: string;
  fields: FieldType[];
}

const CollapsibleFields = ({ title, fields = [] }: CollapsibleFieldsProps) => {
  const [active, setActive] = useState(false);
  const onClick = () => {
    setActive(!active);
  };
  return (
    <div className="collapsible-container">
      <div className="collapsible-action" onClick={onClick}>
        <strong>{title}</strong>
        {!active && (
          <span>{fields.map((field) => field.label).join(", ")}</span>
        )}
        <ChevronDownIcon
          size={18}
          className="icon"
          transform={active ? "rotate(180)" : ""}
        />
      </div>
      <div className={`collapsible-content ${active ? "active" : ""}`}>
        {fields.map((field) => {
          return (
            <div className="field-container">
              <h2 className="field-label">{field.label}</h2>
              <span className="field-value">{field.value || "None"}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CollapsibleFields;
