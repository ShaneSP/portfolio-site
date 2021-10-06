import { AddIcon } from "components/icons/Add";
import React, { useState } from "react";
import "./button.scss";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title: string;
  icon?: JSX.Element;
  style?: any;
}

export const Button = (props: ButtonProps) => {
  const { style, icon, title, ...restProps } = props;
  return (
    <button style={props.style} {...restProps}>
      {props.icon && <span className="icon">{props.icon}</span>}
      <span className="title">{props.title}</span>
    </button>
  );
};

export default Button;
