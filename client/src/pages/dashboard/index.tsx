import { SignedOut, useUser } from "@clerk/clerk-react";
import { FinRecordForm } from "./finRecordForm";
import { FinRecordList } from "./finRecordList";
import "./finRecord.css"
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { useMemo } from "react";
import { Navigate } from "react-router-dom";
export const Dashboard = () => {
  const { user } = useUser();

  const {records} =useFinancialRecords();
  const totalMonthly = useMemo(()=>{
    let total=0;
    records.forEach((item)=>{
      total+=item.amount;
    });
    return total;
  },[records]);
  return (
    <div className="dashboard-container">
      <h1>Welcome {user?.firstName}! Here are your finances</h1>
      <FinRecordForm />
      <h3>Total Expense: ${totalMonthly}</h3>
      <FinRecordList />
      <SignedOut>
        <Navigate to="/auth" />
      </SignedOut>
    </div>
  );
};
