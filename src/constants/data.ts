import { v4 as uuid } from "uuid";
import { BoardColumnType, CardType, GroupBy, StatusType } from "./types";

const epics = [
  {
    id: uuid(),
    title: "Avatar Customization",
  },
  {
    id: uuid(),
    title: "epic",
  },
];
const labels = [
  {
    id: uuid(),
    title: "label1",
  },
  {
    id: uuid(),
    title: "label2",
  },
];
const assignees = [
  {
    id: uuid(),
    name: "Shane Steele-Pardue",
  },
];
const groupByOptions = [
  { id: GroupBy.ASSIGNEE, title: GroupBy.ASSIGNEE },
  { id: GroupBy.EPIC, title: GroupBy.EPIC },
];
const createCard = (
  title: string,
  columnId: string = columnIds[1],
  order: number = 0
): CardType => {
  return {
    id: uuid(),
    title,
    description: "",
    labels: [],
    columnId,
    assigneeId: assignees[0].id,
    order,
  };
};
const columnIds = [uuid(), uuid(), uuid(), uuid()];
const columns: BoardColumnType[] = [
  {
    id: columnIds[0],
    title: StatusType.TODO,
  },
  {
    id: columnIds[1],
    title: StatusType.INPROGRESS,
  },
  {
    id: columnIds[2],
    title: StatusType.DONE,
  },
  {
    id: columnIds[3],
    title: StatusType.MISCELLANEOUS,
  },
];
const cards: CardType[] = [
  {
    id: uuid(),
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute
      irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum.`,
    epicId: epics[0].id,
    labels: labels,
    columnId: columnIds[0],
    assigneeId: assignees[0].id,
    order: 0,
  },
  createCard("Default card", undefined, 0),
  createCard("Default card", undefined, 1),
  createCard("Default card", undefined, 2),
];

export { epics, labels, assignees, groupByOptions, columns, createCard, cards };
