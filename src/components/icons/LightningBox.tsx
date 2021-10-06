import React, { SVGProps } from "react";
import { ReactComponent as LightningBox } from "../../resources/svg/lightning-box-24px.svg";

interface LightningBoxIconProps extends SVGProps<any> {
  size: number;
  style?: any;
  transform?: string;
}

export const LightningBoxIcon = (props: LightningBoxIconProps) => {
  return <LightningBox width={props.size} height={props.size} {...props} />;
};
