import React from "react";
import { BoardIcon } from "components/icons/Board";
import { PaperIcon } from "components/icons/Paper";
import { UserIcon } from "components/icons/User";
import "./navigation.scss";

const Navigation = () => {
  return (
    <div>
      <nav className="sider">
        <div className="nav-items">
          <a draggable={false} className="nav-item-wrapper" href="#board">
            <div className="nav-item">
              <BoardIcon size={24} className="nav-item-icon" />
              <span className="nav-item-title">Board</span>
            </div>
          </a>
          <a draggable={false} className="nav-item-wrapper" href="#about">
            <div className="nav-item">
              <PaperIcon size={24} className="nav-item-icon" />
              <span className="nav-item-title">About</span>
            </div>
          </a>
          <a draggable={false} className="nav-item-wrapper" href="#contact">
            <div className="nav-item">
              <UserIcon size={24} className="nav-item-icon" />
              <span className="nav-item-title">Contact</span>
            </div>
          </a>
        </div>
        <div className="sider-footer">
          <span>You're in a resume website</span>
          <span id="learn-more" style={{ margin: 6 }}>
            Learn more
          </span>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
