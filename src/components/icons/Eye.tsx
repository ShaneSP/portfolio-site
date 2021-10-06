import React, { SVGProps } from "react";
import { ReactComponent as Eye } from "../../resources/svg/eye-24px.svg";

interface EyeIconProps extends SVGProps<any> {
  size: number;
  style?: any;
  transform?: string;
}

export const EyeIcon = (props: EyeIconProps) => {
  return <Eye width={props.size} height={props.size} {...props} />;
};
