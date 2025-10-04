import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import Banner from "./_components/Banner";

async function Dashboard() {
  const user = await currentUser();
  // Check if the user is new by comparing createdAt and lastSignInAt timestamps.
  // A small threshold of 1 minute (60000ms) is used to account for minor delays.
  const isNewUser = !!(user?.createdAt && user?.lastSignInAt && (user.lastSignInAt - user.createdAt) < 60000);

  return (
    <>
      <Banner isNewUser={isNewUser} />
    </>
  );
}

export default Dashboard;