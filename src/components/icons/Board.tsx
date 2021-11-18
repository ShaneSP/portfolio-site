import { IconProps } from "constants/types";
import React from "react";
import { ReactComponent as Board } from "../../resources/svg/board.svg";

export const BoardIcon = (props: IconProps) => {
  return <Board width={props.size} height={props.size} {...props} />;
};
