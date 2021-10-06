import React, { SVGProps } from "react";
import { ReactComponent as Like } from "../../resources/svg/like-24px.svg";

interface LikeIconProps extends SVGProps<any> {
  size: number;
  style?: any;
  transform?: string;
}

export const LikeIcon = (props: LikeIconProps) => {
  return <Like width={props.size} height={props.size} {...props} />;
};
