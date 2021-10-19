import { v4 as uuid } from "uuid";
import { BoardColumnType, GroupBy, StatusType } from "./types";

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
const groupByOptions = [
  { id: GroupBy.ASSIGNEE, title: GroupBy.ASSIGNEE },
  { id: GroupBy.EPIC, title: GroupBy.EPIC },
  { id: GroupBy.LABEL, title: GroupBy.LABEL },
];
const defaultCard = () => {
  return {
    id: uuid(),
    title: "Card title",
    description: "",
    epic: epics[1],
    labels: [labels[Math.floor(Math.random() * 2)]],
    columnId: columnIds[1],
  };
};
const columnIds = [uuid(), uuid(), uuid(), uuid()];
const columns: BoardColumnType[] = [
  {
    id: columnIds[0],
    cards: [
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
        epic: epics[0],
        labels: labels,
        columnId: columnIds[0],
      },
    ],
    title: StatusType.TODO,
  },
  {
    id: columnIds[1],
    cards: [defaultCard(), defaultCard(), defaultCard()],
    title: StatusType.INPROGRESS,
  },
  {
    id: columnIds[2],
    cards: [],
    title: StatusType.DONE,
  },
  {
    id: columnIds[3],
    cards: [],
    title: StatusType.MISCELLANEOUS,
  },
];

export { epics, labels, groupByOptions, columns, defaultCard };
