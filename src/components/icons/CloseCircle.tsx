import React, { SVGProps } from "react";
import { ReactComponent as CloseCircle } from "../../resources/svg/close_black_circle_24px.svg";

interface CloseCircleIconProps extends SVGProps<any> {
  size: number;
  style?: any;
}

export const CloseCircleIcon = (props: CloseCircleIconProps) => {
  return <CloseCircle width={props.size} height={props.size} {...props} />;
};
