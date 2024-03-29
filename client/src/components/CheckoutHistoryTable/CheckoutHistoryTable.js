/**
 * Displays a table of checkout history of the given asset
 * @param {asset} asset - the asset tag of the asset whos checkout history you need to display
 */
import { useEffect, useState } from "react";
import { getAllRecords } from "../../api/RecordService";
import { getAllRecordsID } from "../../api/RecordService";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Alert, Table } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { formatDate } from "../../constants/FormatUtilities";

const CheckoutHistoryTable = ({ asset, student_id}) => {
  // Stores the checkout records for the given asset
  const [checkoutHistory, setCheckoutHistory] = useState(null);
  // Used to prevent crashes if the asset data hasn't loaded yet
  const [isLoading, setLoading] = useState(true);
  // Gets the theme value
  const [theme, setTheme] = useOutletContext();

  useEffect(() => {
    if (!checkoutHistory && asset!=null) {
      getAllRecords(asset).then((result) => {
        setCheckoutHistory(result);
      });
    }
    else if (!checkoutHistory && student_id!=null){
      getAllRecordsID(student_id).then((result) => {
        setCheckoutHistory(result);
      })
    }
  }, [checkoutHistory, asset, student_id]);

  // Updates the loading flag
  useEffect(() => {
    if (checkoutHistory) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [checkoutHistory]);

  useEffect(() => {}, [isLoading]);

  return (
    <>
      {/**Renders the loading spinner if we are still waiting for the checkout history */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/**Renders an alert if there is no checkout history */}
          {checkoutHistory.length === 0 && asset != null ? (
            <Alert variant={theme}>This asset has no checkout history. </Alert>
          ) : checkoutHistory.length === 0 && student_id != null ? (
            <Alert variant={theme}>This student has no checkout history. </Alert>
          ) : (
            <Table striped variant={theme}>
              <thead>
                <tr>
                  <th>Record ID</th>
                  {asset != null ? <th>Student ID</th> : <th>Asset Tag</th>}
                  <th>Operator ID</th>
                  <th>Out Date</th>
                  <th>Due Date</th>
                  <th>Returned Date</th>
                </tr>
              </thead>
              <tbody>
                {checkoutHistory.map((record) => (
                  <tr>
                    <td>{record.record_id}</td>
                    {asset != null ? <td>{record.student_id}</td> : <td>{record.asset_tag}</td>}
                    <td>{record.operator_id}</td>
                    <td>{formatDate(record.out_date)}</td>
                    <td>{formatDate(record.due_date)}</td>
                    <td>{formatDate(record.in_date)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </>
  );
};

export default CheckoutHistoryTable;
