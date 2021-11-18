import React, { SVGProps } from "react";
import { ReactComponent as Lightning } from "../../resources/svg/lightning-24px.svg";

interface LightningIconProps extends SVGProps<any> {
  size: number;
}

export const LightningIcon = (props: LightningIconProps) => {
  return <Lightning width={props.size} height={props.size} {...props} />;
};
