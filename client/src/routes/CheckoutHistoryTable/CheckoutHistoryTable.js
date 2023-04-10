/**
 * Displays a table of checkout history of the given asset
 * @param {asset} asset - the asset tag of the asset whos checkout history you need to display
 */
import { useEffect, useState } from "react";
import { getAllRecords } from "../../api/RecordService";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { Table } from "react-bootstrap";

const CheckoutHistoryTable = ({ asset }) => {
  const [checkoutHistory, setCheckoutHistory] = useState(null);
  // Used to prevent crashes if the asset data hasn't loaded yet
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!checkoutHistory) {
      getAllRecords(102).then((result) => {
        setCheckoutHistory(result);
      });
    }
  }, []);

  // Updates the loading flag
  useEffect(() => {
    if (checkoutHistory) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [checkoutHistory]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Table striped>
          <thead>
            <tr>
              <th>Record ID</th>
              <th>Asset Tag</th>
              <th>Student ID</th>
              <th>Operator ID</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {checkoutHistory.map((record) => (
              <tr>
                <td>{record.record_id}</td>
                <td>{record.asset_tag}</td>
                <td>{record.student_id}</td>
                <td>{record.operator_id}</td>
                <td>{record.due_date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default CheckoutHistoryTable;
