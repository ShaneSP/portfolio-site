import React, { SVGProps } from "react";
import { ReactComponent as User } from "../../resources/svg/user-24px.svg";

interface UserIconProps extends SVGProps<any> {
  size: number;
}

export const UserIcon = (props: UserIconProps) => {
  return <User width={props.size} height={props.size} {...props} />;
};
