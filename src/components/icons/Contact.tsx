import React, { SVGProps } from "react";
import { ReactComponent as Contact } from "../../resources/svg/contact-24px.svg";

interface ContactIconProps extends SVGProps<any> {
  size: number;
}

export const ContactIcon = (props: ContactIconProps) => {
  return <Contact width={props.size} height={props.size} {...props} />;
};
