
export default function PasswordAlert(props) {
  if(props.message !== "") {
    return <div className="alert alert-danger "role="alert" dangerouslySetInnerHTML={{__html: props.message}} ></div>
  }
  else
      return;
}