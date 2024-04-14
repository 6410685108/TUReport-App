import React, { useEffect, useState } from "react";
import { database } from "./Database";

const useDatabase = () => {
  const [databaseInitialized, setDatabaseInitialized] = useState(false);

  const initializeDatabase = () => {
    database
      .postInitializeDatabase()
      .then(() => database.userInitializeDatabase())
      .then(() => setDatabaseInitialized(true))
      .catch((error) => {
        console.error("Error initializing database:", error);
        alert("An error occurred while initializing the database");
      });
  };

  useEffect(() => {
    initializeDatabase();
  }, []);

  return databaseInitialized;
};

export default useDatabase;
