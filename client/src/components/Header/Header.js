import { Container, Col, Row } from "react-bootstrap";
import { AccountLink } from "../AccountLink/AccountLink";
import DarkModeSwitch from "../DarkModeSwitch/DarkModeSwitch";
import styles from "./Header.css";

const Header = (props) => {
    return (
        <Container fluid className={"header-container"}>
            <Row className="align-items-center header-row">
                <Col xs={10}>
                    {props.children}
                </Col>
                <Col xs={1} className="">
                    <DarkModeSwitch />
                </Col>
                <Col xs={1} className="">
                    <AccountLink />
                </Col>
            </Row>
        </Container>
    )
}

export default Header;