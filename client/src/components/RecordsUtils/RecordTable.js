import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import RecordRow from "./RecordRow";
import { useState, useEffect } from "react";
import { getAllRecords } from "../../api/RecordService";
import { getAllAssets } from "../../api/AssetService";
import { getAllUsers } from "../../api/UserService";

export default function RecordTable() {
  const [records, setRecords] = useState();
  const [users, setUsers] = useState([{}]);
  const [assets, setAssets] = useState([{}]);

  const getInfo = async () => {
    await getAllRecords().then((result) => {
      setRecords(result);
    });

    await getAllUsers().then((result) => {
      setUsers(result);
    });

    await getAllAssets().then((result) => {
      setAssets(result);
    });
  };

  const today = new Date();

  useEffect(() => {
    getInfo();
  }, []);

  /**
   * Determines whether to render the table of records or the error message
   * Depending on whether the "records" state has values
   * @returns JSX of the record table or the error message
   */
  function getTable() {
    if (records !== null && records !== undefined && records?.length > 0) {
      return (
        <div>
          <Table bordered>
            <thead>
              <tr>
                <th>Student</th>
                <th>Student ID</th>
                <th>Operator</th>
                <th>Operator ID</th>
                <th>Check Out</th>
                <th>Asset Tag</th>
                <th>Asset</th>
                <th>Due Date</th>
                <th>Check In</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <RecordRow
                  key={record.record_id}
                  record={record}
                  assetName={
                    assets.find((obj) => {
                      return obj.asset_tag === record.asset_tag;
                    }) !== undefined
                      ? assets.find((obj) => {
                          return obj.asset_tag === record.asset_tag;
                        }).name
                      : "Loading Asset Tag..."
                  }
                  userName={
                    users.find((obj) => {
                      return obj.user_id === record.student_id;
                    }) !== undefined
                      ? users.find((obj) => {
                          return obj.user_id === record.student_id;
                        }).first_name +
                        " " +
                        users.find((obj) => {
                          return obj.user_id === record.student_id;
                        }).last_name
                      : "Loading Student Name..."
                  }
                  opName={
                    users.find((obj) => {
                      return obj.user_id === record.operator_id;
                    }) !== undefined
                      ? users.find((obj) => {
                          return obj.user_id === record.operator_id;
                        }).first_name +
                        " " +
                        users.find((obj) => {
                          return obj.user_id === record.operator_id;
                        }).last_name
                      : "Loading Student Name..."
                  }
                  date={today}
                ></RecordRow>
              ))}
            </tbody>
          </Table>
        </div>
      );
    } else {
      return <Alert variant="warning">No records found!</Alert>;
    }
  }

  return (
    <div>
      <>{getTable()}</>
    </div>
  );
}
