import React from "react";
import "./navigation.scss";

export default function Navigation() {
  return (
    <nav className="sider">
      <div className="nav-items">
        <a draggable={false} className="nav-item-wrapper" href="#board">
          <div className="nav-item">
            <span className="nav-item-icon">😋</span>
            <span className="nav-item-title">Board</span>
          </div>
        </a>
        <a draggable={false} className="nav-item-wrapper" href="#about">
          <div className="nav-item">
            <span className="nav-item-icon">🤣</span>
            <span className="nav-item-title">About</span>
          </div>
        </a>
        <a draggable={false} className="nav-item-wrapper" href="#contact">
          <div className="nav-item">
            <span className="nav-item-icon">🤠</span>
            <span className="nav-item-title">Contact</span>
          </div>
        </a>
      </div>
    </nav>
  );
}
