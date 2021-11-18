import { IconProps } from "constants/types";
import React from "react";
import { ReactComponent as User } from "../../resources/svg/user.svg";

export const UserIcon = (props: IconProps) => {
  return <User width={props.size} height={props.size} {...props} />;
};
