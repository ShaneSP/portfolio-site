import React, { SVGProps } from "react";
import { ReactComponent as Cog } from "../../resources/svg/cog-24px.svg";

interface CogIconProps extends SVGProps<any> {
  size: number;
  style?: any;
  transform?: string;
}

export const CogIcon = (props: CogIconProps) => {
  return <Cog width={props.size} height={props.size} {...props} />;
};
