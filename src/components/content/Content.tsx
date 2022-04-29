import React, {
  Component,
  createRef,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import debounce from "lodash.debounce";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { CardType, GroupBy } from "constants/types";
import CardDetailModal from "../modal/CardDetailModal";
import DropdownMenu from "../dropdown/Dropdown";
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
  notAtLeft: boolean;
  notAtRight: boolean;
}

const Content = ({}: ContentProps) => {
  const [groupBy, setGroupBy] = useState(GroupBy.ASSIGNEE);
  const [cards, setCards] = useState(
    new Map(defaultCards.map((card) => [card.id, card]))
  );
  const [notAtLeft, setNotAtLeft] = useState(false);
  const [notAtRight, setNotAtRight] = useState(false);
  const [epicFilter, setEpicFilter] = useState<string>();
  const [labelFilter, setLabelFilter] = useState<string>();
  const [searchTerm, setSearchTerm] = useState<string>();
  const [cardId, setCardId] = useState<string>();

  const handleSearch = (searchTerm?: string) => {
    let searchedCards = Array.from(cards.values());
    if (searchTerm && searchTerm.length) {
      searchedCards = searchedCards.filter((card) =>
        Object.values(card)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setCards(new Map(searchedCards.map((card) => [card.id, card])));
    } else {
      setCards(new Map(defaultCards.map((card) => [card.id, card])));
    }
  };

  const debounceSearch = useCallback(debounce(handleSearch, 300), []);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.addEventListener(
      "scroll",
      updateColumnGroupContainerClasses
    );

    return () => {
      scrollRef.current?.removeEventListener("scroll", (e) => {
        updateColumnGroupContainerClasses(scrollRef.current?.scrollLeft);
      });
    };
  }, []);

  useEffect(() => {
    if (epicFilter) {
      // Filter cards based on epicFilter
      setCards(
        new Map(
          Array.from(cards.values())
            .filter((card) => card.epicId === epicFilter)
            .map((card) => [card.id, card])
        )
      );
    } else {
      // Restore cards to defaultsCards
      setCards(new Map(defaultCards.map((card) => [card.id, card])));
    }
  }, [epicFilter]);

  useEffect(() => {
    if (labelFilter) {
      // Filter cards based on labelFilter
      setCards(
        new Map(
          Array.from(cards.values())
            .filter((card) =>
              card.labels.find((label) => label.id === labelFilter)
            )
            .map((card) => [card.id, card])
        )
      );
    } else {
      // Restore cards to defaultsCards
      setCards(new Map(defaultCards.map((card) => [card.id, card])));
    }
  }, [labelFilter]);

  const updateColumnGroupContainerClasses = (e) => {
    const target = scrollRef.current;
    if (target) {
      var divWidth = target.scrollWidth - target.clientWidth;

      if (target.scrollLeft == 0 && notAtLeft) {
        setNotAtLeft(false);
      }

      if (target.scrollLeft > 0 && !notAtLeft) {
        setNotAtLeft(true);
      }

      if (target.scrollLeft < divWidth && !notAtRight) {
        setNotAtRight(true);
      }

      if (target.scrollLeft == divWidth && notAtRight) {
        setNotAtRight(false);
      }
    }
  };

  const onCreateByEpic =
    (epicId?: string) => (title: string, columnId: string, index: number) => {
      const card = createCard(title, columnId, index, epicId);
      if (card) setCards(new Map(cards.set(card.id, card)));
    };

  const onCreateByAssignee =
    (assigneeId?: string) =>
    (title: string, columnId: string, index: number) => {
      const card = createCard(title, columnId, index, undefined, assigneeId);
      if (card) setCards(new Map(cards.set(card.id, card)));
    };

  const onDragEnd = (result: DropResult) => {
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

    const cardsArray = Array.from(cards.values());
    const sourceCards = cardsArray
      .filter((c) => c.columnId === sourceColumnId)
      .sort((a, b) => a.order - b.order);
    const destinationCards = cardsArray
      .filter((c) => c.columnId === destinationColumnId)
      .sort((a, b) => a.order - b.order);
    const [target] = sourceCards.splice(source.index, 1);
    const updatedCards = new Map(cards);

    if (groupBy === GroupBy.ASSIGNEE) {
      target.assigneeId = destinationGroupById;
    } else if (groupBy === GroupBy.EPIC) {
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
    setCards(updatedCards);
  };

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    debounceSearch(searchTerm);
  };

  const onOpenCardDetail = (id: string) => () => {
    setCardId(id);
  };

  const onCloseCardDetail = () => {
    setCardId(undefined);
  };

  const getCardDetail = (id?: string): CardType | undefined => {
    if (!id) return undefined;
    return Array.from(cards.values()).find((card) => card.id === id);
  };

  const onFilterByEpicClick = (id?: string) => {
    setEpicFilter(id);
  };

  const onFilterByLabelClick = (id?: string) => {
    setLabelFilter(id);
  };

  // Clearing groupBy defaults back to group by assigneee
  const onGroupByClick = (id: GroupBy = GroupBy.ASSIGNEE) => {
    setGroupBy(id);
  };

  const onCardStatusChange = (
    cardId: string,
    sourceId: string,
    destinationId: string
  ) => {
    if (sourceId !== destinationId) {
      const card = cards.get(cardId);
      // Set card's order to end of destination column list
      const order = Array.from(cards.values()).filter(
        (c) => c.columnId === destinationId
      ).length;
      if (card) {
        const updatedMap = new Map(
          cards.set(cardId, {
            ...card,
            columnId: destinationId,
            order,
          })
        );
        setCards(updatedMap);
      }
    }
  };

  const getBoardGroups = () => {
    const cardsArray = Array.from(cards.values());
    let uncategorized: CardType[] = [];
    const groups: JSX.Element[] = [];
    // There's only one assignee so we're just going to give all
    // non-undefined cards to them.
    switch (groupBy) {
      case GroupBy.ASSIGNEE:
        uncategorized = cardsArray.filter((c) => c.assigneeId === undefined);
        groups.push(
          <BoardGroup
            key={`board-group-assignee`}
            title={"Shane Steele-Pardue"}
            cards={cardsArray.filter((c) => c.assigneeId !== undefined)}
            groupById={assignees[0].id}
            onCreate={onCreateByAssignee(assignees[0].id)}
            onOpenCardDetail={onOpenCardDetail}
          />
        );
        break;
      case GroupBy.EPIC:
        uncategorized = cardsArray.filter((c) => c.epicId === undefined);
        epics.map((epic) => {
          groups.push(
            <BoardGroup
              key={`board-group-${epic.id}`}
              title={epic.title}
              cards={cardsArray.filter((card) => card.epicId === epic.id)}
              groupById={epic.id}
              onCreate={onCreateByEpic(epic.id)}
              onOpenCardDetail={onOpenCardDetail}
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
        onCreate={onCreateByAssignee()}
        onOpenCardDetail={onOpenCardDetail}
      />
    );
    return groups;
  };

  const onDelete = (id: string) => {
    const updatedCards = new Map(cards);
    updatedCards.delete(id);
    setCards(updatedCards);
  };

  let activeEpicFilter;
  let activeLabelFilter;
  if (epicFilter) {
    activeEpicFilter = epics.find((f) => f.id === epicFilter);
  }
  if (labelFilter) {
    activeLabelFilter = labels.find((f) => f.id === labelFilter);
  }
  const cardDetail = getCardDetail(cardId);
  return (
    <div className="content">
      <div id="board" className="board-title-container">
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
        <div style={{ display: "flex", flex: "1 1 0%", flexDirection: "row" }}>
          <input
            type="search"
            className="search"
            placeholder="Search..."
            onChange={onSearch}
            value={searchTerm}
          />
          <div className="filter-container">
            <DropdownMenu
              placeholder="Select an epic"
              key="epics-dropdown"
              title={activeEpicFilter?.title || "Epics"}
              items={epics}
              onClick={onFilterByEpicClick}
              style={{ marginRight: "4px" }}
            />
            <DropdownMenu
              placeholder="Select a label"
              key="labels-dropdown"
              title={activeLabelFilter?.title || "Label"}
              items={labels}
              onClick={onFilterByLabelClick}
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
            onClick={onGroupByClick}
            showClear={false}
          />
        </div>
      </div>
      <div
        className={[
          "column-parent-container",
          notAtLeft ? "not-at-left" : "",
          notAtRight ? "not-at-right" : "",
        ].join(" ")}
      >
        <div className="column-group-container" ref={scrollRef}>
          <div className="column-title-container">
            {defaultColumns.map((data) => (
              <div key={`column-title-${data.id}`} className="title-container">
                <h3>{data.title.toUpperCase()}</h3>
              </div>
            ))}
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            {getBoardGroups()}
          </DragDropContext>
        </div>
      </div>
      {!!cardDetail && cardId && (
        <CardDetailModal
          key={`card-detail-${cardId}`}
          visible={true}
          onClose={onCloseCardDetail}
          cardDetail={cardDetail}
          onCardStatusChange={onCardStatusChange}
          onDelete={onDelete}
        >
          <h3>{cardDetail.title}</h3>
          <p>{cardDetail.description}</p>
        </CardDetailModal>
      )}
    </div>
  );
};

export default Content;
