import React, { SVGProps } from "react";
import { ReactComponent as Board } from "../../resources/svg/board-24px.svg";

interface BoardIconProps extends SVGProps<any> {
  size: number;
}

export const BoardIcon = (props: BoardIconProps) => {
  return <Board width={props.size} height={props.size} {...props} />;
};
