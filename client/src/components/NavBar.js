import React, { useState, useContext } from "react";
import { Menu, Container, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

const NavBar = () => {
  const context = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname !== "/" ? pathname.substr(1) : "home";
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, name) => setActiveItem(name);

  return (
    <Menu pointing secondary size="massive" color="teal">
      <Container>
        {context.user ? (
          <>
            <Menu.Item name={context.user.username} active as={Link} to="/" />
            <Menu.Menu position="right">
              <Menu.Item
                name="logout"
                onClick={() => context.logout()}
                as={Link}
                to="/login"
              />
            </Menu.Menu>
          </>
        ) : (
          <>
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
          </>
        )}
      </Container>
    </Menu>
  );
};

export default NavBar;
