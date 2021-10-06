import React, { SVGProps } from "react";
import { ReactComponent as Outlook } from "../../resources/svg/outlook-24px.svg";

interface OutlookIconProps extends SVGProps<any> {
  size: number;
  style?: any;
}

export const OutlookIcon = (props: OutlookIconProps) => {
  return <Outlook width={props.size} height={props.size} {...props} />;
};
