import Button from "components/button/Button";
import { CheckboxIcon } from "components/icons/Checkbox";
import { ClipIcon } from "components/icons/Clip";
import { EllipsisIcon } from "components/icons/Ellipsis";
import { EyeIcon } from "components/icons/Eye";
import { LightningBoxIcon } from "components/icons/LightningBox";
import { LikeIcon } from "components/icons/Like";
import { LinkIcon } from "components/icons/Link";
import { OutlookIcon } from "components/icons/Outlook";
import { ShareIcon } from "components/icons/Share";
import { SortIcon } from "components/icons/Sort";
import { TreeNodeIcon } from "components/icons/TreeNode";
import { OpenLockIcon } from "components/icons/OpenLock";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { CardType } from "constants/types";
import { CloseIcon } from "../icons/Close";
import "./cardDetailModal.scss";
import DropdownMenu from "components/dropdown/Dropdown";
import CollapsibleFields from "components/collapsible/CollapsibleFields";
import { CogIcon } from "components/icons/Cog";
import { columns, epics } from "constants/data";
import { Menu, MenuItem } from "components/menu/Menu";

enum SortOrderType {
  ASC = "asc",
  DESC = "desc",
}
enum ActivityFilterType {
  ALL = "all",
  COMMENT = "comment",
  HISTORY = "history",
}

interface CardDetailModalProps {
  key: string;
  visible: boolean;
  cardDetail: CardType;
  onClose: () => void;
  onCardStatusChange: (
    cardId: string,
    sourceStatus: string,
    destinationStatus: string
  ) => void;
  onDelete: (id: string) => void;
}

