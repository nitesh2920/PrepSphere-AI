import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import Banner from "./_components/Banner";
import CourseList from "./_components/CourseList";
import PaymentSuccessHandler from "@/app/_components/PaymentSuccessHandler";


async function Dashboard() {
  const user = await currentUser();
  // Check if the user is new by comparing createdAt and lastSignInAt timestamps.
  // A small threshold of 1 minute (60000ms) is used to account for minor delays.
  const isNewUser = !!(user?.createdAt && user?.lastSignInAt && (user.lastSignInAt - user.createdAt) < 60000);

  return (
    <>
      <PaymentSuccessHandler />
      <Banner isNewUser={isNewUser} />
      <CourseList/>
    </>
  );
}

export default Dashboard;