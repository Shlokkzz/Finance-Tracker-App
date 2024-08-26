/* eslint-disable @typescript-eslint/no-unused-vars */
import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";

export interface FinancialRecord {
  _id?: string;
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

interface FinancialRecordContextType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void;
  updateRecord: (id: string, newRecord: FinancialRecord) => void;
  deleteRecord: (id: string) => void;
}

export const FinancialRecordContext = createContext<
  FinancialRecordContextType | undefined
>(undefined);

export const FinancialRecordsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const { user } = useUser();

  // fetch all records at the start
  const fetchRecords = async () => {
    if (!user) return;
    const response = await fetch(
      `http://localhost:3001/financial-records/getAllByUserId/${user.id}`
    );
    if (response.ok) {
      const records = await response.json();
      setRecords(records);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [user]);

  // add new record
  const addRecord = async (record: FinancialRecord) => {
    const response = await fetch("http://localhost:3001/financial-records", {
      method: "POST",
      body: JSON.stringify(record),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response.ok) {
      const newRecord = await response.json();
      setRecords((prev) => [...prev, newRecord]);
    }
  };

  const updateRecord = async (id: string, newRecord: FinancialRecord) => {
    // if(!user)return ;
    const response = await fetch(
      `http://localhost:3001/financial-records/${id}`, // use the mongodb _id
      {
        method: "PUT",
        body: JSON.stringify(newRecord),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (response.ok) {
      const newRecord = await response.json();
      setRecords((prev) =>
        prev.map((record) => {
          if (record._id === id) return newRecord;
          else return record;
        })
      );
    }
  };

  const deleteRecord = async (id: string) => {
    const response = await fetch(
      `http://localhost:3001/financial-records/${id}`, // use the mongodb _id
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      const deletedRecord = await response.json();
      setRecords((prev) => prev.filter((record) => record._id !== deletedRecord._id));
    }
  };

  return (
    <FinancialRecordContext.Provider
      value={{ records, addRecord, updateRecord ,deleteRecord}}
    >
      {children}
    </FinancialRecordContext.Provider>
  );
};

export const useFinancialRecords = () => {
  const context = useContext<FinancialRecordContextType | undefined>(
    FinancialRecordContext
  );
  if (!context) {
    throw new Error(
      "useFinancialRecords must be accessed inside FinancialRecordsProvider"
    );
  }
  return context;
};
