import { IconProps } from "constants/types";
import React from "react";
import { ReactComponent as Sort } from "../../resources/svg/sort.svg";

export const SortIcon = (props: IconProps) => {
  return <Sort width={props.size} height={props.size} {...props} />;
};
