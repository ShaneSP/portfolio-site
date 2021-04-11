import React, { SVGProps } from "react";
import { ReactComponent as Add } from "../../resources/svg/add-24px.svg";

interface AddIconProps extends SVGProps<any> {
  size: number;
}

export const AddIcon = (props: AddIconProps) => {
  return <Add width={props.size} height={props.size} {...props} />;
};
