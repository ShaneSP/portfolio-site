import { IconProps } from "constants/types";
import React from "react";
import { ReactComponent as Outlook } from "../../resources/svg/outlook.svg";

export const OutlookIcon = (props: IconProps) => {
  return <Outlook width={props.size} height={props.size} {...props} />;
};
