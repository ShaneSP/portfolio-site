import React, { createRef } from "react";
import "./menu.scss";

interface MenuItemProps {
  key: string;
  title: string | JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

export const MenuItem = ({ key, title, onClick }: MenuItemProps) => {
  return (
    <li key={key}>
      <a onClick={onClick}>{title}</a>
    </li>
  );
};

interface MenuProps {
  title: string | JSX.Element;
  showClear?: boolean;
  style?: any;
  type?: "primary" | "default";
  className?: string;
}

interface MenuState {
  isActive: boolean;
}

export class Menu extends React.Component<MenuProps, MenuState> {
  ref: React.RefObject<HTMLDivElement>;
  onClick: (e: any) => void;
  constructor(props) {
    super(props);
    this.ref = createRef<HTMLDivElement>();
    this.onClick = (e: any) => {
      // If the active element exists and is clicked outside of
      if (
        this.ref &&
        this.ref.current &&
        !this.ref.current.contains(e.target)
      ) {
        this.setState({
          isActive: false,
        });
      }
    };
    this.state = {
      isActive: false,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isActive && this.state.isActive) {
      window.addEventListener("click", this.onClick, true);
    }
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.onClick, true);
  }
  toggleIsActive = () => {
    this.setState({ isActive: !this.state.isActive });
  };
  render() {
    const { title, style, type, className } = this.props;
    const { isActive } = this.state;
    return (
      <div style={style} className={className} ref={this.ref}>
        <button
          onClick={this.toggleIsActive}
          className={`menu-trigger ${type} ${isActive ? "active" : "inactive"}`}
        >
          <span>{title}</span>
        </button>
        <nav className={`menu ${isActive ? "active" : "inactive"}`}>
          <ul className="dropdown">{this.props.children}</ul>
        </nav>
      </div>
    );
  }
}
