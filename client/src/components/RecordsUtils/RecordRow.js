import "./RecordRow.css";

export default function CheckInRow(props) {
  const record = props.record;

  const dueDate = new Date(record.due_date);

  function formatDate(input) {
    if (input != null) {
      const dateValues = input.split("T")[0];
      const [year, month, day] = dateValues.split("-");
      const formattedDate = [month, "/", day, "/", year];
      return formattedDate;
    } else {
      return input;
    }
  }

  return (
    <tr
      style={{
        background: record.in_date === null ? "#55ff77" : (props.date > dueDate && !record.in_date ? "#ffb9b9" : ""),
      }}
    >
      <td>{props.userName}</td>
      <td>{formatDate(record.out_date)}</td>
      <td>{props.assetName}</td>
      <td>{formatDate(record.due_date)}</td>
      <td>{formatDate(record.in_date)}</td>
      <td>{record.notes}</td>
    </tr>
  );
}
