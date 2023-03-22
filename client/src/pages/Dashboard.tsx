import React, { Fragment } from "react";
import Sidebar from "../components/Sidebar";
import { useUsersQuery } from "../gql/generated/schema";

const Dashboard = () => {
  const { error: errorUsers, loading: loadingUsers, data } = useUsersQuery();
  const users = data?.users || [];

  console.log(errorUsers, loadingUsers);

  const usersList = users.map((u) => {
    return <div key={u.id}>{u.email}</div>;
  });
  return (
    <Fragment>
      <Sidebar open={true} onClose={() => {}} />
      {loadingUsers ? "Chargement" : usersList}
      <div>test</div>
    </Fragment>
  );
};

export default Dashboard;
