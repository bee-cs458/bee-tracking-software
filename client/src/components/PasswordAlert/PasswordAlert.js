export default function PasswordAlert(props) {
  if (props.message !== "") {
    //the componet won't appear unless there is a message in it.
    return (
      <div //bootstrap alert div class and role
        className="alert alert-danger "
        role="alert"
        dangerouslySetInnerHTML={{ __html: props.message }} 
        //the above thing is what allows for the <br> html element work within the message.
      ></div>
    );
  } else return;
}
