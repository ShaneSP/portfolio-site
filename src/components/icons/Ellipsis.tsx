import { IconProps } from "constants/types";
import React from "react";
import { ReactComponent as Ellipsis } from "../../resources/svg/ellipsis.svg";

export const EllipsisIcon = (props: IconProps) => {
  return <Ellipsis width={props.size} height={props.size} {...props} />;
};
