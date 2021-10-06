import React, { SVGProps } from "react";
import { ReactComponent as Ellipsis } from "../../resources/svg/ellipsis-24px.svg";

interface EllipsisIconProps extends SVGProps<any> {
  size: number;
  style?: any;
  transform?: string;
}

export const EllipsisIcon = (props: EllipsisIconProps) => {
  return <Ellipsis width={props.size} height={props.size} {...props} />;
};
