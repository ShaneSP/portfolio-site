import React, { SVGProps } from "react";
import { ReactComponent as Clip } from "../../resources/svg/clip-24px.svg";

interface ClipIconProps extends SVGProps<any> {
  size: number;
  style?: any;
}

export const ClipIcon = (props: ClipIconProps) => {
  return (
    <Clip
      transform="rotate(180)"
      width={props.size}
      height={props.size}
      {...props}
    />
  );
};
