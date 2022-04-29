import React, { useEffect, useRef, useState, PropsWithChildren } from "react";
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

export const Menu = ({
  title,
  style,
  type,
  className,
  children,
}: PropsWithChildren<MenuProps>) => {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const onClick = (e: any) => {
    // If the active element exists and is clicked outside of
    if (!ref?.current?.contains(e.target)) {
      setActive(false);
    }
  };
  useEffect(() => {
    window.addEventListener("click", onClick, true);
    // remove event listener on component unmount
    return () => {
      window.removeEventListener("click", onClick, true);
    };
  }, []);
  const toggleIsActive = () => {
    setActive(!active);
  };
  return (
    <div style={style} className={className} ref={ref}>
      <button
        onClick={toggleIsActive}
        className={`menu-trigger ${type} ${active ? "active" : "inactive"}`}
      >
        <span>{title}</span>
      </button>
      <nav className={`menu ${active ? "active" : "inactive"}`}>
        <ul className="dropdown">{children}</ul>
      </nav>
    </div>
  );
};
