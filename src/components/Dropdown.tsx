import React, { useEffect, useRef, useState } from "react";
import "./dropdown.scss";
import { CloseCircleIcon } from "./icons/CloseCircle";
import { useDetectOutsideClick } from "./useDetectOutsideClick";

interface DropdownMenuProps {
  title: string;
  onClick: (id?: string) => void;
  items: { id: string; title: string }[];
}

export const DropdownMenu = (props: DropdownMenuProps) => {
  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [isSelected, setIsSelected] = useState(false);
  const onClick = () => {
    setIsActive(!isActive);
  };
  const onItemClick = (id: string) => {
    setIsActive(!isActive);
    setIsSelected(true);
    props.onClick(id);
  };
  const onClearClick = (e) => {
    e.stopPropagation();
    setIsSelected(false);
    setIsActive(false);
    props.onClick(undefined);
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
    <div className="filter">
      <button onClick={onClick} className="menu-trigger">
        <span>{props.title}</span>
        {isSelected && (
          <CloseCircleIcon
            size={12}
            style={{ marginLeft: 5 }}
            onClick={onClearClick}
          />
        )}
      </button>
      <nav
        ref={dropdownRef}
        className={`menu ${isActive ? "active" : "inactive"}`}
      >
        <ul className="dropdown">
          {props.items.map((item) => (
            <li>
              <a onClick={() => onItemClick(item.id)}>{item.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
