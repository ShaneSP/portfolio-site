import { IconProps } from "constants/types";
import React from "react";
import { ReactComponent as Add } from "../../resources/svg/add.svg";

export const AddIcon = (props: IconProps) => {
  return <Add width={props.size} height={props.size} {...props} />;
};
