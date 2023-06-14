import React, { Fragment } from "react";
import AppLayout from "../components/AppLayout/AppLayout";
import UserPage from "../components/UserPage/UserPage";
import { useFetchUserByIdQuery, useUsersQuery } from "../gql/generated/schema";
import { useGetPageMutation } from "../gql/generated/schema";

const Dashboard = () => {
  const { error: errorUsers, loading: loadingUsers, data } = useUsersQuery();
  const users = data?.users || [];
  const pages = useGetPageMutation()
  console.log(pages);

  const usersList = users.map((u) => {
    return <div key={u.id}>{u.email}</div>;
  });

  return (
    <AppLayout>
      <Fragment>
        {loadingUsers ? "Chargement" : usersList}
        <div></div>
        <UserPage id={5} />
      </Fragment>
    </AppLayout>
  );
};

export default Dashboard;
