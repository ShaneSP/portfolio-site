import { IconProps } from "constants/types";
import React from "react";
import { ReactComponent as Linkedin } from "../../resources/svg/linkedin.svg";

export const LinkedinIcon = (props: IconProps) => {
  return <Linkedin width={props.size} height={props.size} {...props} />;
};
