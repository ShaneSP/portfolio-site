import { SVGProps } from "react";

export interface BoardColumnType {
  id: string;
  title: StatusType;
}

export interface CardType {
  id: string;
  title: string;
  description: string;
  labels: LabelType[];
  epicId?: string;
  columnId: string;
  assigneeId?: string;
  order: number;
}

export interface LabelType {
  title: string;
  id: string;
}

export interface EpicType {
  title: string;
  id: string;
}

export interface ColumnGroupType {
  columnId: string;
  groupBy: GroupBy;
  cards: CardType[];
}

export enum GroupBy {
  EPIC = "Epic",
  LABEL = "Label",
  ASSIGNEE = "Assignee",
}

export enum StatusType {
  TODO = "To Do",
  INPROGRESS = "In Progress",
  DONE = "Done",
  MISCELLANEOUS = "Miscellaneous",
}

export interface IconProps extends SVGProps<any> {
  size: number;
}
