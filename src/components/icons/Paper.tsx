import React, { SVGProps } from "react";
import { ReactComponent as Paper } from "../../resources/svg/paper-24px.svg";

interface PaperIconProps extends SVGProps<any> {
  size: number;
}

export const PaperIcon = (props: PaperIconProps) => {
  return <Paper width={props.size} height={props.size} {...props} />;
};
