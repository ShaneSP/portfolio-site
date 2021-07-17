import React, { useState, Component } from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { BoardColumnType, CardType, EpicType, GroupBy } from "types";
import BoardColumn from "./BoardColumn";
import "./content.scss";
import Filter from "./Filter";
import Modal from "./Modal";

const defaultCard = () => {
  return {
    id: uuid(),
    title: "Card title",
    description: "",
    epic: { id: uuid(), title: "epic" },
    labels: [
      { id: uuid(), title: "label1" },
      { id: uuid(), title: "label2" },
    ],
  };
};
const defaultColumns: BoardColumnType[] = [
  {
    id: uuid(),
    cards: [
      {
        id: uuid(),
        title:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        description: "",
        epic: { id: uuid(), title: "Avatar Customization" },
        labels: [
          { id: uuid(), title: "label1" },
          { id: uuid(), title: "label2" },
        ],
      },
    ],
    title: "To Do",
  },
  {
    id: uuid(),
    cards: [defaultCard(), defaultCard(), defaultCard()],
    title: "In Progress",
  },
  {
    id: uuid(),
    cards: [],
    title: "Done",
  },
];

/**
 * Helper function for re-ordering drag and drop lists
 * Copied from https://codesandbox.io/s/ql08j35j3q?file=/index.js
 */
const reorder = (list: CardType[], startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 * Copied from https://codesandbox.io/s/ql08j35j3q?file=/index.js
 */
const move = (
  source: CardType[],
  destination: CardType[],
  droppableSource,
  droppableDestination
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

interface ContentProps {}
interface ContentState {
  groupBy: GroupBy;
  columns: Map<string, BoardColumnType>;
  searchTerm?: string;
  cardDetailId?: string;
}

class Content extends Component<ContentProps, ContentState> {
  constructor(props) {
    super(props);
    this.state = {
      groupBy: GroupBy.Epic,
      columns: new Map(defaultColumns.map((col) => [col.id, col])),
    };
  }

  getList = (id: string) => this.state.columns.get(id)?.cards;

  onCreate = (columnId: string) => () => {
    const card = defaultCard();
    const column = this.state.columns.get(columnId);
    if (column)
      this.setState({
        columns: new Map(
          this.state.columns.set(columnId, {
            ...column,
            cards: [...column.cards, card],
          })
        ),
      });
  };

  /**
   * Copied from https://codesandbox.io/s/ql08j35j3q?file=/index.js
   */
  onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const column = this.state.columns.get(source.droppableId);
      if (column) {
        const cards = reorder(column.cards, source.index, destination.index);

        this.setState({
          columns: new Map(
            this.state.columns.set(source.droppableId, {
              ...column,
              cards,
            })
          ),
        });
      }
    } else {
      const sourceColumn = this.state.columns.get(source.droppableId);
      const destinationColumn = this.state.columns.get(destination.droppableId);
      if (sourceColumn && destinationColumn) {
        const result = move(
          sourceColumn.cards,
          destinationColumn.cards,
          source,
          destination
        );

        this.setState({
          columns: new Map(
            this.state.columns
              .set(source.droppableId, {
                ...sourceColumn,
                cards: result[source.droppableId],
              })
              .set(destination.droppableId, {
                ...destinationColumn,
                cards: result[destination.droppableId],
              })
          ),
        });
      }
    }
  };

  onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    if (
      searchTerm &&
      searchTerm.length &&
      this.state.searchTerm !== searchTerm
    ) {
      this.setState({
        searchTerm,
      });
    } else if (searchTerm.length == 0) {
      this.setState({
        searchTerm: undefined,
      });
    }
  };

  onOpenCardDetail = (id: string) => () => {
    this.setState({
      cardDetailId: id,
    });
  };

  onCloseCardDetail = () => {
    this.setState({
      cardDetailId: undefined,
    });
  };

  getCardDetail = (id?: string): CardType | undefined => {
    if (!id) return undefined;
    const { columns } = this.state;
    const cards = Array.from(columns.values()).reduce(
      (all: CardType[], current) => all.concat(current.cards),
      []
    );
    return cards.find((card) => card.id === id);
  };

  render() {
    const { searchTerm, cardDetailId } = this.state;
    let columns = Array.from(this.state.columns.values());
    if (searchTerm && searchTerm.length) {
      columns = columns.map((col) => {
        return {
          ...col,
          cards: col.cards.filter(
            (card) =>
              card.description.includes(searchTerm) ||
              card.epic.title.includes(searchTerm) ||
              card.labels.some((label) => label.title.includes(searchTerm)) ||
              card.title.includes(searchTerm)
          ),
        };
      });
    }
    const cardDetail = this.getCardDetail(cardDetailId);
    return (
      <div className="content">
        <h1>Resume Board</h1>
        <div className="toolbar">
          <input
            type="search"
            className="search"
            placeholder="Search..."
            onChange={this.onSearch}
            value={searchTerm}
          />
          <div className="filter-container">
            {["Epic", "Label"].map((title) => (
              <Filter
                title={title}
                options={Array(3).fill(Math.random() * 10)}
              />
            ))}
          </div>
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="board">
            {columns.map((data) => (
              <BoardColumn
                {...data}
                onCreate={this.onCreate(data.id)}
                groupBy={this.state.groupBy}
                onOpenCardDetail={this.onOpenCardDetail}
              />
            ))}
          </div>
        </DragDropContext>
        {!!cardDetail && cardDetailId && (
          <Modal
            key={`card-detail-${cardDetailId}`}
            visible={true}
            onClose={this.onCloseCardDetail}
            epic={cardDetail.epic.title}
            id={cardDetailId}
          >
            {cardDetail.id}
          </Modal>
        )}
      </div>
    );
  }
}

export default Content;
