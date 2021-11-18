import { IconProps } from "constants/types";
import React from "react";
import { ReactComponent as TreeNode } from "../../resources/svg/tree-node.svg";

export const TreeNodeIcon = (props: IconProps) => {
  return <TreeNode width={props.size} height={props.size} {...props} />;
};
