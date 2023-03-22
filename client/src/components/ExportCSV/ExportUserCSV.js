import React, { components } from 'react';
import { CSVLink } from "react-csv";
import { getAllUsers } from '../../api/UserService';
import { Button } from 'react-bootstrap';

const UserHeaders = [
    { label: "User Id", key: "user_id"},
    { label: "First Name", key: "first_name"},
    { label: "Last Name", key: "last_name"},
    { label: "Strikes", key: "strikes"},
    { label: "Permissions", key: "permissions"},
    { label: "Advanced", key: "advanced"}
]

class UserAsyncCSV extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: []
      }
      this.csvLinkEl = React.createRef();
    }


    // Gets all the assets
    downloadUserReport = async () => {
        const data = await getAllUsers();
        this.setState({ data: data }, () => {
          setTimeout(() => {
            this.csvLinkEl.current.link.click();
          });
        });
      }


      //Renders a button for the user to press and download a CSV with all Assets
      render() {
        const { data } = this.state;
    
        return (
          <div>
            <Button 
            className="beets_buttons" onClick={this.downloadUserReport}>Export to CSV</Button>
            <CSVLink
              headers={UserHeaders}
              filename="Beets_User_Report_Async.csv"
              data={data}
              ref={this.csvLinkEl}
            />
          </div>
        );
      }
    }
    
    export default UserAsyncCSV; 