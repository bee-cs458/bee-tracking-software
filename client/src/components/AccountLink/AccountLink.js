import React from "react";
import { useAuthenticatedUser } from "../Context/UserContext";
import { AccessControl } from "../AccessControl/AccessControl";
import { Ranks } from "../../constants/PermissionRanks";
import { Link } from "react-router-dom";

export const AccountLink = (props) => {
  const user = useAuthenticatedUser();

  return (
    <AccessControl allowedRank={Ranks.STUDENT}>
      <div style={{ margin: "auto" }}>
        <Link style={{ color: "#fff", textDecoration: "none" }} to="/profile">
          {user.first_name} {user.last_name}
        </Link>
      </div>
    </AccessControl>
  );
};
