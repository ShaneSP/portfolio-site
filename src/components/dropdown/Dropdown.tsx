import { useState } from "react";
import "./dropdown.scss";
import { ChevronDownIcon } from "../icons/Chevron";
import { CloseCircleIcon } from "../icons/CloseCircle";
import { useDetectOutsideClick } from "../hooks/useDetectOutsideClick";

interface DropdownMenuProps {
  placeholder?: string;
  title?: string | JSX.Element;
  onClick?: (id?: any) => void;
  items?: { id: string; title: string }[];
  showClear?: boolean;
  style?: any;
  type?: "primary" | "default";
  className?: string;
}

const DropdownMenu = ({
  placeholder,
  title,
  onClick,
  items,
  showClear = true,
  style,
  type = "default",
  className,
}: DropdownMenuProps) => {
  const { active, setActive, ref: dropdownRef } = useDetectOutsideClick();
  const [isSelected, setIsSelected] = useState(false);
  const onDropdownClick = () => {
    console.log(active);
    setActive(!active);
  };
  const onItemClick = (id: string) => {
    setActive(!active);
    setIsSelected(true);
    if (onClick) {
      onClick(id);
    }
  };
  const onClearClick = (e) => {
    e.stopPropagation();
    setIsSelected(false);
    setActive(false);
    if (onClick) {
      onClick(undefined);
    }
  };

  return (
    <div style={style} className={className} ref={dropdownRef}>
      <button
        onClick={onDropdownClick}
        className={`menu-trigger ${type} ${active ? "active" : "inactive"}`}
      >
        <span>{title || placeholder || "Menu"}</span>
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
            transform={active ? "rotate(180)" : ""}
            strokeWidth={type === "primary" ? "4" : undefined}
          />
        )}
      </button>
      <nav className={`menu ${active ? "active" : "inactive"}`}>
        <ul className="dropdown">
          {items &&
            items.map((item) => (
              <li key={`dropdown-item-${item.id}`}>
                <a onClick={() => onItemClick(item.id)}>{item.title}</a>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default DropdownMenu;