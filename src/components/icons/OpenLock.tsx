import React, { SVGProps } from "react";
import { ReactComponent as OpenLock } from "../../resources/svg/open-lock-24px.svg";

interface OpenLockIconProps extends SVGProps<any> {
  size: number;
  style?: any;
  transform?: string;
}

export const OpenLockIcon = (props: OpenLockIconProps) => {
  return <OpenLock width={props.size} height={props.size} {...props} />;
};
