import React, { Fragment } from "react";
import AppLayout from "../AppLayout/AppLayout";
import { useGetUserPagesQuery } from "../../gql/generated/schema";

const UserPages = ({ id }: { id: number }) => {
    const { error: errorPages, loading: loadingPages, data } = useGetUserPagesQuery({
        variables: { id },
    });
    const pages = data?.getUserPages || [];

    console.log(errorPages, loadingPages);

    const pagesList = pages.map((p) => {
        return <div key={p.id}>{p.url}</div>;
     });

  return (
    <AppLayout>
      <Fragment>
        {loadingPages ? "Chargement" : pagesList}
        <div></div>
      </Fragment>
    </AppLayout>
    
  );
};

export default UserPages;
