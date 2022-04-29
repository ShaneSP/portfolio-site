import React from "react";
import { CogIcon } from "components/icons/Cog";
import { GithubIcon } from "components/icons/Github";
import { LinkedinIcon } from "components/icons/Linkedin";
import Button from "../button/Button";
import "./header.scss";

const Header = () => {
  return (
    <div className="header">
      <h1>Shane Steele-Pardue</h1>
      <div className="links-container">
        <Button className="link-button" icon={<CogIcon size={28} />} />
        <Button
          className="link-button"
          icon={<GithubIcon size={27} />}
          onClick={() => {
            window.open("https://www.github.com/shanesp", "_blank");
          }}
        />
        <Button
          className="link-button"
          icon={<LinkedinIcon size={28} />}
          onClick={() => {
            window.open("https://www.linkedin.com/in/shanesp", "_blank");
          }}
        />
      </div>
    </div>
  );
};

export default Header;
