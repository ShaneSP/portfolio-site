import { IconProps } from "constants/types";
import React from "react";
import { ReactComponent as Eye } from "../../resources/svg/eye.svg";

export const EyeIcon = (props: IconProps) => {
  return <Eye width={props.size} height={props.size} {...props} />;
};
