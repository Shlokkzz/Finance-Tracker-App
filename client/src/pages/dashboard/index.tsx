import { useUser } from "@clerk/clerk-react";
import { FinRecordForm } from "./finRecordForm";
import { FinRecordList } from "./finRecordList";

export const Dashboard = () => {
  const { user } = useUser();
  return (
    <div className="dashboard-container">
      <h1>Welcome {user?.firstName}! Here are your finances</h1>
      <FinRecordForm />
      <FinRecordList />
    </div>
  );
};
