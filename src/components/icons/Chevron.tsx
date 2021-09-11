import React, { SVGProps } from "react";
import { ReactComponent as ChevronDown } from "../../resources/svg/chevron-24px.svg";

interface ChevronDownIconProps extends SVGProps<any> {
  size: number;
  style?: any;
  transform?: string;
}

export const ChevronDownIcon = (props: ChevronDownIconProps) => {
  return <ChevronDown width={props.size} height={props.size} {...props} />;
};
