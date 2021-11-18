import { IconProps } from "constants/types";
import React from "react";
import { ReactComponent as Like } from "../../resources/svg/like.svg";

export const LikeIcon = (props: IconProps) => {
  return <Like width={props.size} height={props.size} {...props} />;
};
