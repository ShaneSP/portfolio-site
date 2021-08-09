import React, { useEffect, useRef, useState } from "react";
import "./dropdown.scss";
import { useDetectOutsideClick } from "./useDetectOutsideClick";

interface DropdownMenuProps {
  title: string;
  onClick: (id: string) => void;
  items: { id: string; label: string }[];
}

export const DropdownMenu = (props: DropdownMenuProps) => {
  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => {
    setIsActive(!isActive);
  };
  useEffect(() => {
    const pageClickEvent = (e) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current?.contains(e.target)
      ) {
        setIsActive(!isActive);
      }
    };
    if (isActive) {
      window.addEventListener("click", pageClickEvent);
    }
    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isActive]);

  return (
    <div className="menu-container">
      <button onClick={onClick} className="menu-trigger">
        <span>{props.title}</span>
      </button>
      <nav
        ref={dropdownRef}
        className={`menu ${isActive ? "active" : "inactive"}`}
      >
        <ul>
          {props.items.map((item) => (
            <li>
              <a onClick={() => props.onClick(item.id)}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
