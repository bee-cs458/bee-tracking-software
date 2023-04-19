import { Container, Col, Row } from "react-bootstrap";
import { AccountLink } from "../AccountLink/AccountLink";
import DarkModeSwitch from "../DarkModeSwitch/DarkModeSwitch";
import styles from "./Header.css";

const Header = (props) => {
  function handleClick() {
    props.switchTheme();
  }
  return (
    <Container fluid className={"header-container"}>
      <Row className="align-items-center header-row">
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
