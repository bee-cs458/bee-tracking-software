import { Container, Col, Row } from "react-bootstrap";
import { AccountLink } from "../AccountLink/AccountLink";
import DarkModeSwitch from "../DarkModeSwitch/DarkModeSwitch";
import "./Header.css";
import { useEffect } from "react";
import { useState } from "react";

const Header = (props) => {
  const [className, setClassName] = useState("header-container");
  function handleClick() {
    props.switchTheme();
  }

  useEffect(() => {
    if (props.collapse) {
      setClassName("header-container5-shrunk");
    } else {
      setClassName("header-container5");
    }
  }, [props.collapse]);

  return (
    <Container fluid className={className}>
      <Row className="align-items-center header-row">
        <Col xs={8}>{props.children}</Col>
        <Col xs={2} className="">
          <DarkModeSwitch onChange={handleClick} />
        </Col>
        <Col xs={2} className="">
          <AccountLink />
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
