import React, { SVGProps } from "react";
import { ReactComponent as Github } from "../../resources/svg/github.svg";

interface GithubIconProps extends SVGProps<any> {
  size: number;
}

export const GithubIcon = (props: GithubIconProps) => {
  return <Github width={props.size} height={props.size} {...props} />;
};
