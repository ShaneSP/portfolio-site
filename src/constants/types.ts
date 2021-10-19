export interface BoardColumnType {
  id: string;
  cards: CardType[];
  title: StatusType;
}

export interface CardType {
  id: string;
  title: string;
  description: string;
  labels: LabelType[];
  epic: EpicType;
  columnId: string;
}

export interface LabelType {
  title: string;
  id: string;
}

export interface EpicType {
  title: string;
  id: string;
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
