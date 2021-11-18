import { IconProps } from "constants/types";
import React from "react";
import { ReactComponent as Link } from "../../resources/svg/link.svg";

export const LinkIcon = (props: IconProps) => {
  return <Link width={props.size} height={props.size} {...props} />;
};
