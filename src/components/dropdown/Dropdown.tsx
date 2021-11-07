import { useState } from "react";
import "./dropdown.scss";
import { ChevronDownIcon } from "../icons/Chevron";
import { CloseCircleIcon } from "../icons/CloseCircle";
import { useDetectOutsideClick } from "../hooks/useDetectOutsideClick";

interface DropdownMenuProps {
  placeholder: string;
  title?: string | JSX.Element;
  onClick: (id?: any) => void;
  items: { id: string; title: string }[];
  showClear?: boolean;
  style?: any;
  type?: "primary" | "default";
  className?: string;
}

export const DropdownMenu = ({
  placeholder,
  title,
  onClick,
  items,
  showClear = true,
  style,
  type = "default",
  className,
}: DropdownMenuProps) => {
  const { isActive, setIsActive, ref: dropdownRef } = useDetectOutsideClick();
  const [isSelected, setIsSelected] = useState(false);
  const onDropdownClick = () => {
    console.log(isActive);
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

  return (
    <div style={style} className={className} ref={dropdownRef}>
      <button
        onClick={onDropdownClick}
        className={`menu-trigger ${type} ${isActive ? "active" : "inactive"}`}
      >
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
      <nav className={`menu ${isActive ? "active" : "inactive"}`}>
        <ul className="dropdown">
          {items.map((item) => (
            <li key={`dropdown-item-${item.id}`}>
              <a onClick={() => onItemClick(item.id)}>{item.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
