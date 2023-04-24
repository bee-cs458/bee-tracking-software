import { Container, Col, Row } from "react-bootstrap";
import { AccountLink } from "../AccountLink/AccountLink";
import DarkModeSwitch from "../DarkModeSwitch/DarkModeSwitch";
import "./Header.css";
import { useEffect } from "react";
import { useState } from "react";

const Header = (props) => {
  const [className, setClassName] = useState("header-container");
  const [rowClassName, setRowClassName] = useState(
    "align-items-center header-row"
  );
  function handleClick() {
    props.switchTheme();
  }

  useEffect(() => {
    if (props.collapse) {
      setClassName("header-container5-shrunk");
      setRowClassName("align-items-center header-row-shrunk");
    } else {
      setClassName("header-container5");
      setRowClassName("align-items-center header-row");
    }
  }, [props.collapse]);

  return (
    <Container fluid className={className}>
      <Row className={rowClassName}>
        <Col xs={8}>{props.children}</Col>
        <Col xs={2} className="">
          <DarkModeSwitch theme={props.theme} onChange={handleClick} />
        </Col>
        <Col xs={2} className="">
          <AccountLink />
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
