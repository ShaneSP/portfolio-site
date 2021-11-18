import { IconProps } from "constants/types";
import React from "react";
import { ReactComponent as Share } from "../../resources/svg/share.svg";

export const ShareIcon = (props: IconProps) => {
  return <Share width={props.size} height={props.size} {...props} />;
};
