import React, { useEffect, useRef, useState } from "react";
import "./dropdown.scss";
import { ChevronDownIcon } from "../icons/Chevron";
import { CloseCircleIcon } from "../icons/CloseCircle";
import { useDetectOutsideClick } from "../hooks/useDetectOutsideClick";

interface DropdownMenuProps {
  placeholder: string;
  title?: string;
  onClick: (id?: string) => void;
  items: { id: string; title: string }[];
  showClear?: boolean;
  style?: any;
  type?: "primary" | "default";
}

export const DropdownMenu = ({
  placeholder,
  title,
  onClick,
  items,
  showClear = true,
  style,
  type = "default",
}: DropdownMenuProps) => {
  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [isSelected, setIsSelected] = useState(false);
  const onDropdownClick = () => {
    setIsActive(!isActive);
  };
  const onItemClick = (id: string) => {
    setIsActive(!isActive);
    setIsSelected(true);
    onClick(id);
  };
  const onClearClick = (e) => {
    e.stopPropagation();
    setIsSelected(false);
    setIsActive(false);
    onClick(undefined);
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
    <div className="filter" style={style}>
      <button onClick={onDropdownClick} className={`menu-trigger ${type}`}>
        <span>{title || placeholder}</span>
        {showClear && isSelected ? (
          <CloseCircleIcon
            size={12}
            style={{ marginLeft: 5 }}
            onClick={onClearClick}
          />
        ) : (
          <ChevronDownIcon
            size={12}
            style={{ marginLeft: 5 }}
            transform={isActive ? "rotate(180)" : ""}
            strokeWidth={type === "primary" ? "4" : undefined}
          />
        )}
      </button>
      <nav
        ref={dropdownRef}
        className={`menu ${isActive ? "active" : "inactive"}`}
      >
        <ul className="dropdown">
          {items.map((item) => (
            <li>
              <a onClick={() => onItemClick(item.id)}>{item.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
