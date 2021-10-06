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

export const CollapsibleFields = ({
  title,
  fields = [],
}: CollapsibleFieldsProps) => {
  const [isActive, setIsActive] = useState(false);
  const onClick = () => {
    setIsActive(!isActive);
  };
  return (
    <div className="collapsible-container">
      <div className="collapsible-action" onClick={onClick}>
        <strong>{title}</strong>
        {!isActive && (
          <span>{fields.map((field) => field.label).join(", ")}</span>
        )}
        <ChevronDownIcon
          size={18}
          className="icon"
          transform={isActive ? "rotate(180)" : ""}
        />
      </div>
      <div className={`collapsible-content ${isActive ? "active" : ""}`}>
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
