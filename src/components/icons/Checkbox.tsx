import { IconProps } from "constants/types";
import React from "react";
import { ReactComponent as Checkbox } from "../../resources/svg/checkbox.svg";

export const CheckboxIcon = (props: IconProps) => {
  return <Checkbox width={props.size} height={props.size} {...props} />;
};