const CardDetailModal = ({
  key,
  visible,
  cardDetail,
  onClose,
  onCardStatusChange,
  onDelete,
}: PropsWithChildren<CardDetailModalProps>) => {
  const [sortOrder, setSortOrder] = useState(SortOrderType.DESC);
  const [filter, setFilter] = useState(ActivityFilterType.COMMENT);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    document.addEventListener("keyup", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.keyCode === 77 && inputRef.current) {
      // "m" keyCode is 77
      inputRef.current.focus();
    } else if (e.keyCode === 27) {
      // "esc" keyCode is 27
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleFilterSelect = (filter: ActivityFilterType) => {
    setFilter(filter);
  };

  const toggleSort = () => {
    setSortOrder(
      sortOrder === SortOrderType.ASC ? SortOrderType.DESC : SortOrderType.ASC
    );
  };

  const handleStatusChange = (columnId?: string) => {
    const { columnId: oldColumnId } = cardDetail;
    if (columnId && oldColumnId !== columnId) {
      onCardStatusChange(cardDetail.id, oldColumnId, columnId);
    }
  };

  const handleDelete = () => {
    onDelete(cardDetail.id);
    handleClose();
  };

  if (!visible) {
    return null;
  }
  const { id, epicId, title, description, columnId } = cardDetail;
  const epic = epics.find((epic) => epic.id === epicId);
  const columnOptions = columns.map((col) => ({
    id: col.id,
    title: col.title,
  }));

  return (
    <div className="modal" key={key} onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-info">
            <div>
              <LightningBoxIcon
                size={18}
                style={{ marginRight: "4px", color: "#904ee2" }}
              />
              <a className="epic-label" title={epic?.title}>
                <span>{epic ? epic.title : "Epic"}</span>
              </a>
            </div>
            <div>
              <CheckboxIcon
                size={18}
                style={{ marginRight: "4px", color: "#4bade8" }}
              />
              <a
                className="class-label"
                title={`SSP-${id.substring(0, 4).padStart(3, "0")}: ${title}`}
              >
                <span>SSP-{id.substring(0, 4).padStart(3, "0")}</span>
              </a>
            </div>
          </div>
          <div className="header-actions">
            <button className="icon-button">
              <OpenLockIcon size={24} />
            </button>
            <button className="icon-button">
              <EyeIcon size={24} />
            </button>
            <button className="icon-button">
              <LikeIcon size={24} />
            </button>
            <button className="icon-button">
              <ShareIcon size={24} />
            </button>
            <Menu
              title={<EllipsisIcon size={24} />}
              style={{
                width: "32px",
                height: "32px",
                padding: "2px",
                marginLeft: "16px",
              }}
            >
              <MenuItem
                key={`menu-item-delete`}
                title="Delete"
                onClick={handleDelete}
              />
            </Menu>
            <button className="icon-button">
              <CloseIcon size={24} onClick={handleClose} />
            </button>
          </div>
        </div>
        <div className="modal-body">
          <div className="modal-body-content">
            <div className="modal-body-title">
              <h1>{title}</h1>
            </div>
            <div className="modal-body-actions">
              <Button
                title="Attach"
                icon={<ClipIcon size={20} />}
                style={{ marginRight: 8, color: "#42526e" }}
              />
              <Button
                title="Add a child issue"
                icon={<TreeNodeIcon size={20} />}
                style={{ marginRight: 8, color: "#42526e" }}
              />
              <Button
                title="Link issue"
                icon={<LinkIcon size={20} />}
                style={{ marginRight: 8, color: "#42526e" }}
              />
              <Button title="Send Email" icon={<OutlookIcon size={20} />} />
            </div>
            <div className="modal-body-description-container">
              <h2>Description</h2>
              <div className="modal-body-description">{description}</div>
            </div>
            <div>
              <h2>Activity</h2>
              <div className="activity-filter-container">
                <div
                  style={{
                    display: "flex",
                    fontSize: "14px",
                    alignItems: "center",
                  }}
                >
                  <div className="activity-filter-label">Show:</div>
                  <div style={{ marginLeft: "8px" }}>
                    <Button
                      className={[
                        "activity-filter",
                        filter === "all" ? "selected" : "",
                      ].join(" ")}
                      title="All"
                      onClick={() => handleFilterSelect(ActivityFilterType.ALL)}
                      style={{ marginRight: 8 }}
                    />
                    <Button
                      className={[
                        "activity-filter",
                        filter === "comment" ? "selected" : "",
                      ].join(" ")}
                      title="Comments"
                      onClick={() =>
                        handleFilterSelect(ActivityFilterType.COMMENT)
                      }
                      style={{ marginRight: 8 }}
                    />
                    <Button
                      className={[
                        "activity-filter",
                        filter === "history" ? "selected" : "",
                      ].join(" ")}
                      title="History"
                      onClick={() =>
                        handleFilterSelect(ActivityFilterType.HISTORY)
                      }
                      style={{ marginRight: 8 }}
                    />
                  </div>
                </div>
                <button
                  className="activity-sorter"
                  onClick={toggleSort}
                  style={{
                    alignSelf: "flex-end",
                    alignItems: "center",
                  }}
                >
                  {sortOrder === "desc" ? "Newest first" : "Oldest first"}
                  <SortIcon
                    size={12}
                    style={{ marginLeft: "4px", color: "#42526e" }}
                    transform={sortOrder === "desc" ? "" : "scale(1, -1)"}
                  />
                </button>
              </div>
            </div>
            <div className="comment-container">
              <div className="comment-input-container">
                <div className="user-profile-image">SS</div>
                <div className="comment-input-form">
                  <input ref={inputRef} placeholder="Add a comment..." />
                  <small>
                    <strong>
                      <span>Pro tip:</span>
                    </strong>{" "}
                    press <span className="code-snippet">M</span> to comment{" "}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-body-sider">
            <DropdownMenu
              placeholder="Select a status"
              key="card-status-dropdown"
              title={columnOptions.find((col) => col.id === columnId)?.title}
              items={columnOptions}
              onClick={handleStatusChange}
              showClear={false}
              type="primary"
              style={{
                marginRight: "8px",
                marginBottom: "8px",
              }}
            />
            <CollapsibleFields
              title="Details"
              fields={[
                { label: "Customer Issue", value: "" },
                { label: "Customer", value: "" },
                { label: "Reported Date", value: "" },
                { label: "Delivery Date", value: "" },
              ]}
            />
            <div className="footnote-container">
              <div className="dates">
                <small>Created October 3, 2021, 10:02 PM</small>
                <small>Updated 1 day ago</small>
              </div>
              <div className="configure-button">
                <a>
                  <CogIcon size={24} />
                  <span>Configure</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailModal;