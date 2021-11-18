import { IconProps } from "constants/types";
import React from "react";
import { ReactComponent as Close } from "../../resources/svg/close-black.svg";

export const CloseIcon = (props: IconProps) => {
  return <Close width={props.size} height={props.size} {...props} />;
};
