import React from "react";
import Layout from "../Layout";
import EditProjectForm from "../components/EditProjectForm";

const EditProject = () => {
  return (
    <Layout>
      <div className="pr-5">
        <EditProjectForm />
      </div>
    </Layout>
  );
};

export default EditProject;
