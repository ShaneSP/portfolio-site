import React, { Component } from "react";
import debounce from "lodash.debounce";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { BoardColumnType, CardType, GroupBy } from "constants/types";
import BoardColumn from "../column/BoardColumn";
import CardDetailModal from "../modal/CardDetailModal";
import { DropdownMenu } from "../dropdown/Dropdown";
import {
  epics,
  labels,
  groupByOptions,
  columns as defaultColumns,
  defaultCard,
} from "../../constants/data";
import "./content.scss";

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
  filterByEpic?: string;
  filterByLabel?: string;
  searchTerm?: string;
  cardDetailId?: string;
}

class Content extends Component<ContentProps, ContentState> {
  debounceSearch: any = undefined;
  constructor(props) {
    super(props);
    this.state = {
      groupBy: GroupBy.ASSIGNEE,
      columns: new Map(defaultColumns.map((col) => [col.id, col])),
    };
  }

  componentDidMount() {
    this.debounceSearch = debounce(this.search, 300);
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
        sourceColumn.cards = sourceColumn.cards.map((card, i) => {
          if (i === source.index) {
            return {
              ...card,
              columnId: destination.droppableId,
            };
          }
          return card;
        });

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

  search = (searchTerm?: string) => {
    let columns = Array.from(this.state.columns.values());
    if (searchTerm && searchTerm.length) {
      columns = columns.map((col) => {
        return {
          ...col,
          cards: col.cards.filter((card) =>
            Object.values(card)
              .join(" ")
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          ),
        };
      });
      this.setState({ columns: new Map(columns.map((col) => [col.id, col])) });
    } else {
      this.setState({
        columns: new Map(defaultColumns.map((col) => [col.id, col])),
      });
    }
  };

  onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    this.setState({ searchTerm }, () => {
      this.debounceSearch(searchTerm);
    });
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

  onFilterByEpicClick = (id?: string) => {
    this.setState({
      filterByEpic: id,
    });
  };

  onFilterByLabelClick = (id?: string) => {
    this.setState({
      filterByLabel: id,
    });
  };

  // Clearing groupBy defaults back to group by assigneee
  onGroupByClick = (id: GroupBy = GroupBy.ASSIGNEE) => {
    this.setState({
      groupBy: id,
    });
  };

  onCardStatusChange = (
    cardId: string,
    sourceId: string,
    destinationId: string
  ) => {
    if (sourceId !== destinationId) {
      const sourceColumn = this.state.columns.get(sourceId);
      const destinationColumn = this.state.columns.get(destinationId);
      if (sourceColumn && destinationColumn) {
        const index = sourceColumn.cards.findIndex(
          (card) => card.id === cardId
        );
        sourceColumn.cards = sourceColumn.cards.map((card, i) => {
          if (i === index) {
            return {
              ...card,
              columnId: destinationId,
            };
          }
          return card;
        });

        const sourceCards = Array.from(sourceColumn.cards);
        const destinationCards = Array.from(destinationColumn.cards);
        const [removed] = sourceCards.splice(index, 1);
        destinationCards.push(removed);

        this.setState({
          columns: new Map(
            this.state.columns
              .set(sourceId, {
                ...sourceColumn,
                cards: sourceCards,
              })
              .set(destinationId, {
                ...destinationColumn,
                cards: destinationCards,
              })
          ),
        });
      }
    }
  };

  render() {
    const { searchTerm, cardDetailId, filterByEpic, filterByLabel, groupBy } =
      this.state;
    let columns = Array.from(this.state.columns.values());
    let activeEpicFilter;
    let activeLabelFilter;
    if (filterByEpic) {
      activeEpicFilter = epics.find((f) => f.id === filterByEpic);
      columns = columns.map((col) => ({
        ...col,
        cards: col.cards.filter((c) => c.epic.id === filterByEpic),
      }));
    }
    if (filterByLabel) {
      activeLabelFilter = labels.find((f) => f.id === filterByLabel);
      columns = columns.map((col) => ({
        ...col,
        cards: col.cards.filter((c) =>
          c.labels.find((l) => l.id === filterByLabel)
        ),
      }));
    }
    const cardDetail = this.getCardDetail(cardDetailId);
    return (
      <div className="content">
        <h1>Resume Board</h1>
        <div className="toolbar">
          <div
            style={{ display: "flex", flex: "1 1 0%", flexDirection: "row" }}
          >
            <input
              type="search"
              className="search"
              placeholder="Search..."
              onChange={this.onSearch}
              value={searchTerm}
            />
            <div className="filter-container">
              <DropdownMenu
                placeholder="Select an epic"
                key="epics-dropdown"
                title={activeEpicFilter?.title || "Epics"}
                items={epics}
                onClick={this.onFilterByEpicClick}
              />
              <DropdownMenu
                placeholder="Select a label"
                key="labels-dropdown"
                title={activeLabelFilter?.title || "Label"}
                items={labels}
                onClick={this.onFilterByLabelClick}
              />
            </div>
          </div>
          <div className="groupBy-container">
            <div className="groupBy-label">Group by</div>
            <DropdownMenu
              placeholder="Group by"
              key="groupBy-dropdown"
              className="groupBy-dropdown"
              title={groupBy}
              items={groupByOptions}
              onClick={this.onGroupByClick}
              showClear={false}
            />
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
          <CardDetailModal
            key={`card-detail-${cardDetailId}`}
            visible={true}
            onClose={this.onCloseCardDetail}
            cardDetail={cardDetail}
            onCardStatusChange={this.onCardStatusChange}
            columns={columns}
          >
            <h3>{cardDetail.title}</h3>
            <p>{cardDetail.description}</p>
          </CardDetailModal>
        )}
      </div>
    );
  }
}

export default Content;
