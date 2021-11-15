import React from "react";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return <div> Hello {user.fullName} </div>;
};
export default Dashboard;
