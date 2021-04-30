import React, { Component } from "react";

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
      <div className="modal" key={this.props.key}>
        <span>Test modal</span>
        <button onClick={this.onClose}>close</button>
        {this.props.children}
      </div>
    );
  }
}
