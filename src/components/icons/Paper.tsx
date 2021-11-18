import { IconProps } from "constants/types";
import React from "react";
import { ReactComponent as Paper } from "../../resources/svg/paper.svg";

export const PaperIcon = (props: IconProps) => {
  return <Paper width={props.size} height={props.size} {...props} />;
};
