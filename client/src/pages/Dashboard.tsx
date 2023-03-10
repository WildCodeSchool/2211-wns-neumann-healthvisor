import React, { Fragment } from 'react';
import { useUsersQuery} from '../gql/generated/schema';

const Dashboard = () => {
  const { error: errorUsers, loading: loadingUsers, data } = useUsersQuery();
  const users = data?.users || [];

  console.log(errorUsers, loadingUsers);
 // const [users, { loading: processing }] = useUsersQuery();
 const usersList = users.map((u) => {
  return <div>{u.email}</div>
 })
  return (
    <Fragment>
      {loadingUsers? "Chargement":usersList}
    </Fragment>
  )
  
}

export default Dashboard