import { IconProps } from "constants/types";
import React from "react";
import { ReactComponent as Contact } from "../../resources/svg/contact.svg";

export const ContactIcon = (props: IconProps) => {
  return <Contact width={props.size} height={props.size} {...props} />;
};
