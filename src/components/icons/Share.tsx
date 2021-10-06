import React, { SVGProps } from "react";
import { ReactComponent as Share } from "../../resources/svg/share-24px.svg";

interface ShareIconProps extends SVGProps<any> {
  size: number;
  style?: any;
  transform?: string;
}

export const ShareIcon = (props: ShareIconProps) => {
  return <Share width={props.size} height={props.size} {...props} />;
};
