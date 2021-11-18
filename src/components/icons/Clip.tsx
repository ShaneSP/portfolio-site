import { IconProps } from "constants/types";
import React from "react";
import { ReactComponent as Clip } from "../../resources/svg/clip.svg";

export const ClipIcon = (props: IconProps) => {
  return (
    <Clip
      transform="rotate(180)"
      width={props.size}
      height={props.size}
      {...props}
    />
  );
};
