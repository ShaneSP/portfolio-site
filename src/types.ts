export interface BoardColumnType {
  id: string;
  cards: CardType[];
  title: string;
}

export interface CardType {
  id: string;
  title: string;
  description: string;
  labels: LabelType[];
  epic: EpicType;
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
  Epic = "EPIC",
  Label = "LABEL",
}
