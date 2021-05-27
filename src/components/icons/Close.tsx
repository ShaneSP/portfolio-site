import React, { SVGProps } from "react";
import { ReactComponent as Close } from "../../resources/svg/close_black_24dp.svg";

interface CloseIconProps extends SVGProps<any> {
  size: number;
}

export const CloseIcon = (props: CloseIconProps) => {
  return <Close width={props.size} height={props.size} {...props} />;
};
