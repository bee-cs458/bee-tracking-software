import React, { components } from 'react';
import { Button } from 'react-bootstrap';
import { CSVLink } from "react-csv";
import { getAllRecords } from '../../api/RecordService';

//Constant headers for the CSV file and the corresponding key
const CheckoutRecordHeaders = [
    { label: "Record Id", key: "record_id"},
    { label: "Student Id", key: "student_id"},
    { label: "Operator Id", key: "operator_id"},
    { label: "Asset Tag", key: "asset_tag"},
    { label: "Notes", key: "notes"},
    { label: "Checkout Date", key: "out_date"},
    { label: "Check in Date", key: "in_date"},
    { label: "Due Date", key: "due_date"}
]


class CheckoutRecordCSV extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: []
      }
      this.csvLinkEl = React.createRef();
    }


    // Gets all the checkout records
    downloadCheckoutRecordReport = async () => {
        const data = await getAllRecords();
        this.setState({ data: data }, () => {
          setTimeout(() => {
            this.csvLinkEl.current.link.click();
          });
        });
      }


      //Renders a button for the user to press and download a CSV with all checkout Records
      render() {
        const { data } = this.state;
    
        return (
          <div>
            <Button onClick={this.downloadCheckoutRecordReport}>Export all Records to CSV</Button>
            <CSVLink
              headers={CheckoutRecordHeaders}
              filename="Beets_Checkout_Records_Report.csv"
              data={data}
              ref={this.csvLinkEl}
            />
          </div>
        );
      }
    }
    
    export default CheckoutRecordCSV; 