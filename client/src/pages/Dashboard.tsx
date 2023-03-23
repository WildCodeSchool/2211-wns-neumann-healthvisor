import React, { Fragment } from "react";
import AppLayout from "../components/AppLayout/AppLayout";
import { useUsersQuery } from "../gql/generated/schema";

const Dashboard = () => {
  const { error: errorUsers, loading: loadingUsers, data } = useUsersQuery();
  const users = data?.users || [];

  console.log(errorUsers, loadingUsers);

  const usersList = users.map((u) => {
    return <div key={u.id}>{u.email}</div>;
  });
  return (
    <AppLayout>
      <Fragment>
        {loadingUsers ? "Chargement" : usersList}
        <div></div>
      </Fragment>
    </AppLayout>
  );
};

export default Dashboard;
