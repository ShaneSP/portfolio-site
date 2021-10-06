import React, { SVGProps } from "react";
import { ReactComponent as Sort } from "../../resources/svg/sort-24px.svg";

interface SortIconProps extends SVGProps<any> {
  size: number;
  style?: any;
}

export const SortIcon = (props: SortIconProps) => {
  return <Sort width={props.size} height={props.size} {...props} />;
};
