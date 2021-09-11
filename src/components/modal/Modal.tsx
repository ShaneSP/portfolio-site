import React, { Component } from "react";
import { CardType } from "types";
import { CloseIcon } from "../icons/Close";
import "./modal.scss";

interface ModalProps {
  key: string;
  visible: boolean;
  onClose: () => void;
  cardDetail: CardType;
}
interface ModalState {}

export default class Modal extends Component<ModalProps, ModalState> {
  constructor(props) {
    super(props);
  }

  onClose = () => {
    this.props.onClose();
  };

  render() {
    if (!this.props.visible) {
      return null;
    }
    const { key, cardDetail } = this.props;
    const { id, epic, title } = cardDetail;
    return (
      <div className="modal" key={key} onClick={this.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="header-info">
              <span>{epic.title}</span>
              <span>SSP-{id.substring(0, 4).padStart(3, "0")}</span>
            </div>
            <CloseIcon size={24} onClick={this.onClose} />
          </div>
          <div className="modal-body">
            <div className="modal-body-content">
              <div className="modal-body-title">
                <h1>{title}</h1>
              </div>
            </div>
            <div className="modal-body-sider">
              <button>Status</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
