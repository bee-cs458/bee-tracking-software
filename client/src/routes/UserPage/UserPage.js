import React from "react";
import UsersTable from "../../components/UserTable/UserTable";
import "./UserPage.css";



function UserPage() {



    return (
        <div>
            <div className="header-container"/>
            <div className="main-content">
                <h1 className="mb-3">Users</h1>
                <UsersTable></UsersTable>
            </div>
        </div>
    );
}

export default UserPage;