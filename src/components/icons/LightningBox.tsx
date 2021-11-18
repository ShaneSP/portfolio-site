import { IconProps } from "constants/types";
import React from "react";
import { ReactComponent as LightningBox } from "../../resources/svg/lightning-box.svg";

export const LightningBoxIcon = (props: IconProps) => {
  return <LightningBox width={props.size} height={props.size} {...props} />;
};
