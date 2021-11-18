import { IconProps } from "constants/types";
import React from "react";
import { ReactComponent as Star } from "../../resources/svg/star.svg";

export const StarIcon = (props: IconProps) => {
  return <Star width={props.size} height={props.size} {...props} />;
};
