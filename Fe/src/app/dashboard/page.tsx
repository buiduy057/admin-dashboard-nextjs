import React from "react";
import { requireAuth } from "@/src/lib/auth/requireAuth";

const Dashboard = async () => {
  const session = await requireAuth(["ADMIN"]);

  console.log("session", session);
  return <div>Dashboard</div>;
};

export default Dashboard;
