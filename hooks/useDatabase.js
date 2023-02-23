import React, { useEffect, useState } from "react";
import { database } from "../utils/database";

export default function useDatabase() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDataAsync() {
      try {
        // Setup all databases
        await database.items.setup();
        await database.workouts.setup();

        setIsLoading(false);
      } catch (e) {
        console.warn(e);
      }
    }

    loadDataAsync();
  }, []);

  return isLoading;
}
