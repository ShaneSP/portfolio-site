import { IconProps } from "constants/types";
import React from "react";
import { ReactComponent as Cog } from "../../resources/svg/cog.svg";

export const CogIcon = (props: IconProps) => {
  return <Cog width={props.size} height={props.size} {...props} />;
};
