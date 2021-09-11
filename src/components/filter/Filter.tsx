import React from "react";
import "./filter.scss";

interface ComponentProps {
  title: string;
  options: Option[];
}

declare type Option = {
  label: string;
  key: string | number;
};

export default function Filter(props: ComponentProps) {
  return (
    <div className="filter">
      <button>{props.title}</button>
      <ul className="dropdown">
        {props.options.length > 0 ? (
          props.options.map((o) => (
            <li>
              <a>{o.label}</a>
            </li>
          ))
        ) : (
          <li>Empty</li>
        )}
      </ul>
    </div>
  );
}
