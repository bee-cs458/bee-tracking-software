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

  return (
    <div>
      {records != null && records.length > 0 ? (
        <div>
          <Table bordered>
            <thead>
              <tr>
                <th>Student</th>
                <th>Check Out</th>
                <th>Asset</th>
                <th>Due Date</th>
                <th>Check In</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {records != null &&
                records.map((record) => (
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
                    date={today}
                  ></RecordRow>
                ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <Alert variant="warning">No records found!</Alert>
      )}
    </div>
  );
}
