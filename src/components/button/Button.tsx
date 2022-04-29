import React from "react";
import "./button.scss";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title?: string;
  icon?: JSX.Element;
  style?: any;
  className?: string;
}

export const Button = ({ style, icon, title, ...restProps }: ButtonProps) => {
  return (
    <button style={style} {...restProps}>
      {icon && <span className="icon">{icon}</span>}
      {title && <span className="title">{title}</span>}
    </button>
  );
};

export default Button;
