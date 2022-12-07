import Alert from "react-bootstrap/Alert";

export default function ConditionalAlert(props) {
  switch (props.type) {
    case 0:
      return <Alert variant="danger">{props.message}</Alert>;
    case 1:
      return <Alert variant="warning">{props.message}</Alert>;
    case 2:
      return <Alert variant="primary">{props.message}</Alert>;
    case 3:
      return <Alert variant="success">{props.message}</Alert>;

    default:
      return;
  }
}
