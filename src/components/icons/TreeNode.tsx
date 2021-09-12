import React, { SVGProps } from "react";
import { ReactComponent as TreeNode } from "../../resources/svg/tree-node-24px.svg";

interface TreeNodeIconProps extends SVGProps<any> {
  size: number;
  style?: any;
}

export const TreeNodeIcon = (props: TreeNodeIconProps) => {
  return <TreeNode width={props.size} height={props.size} {...props} />;
};
