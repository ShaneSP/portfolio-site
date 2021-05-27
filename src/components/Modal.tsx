import React, { Component } from "react";
import { CloseIcon } from "./icons/Close";
import "./modal.scss";

interface ModalProps {
  key: string;
  visible: boolean;
  onClose: () => void;
}
interface ModalState {}

export default class Modal extends Component<ModalProps, ModalState> {
  constructor(props) {
    super(props);
  }

  onClose = () => {
    this.props.onClose && this.props.onClose();
  };

  render() {
    if (!this.props.visible) {
      return null;
    }
    return (
      <div className="modal" key={this.props.key} onClick={this.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="header-info">
              <span></span>
              <span></span>
            </div>
            <CloseIcon size={24} onClick={this.onClose} />
          </div>
          <div className="modal-body">{this.props.children}</div>
        </div>
      </div>
    );
  }
}
