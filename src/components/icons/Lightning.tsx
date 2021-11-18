import { IconProps } from "constants/types";
import React from "react";
import { ReactComponent as Lightning } from "../../resources/svg/lightning.svg";

export const LightningIcon = (props: IconProps) => {
  return <Lightning width={props.size} height={props.size} {...props} />;
};
