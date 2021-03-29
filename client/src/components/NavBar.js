import React, { useState } from "react";
import { Menu, Container, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, name) => setActiveItem(name);

  return (
    <Menu pointing secondary size="massive" color="teal">
      <Container>
        <Menu.Item
          name="home"
          onClick={(e) => handleItemClick(e, "home")}
          as={Link}
          to="/"
        >
          <Icon name="home" />
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={(e) => handleItemClick(e, "home")}
            as={Link}
            to="/"
          />
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={(e) => handleItemClick(e, "login")}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name="register"
            active={activeItem === "register"}
            onClick={(e) => handleItemClick(e, "register")}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default NavBar;
