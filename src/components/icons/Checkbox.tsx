import React, { SVGProps } from "react";
import { ReactComponent as Checkbox } from "../../resources/svg/checkbox-24px.svg";

interface CheckboxIconProps extends SVGProps<any> {
  size: number;
  style?: any;
  transform?: string;
}

export const CheckboxIcon = (props: CheckboxIconProps) => {
  return <Checkbox width={props.size} height={props.size} {...props} />;
};
