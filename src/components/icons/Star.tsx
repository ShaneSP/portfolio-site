import React, { SVGProps } from "react";
import { ReactComponent as Star } from "../../resources/svg/star-24px.svg";

interface StarIconProps extends SVGProps<any> {
  size: number;
}

export const StarIcon = (props: StarIconProps) => {
  return <Star width={props.size} height={props.size} {...props} />;
};
