import Alert from "react-bootstrap/Alert";

export default function ConditionalAlert(props) {
  switch (props.type) {
    case 0:
      return <Alert variant="warning">{props.message}</Alert>;
    case 1:
      return <Alert variant="warning">{props.message}</Alert>;
    case 2:
      return <Alert variant="warning">{props.message}</Alert>;
    case 3:
      return <Alert variant="success">{props.message}</Alert>;

    default:
      return;
  }
}

// type codes:
//     0 = no asset fouhnd
//     1 = asset not checked out
//     2 = student not found
//     3 = assets successfully checked in
