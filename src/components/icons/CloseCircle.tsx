import { IconProps } from "constants/types";
import React from "react";
import { ReactComponent as CloseCircle } from "../../resources/svg/close-black-circle.svg";

export const CloseCircleIcon = (props: IconProps) => {
  return <CloseCircle width={props.size} height={props.size} {...props} />;
};
