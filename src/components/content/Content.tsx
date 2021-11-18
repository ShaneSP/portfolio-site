import React, { Component } from "react";
import debounce from "lodash.debounce";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import {
  BoardColumnType,
  CardType,
  ColumnGroupType,
  GroupBy,
} from "constants/types";
import CardDetailModal from "../modal/CardDetailModal";
import { DropdownMenu } from "../dropdown/Dropdown";
import {
  epics,
  labels,
  groupByOptions,
  columns as defaultColumns,
  createCard,
  cards as defaultCards,
  assignees,
} from "../../constants/data";
import "./content.scss";
import BoardGroup from "components/boardGroup/BoardGroup";
import { LightningIcon } from "components/icons/Lightning";
import Button from "components/button/Button";
import { Menu } from "components/menu/Menu";
import { EllipsisIcon } from "components/icons/Ellipsis";
import { StarIcon } from "components/icons/Star";

interface ContentProps {}
interface ContentState {
  groupBy: GroupBy;
  cards: Map<string, CardType>;
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
      cards: new Map(defaultCards.map((card) => [card.id, card])),
    };
  }

  componentDidMount() {
    this.debounceSearch = debounce(this.search, 300);
  }

  componentDidUpdate(prevProps, prevState) {
    const { filterByEpic, filterByLabel } = this.state;
    if (filterByEpic && prevState.filterByEpic !== filterByEpic) {
      // filterByEpic changes and is defined
      this.setState({
        cards: new Map(
          Array.from(this.state.cards.values())
            .filter((card) => card.epicId === filterByEpic)
            .map((card) => [card.id, card])
        ),
      });
    } else if (!filterByEpic && !!prevState.filterByEpic) {
      // filterByEpic changes from defined to undefined
      this.setState({
        cards: new Map(defaultCards.map((card) => [card.id, card])),
      });
    }
    if (filterByLabel && prevState.filterByLabel !== filterByLabel) {
      // filterByLabel changes and is defined
      this.setState({
        cards: new Map(
          Array.from(this.state.cards.values())
            .filter((card) =>
              card.labels.find((label) => label.id === filterByLabel)
            )
            .map((card) => [card.id, card])
        ),
      });
    } else if (!filterByLabel && !!prevState.filterByLabel) {
      // filterByLabel changes from defined to undefined
      this.setState({
        cards: new Map(defaultCards.map((card) => [card.id, card])),
      });
    }
  }

  // getList = (columnId: string) => [...this.state.cards.values()].filter(card => card.columnId === columnId);

  onCreateByEpic =
    (epicId?: string) => (title: string, columnId: string, index: number) => {
      const card = createCard(title, columnId, index, epicId);
      if (card)
        this.setState({
          cards: new Map(this.state.cards.set(card.id, card)),
        });
    };

  onCreateByAssignee =
    (assigneeId?: string) =>
    (title: string, columnId: string, index: number) => {
      const card = createCard(title, columnId, index, undefined, assigneeId);
      if (card)
        this.setState({
          cards: new Map(this.state.cards.set(card.id, card)),
        });
    };

  onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }

    // dropped in the same column and order
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // droppableId is formatted with the following pattern:
    // "columnId$groupById"
    const sourceColumnId = source.droppableId.split("$")[0];
    const sourceGroupById = source.droppableId.split("$")[1];
    const destinationColumnId = destination.droppableId.split("$")[0];
    let destinationGroupById: string | undefined =
      destination.droppableId.split("$")[1];
    if (destinationGroupById === "undefined") {
      destinationGroupById = undefined;
    }

    const cards = Array.from(this.state.cards.values());
    const sourceCards = cards
      .filter((c) => c.columnId === sourceColumnId)
      .sort((a, b) => a.order - b.order);
    const destinationCards = cards
      .filter((c) => c.columnId === destinationColumnId)
      .sort((a, b) => a.order - b.order);
    const [target] = sourceCards.splice(source.index, 1);
    const updatedCards = new Map(this.state.cards);

    if (this.state.groupBy === GroupBy.ASSIGNEE) {
      target.assigneeId = destinationGroupById;
    } else if (this.state.groupBy === GroupBy.EPIC) {
      target.epicId = destinationGroupById;
    }

    // dropped in a different column
    if (sourceColumnId !== destinationColumnId) {
      target.columnId = destinationColumnId;
      destinationCards.splice(destination.index, 0, target);
      destinationCards.forEach((card, index) => {
        updatedCards.set(card.id, {
          ...card,
          order: index,
        });
      });
      // dropped in the same column
    } else {
      sourceCards.splice(destination.index, 0, target);
    }
    sourceCards.forEach((card, index) => {
      updatedCards.set(card.id, {
        ...card,
        order: index,
      });
    });
    this.setState({
      cards: updatedCards,
    });
  };

  search = (searchTerm?: string) => {
    let searchedCards = Array.from(this.state.cards.values());
    if (searchTerm && searchTerm.length) {
      searchedCards = searchedCards.filter((card) =>
        Object.values(card)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      this.setState({
        cards: new Map(searchedCards.map((card) => [card.id, card])),
      });
    } else {
      this.setState({
        cards: new Map(defaultCards.map((card) => [card.id, card])),
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
    const { cards } = this.state;
    return Array.from(cards.values()).find((card) => card.id === id);
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
      const card = this.state.cards.get(cardId);
      // Set card's order to end of destination column list
      const order = Array.from(this.state.cards.values()).filter(
        (c) => c.columnId === destinationId
      ).length;
      if (card) {
        const updatedMap = new Map(
          this.state.cards.set(cardId, {
            ...card,
            columnId: destinationId,
            order,
          })
        );
        this.setState({
          cards: updatedMap,
        });
      }
    }
  };

  getBoardGroups = () => {
    const { groupBy } = this.state;
    const cards = Array.from(this.state.cards.values());
    let uncategorized: CardType[] = [];
    const groups: JSX.Element[] = [];
    // There's only one assignee so we're just going to give all
    // non-undefined cards to them.
    switch (groupBy) {
      case GroupBy.ASSIGNEE:
        uncategorized = cards.filter((c) => c.assigneeId === undefined);
        groups.push(
          <BoardGroup
            key={`board-group-assignee`}
            title={"Shane Steele-Pardue"}
            cards={cards.filter((c) => c.assigneeId !== undefined)}
            groupById={assignees[0].id}
            onCreate={this.onCreateByAssignee(assignees[0].id)}
            onOpenCardDetail={this.onOpenCardDetail}
          />
        );
        break;
      case GroupBy.EPIC:
        uncategorized = cards.filter((c) => c.epicId === undefined);
        epics.map((epic) => {
          groups.push(
            <BoardGroup
              key={`board-group-${epic.id}`}
              title={epic.title}
              cards={cards.filter((card) => card.epicId === epic.id)}
              groupById={epic.id}
              onCreate={this.onCreateByEpic(epic.id)}
              onOpenCardDetail={this.onOpenCardDetail}
            />
          );
        });
        break;
      default:
        return <></>;
    }
    groups.push(
      <BoardGroup
        key={`board-group-uncategorized`}
        title={"Uncategorized"}
        cards={uncategorized}
        groupById={"undefined"}
        onCreate={this.onCreateByAssignee()}
        onOpenCardDetail={this.onOpenCardDetail}
      />
    );
    return groups;
  };

  onDelete = (id: string) => {
    const updatedCards = new Map(this.state.cards);
    updatedCards.delete(id);
    this.setState({
      cards: updatedCards,
    });
  };

  render() {
    const { searchTerm, cardDetailId, filterByEpic, filterByLabel, groupBy } =
      this.state;
    let activeEpicFilter;
    let activeLabelFilter;
    if (filterByEpic) {
      activeEpicFilter = epics.find((f) => f.id === filterByEpic);
    }
    if (filterByLabel) {
      activeLabelFilter = labels.find((f) => f.id === filterByLabel);
    }
    const cardDetail = this.getCardDetail(cardDetailId);
    return (
      <div className="content">
        <div className="board-title-container">
          <h1>Resume Board</h1>
          <div className="action-container">
            <Button
              icon={<LightningIcon size={24} />}
              title=""
              style={{ width: "32px", height: "32px", marginRight: "2px" }}
              className="icon-button"
            />
            <Button
              icon={<StarIcon size={20} />}
              title=""
              style={{ width: "32px", height: "32px", marginRight: "8px" }}
              className="icon-button"
            />
            <Button
              icon={<EllipsisIcon size={24} />}
              title=""
              style={{ width: "32px", height: "32px" }}
            />
          </div>
        </div>
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
        <div className="column-group-container">
          <div className="column-title-container">
            {defaultColumns.map((data) => (
              <div key={`column-title-${data.id}`} className="title-container">
                <h3>{data.title.toUpperCase()}</h3>
              </div>
            ))}
          </div>
          <DragDropContext onDragEnd={this.onDragEnd}>
            {this.getBoardGroups()}
          </DragDropContext>
        </div>
        {!!cardDetail && cardDetailId && (
          <CardDetailModal
            key={`card-detail-${cardDetailId}`}
            visible={true}
            onClose={this.onCloseCardDetail}
            cardDetail={cardDetail}
            onCardStatusChange={this.onCardStatusChange}
            onDelete={this.onDelete}
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
