import { IconProps } from "constants/types";
import React from "react";
import { ReactComponent as ChevronDown } from "../../resources/svg/chevron.svg";

export const ChevronDownIcon = (props: IconProps) => {
  return <ChevronDown width={props.size} height={props.size} {...props} />;
};
