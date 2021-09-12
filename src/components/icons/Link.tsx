import React, { SVGProps } from "react";
import { ReactComponent as Link } from "../../resources/svg/link-24px.svg";

interface LinkIconProps extends SVGProps<any> {
  size: number;
  style?: any;
}

export const LinkIcon = (props: LinkIconProps) => {
  return <Link width={props.size} height={props.size} {...props} />;
};
