import { IconProps } from "constants/types";
import React from "react";
import { ReactComponent as OpenLock } from "../../resources/svg/open-lock.svg";

export const OpenLockIcon = (props: IconProps) => {
  return <OpenLock width={props.size} height={props.size} {...props} />;
};
