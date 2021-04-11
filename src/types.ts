export interface BoardColumnType {
  id: string;
  cards: CardType[];
  title: string;
}

export interface CardType {
  title: string;
  description: string;
  label: string;
  labelId: string;
  epic: string;
  epicId: string;
}

export enum GroupBy {
  Epic = "EPIC",
  Label = "LABEL",
}