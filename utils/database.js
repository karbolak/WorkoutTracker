import React from "react";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("database.db");

export const database = {
  items: {
    setup: async () => {
      return new Promise((resolve, reject) => {
        db.transaction(
          (tx) => {
            tx.executeSql(
              "CREATE TABLE IF NOT EXISTS Items (id integer primary key not null, name text, type text, description text);"
            );
          },
          (_, error) => {
            console.log("[Items][setup][Error] Error");
            console.log(error);
            reject(error);
          },
          (_, success) => {
            console.log("[Items][setup] Success");
            resolve(success);
          }
        );
      });
    },
    wipe: (loadFunc) => {
      db.transaction(
        (tx) => {
          tx.executeSql("DELETE FROM Items");
        },
        (t, error) => {
          console.log("[Items][wipe][Error] Error");
          console.log(error);
        },
        (t, success) => {
          console.log("[Items][wipe] Success");
          loadFunc();
        }
      );
    },
    insert: ({ name, type, description }, loadFunc) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "INSERT INTO Items (name, type, description) values (?, ?, ?)",
            [name, type, description]
          );
        },
        (t, error) => {
          console.log("[Items][insert][Error] Error");
          console.log(error);
        },
        (t, success) => {
          console.log("[Items][insert] Success");
          loadFunc();
        }
      );
    },
    getAll: (getAllFunc) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "SELECT * FROM Items",
            [],
            (_, { rows: { _array } }) => {
              getAllFunc(_array);
            }
          );
        },
        (t, error) => {
          console.log("[Items][getAll][Error] Error");
          console.log(error);
        },
        (_t, _success) => {
          console.log("[Items][getAll] Success");
        }
      );
    },
  },
  workouts: {
    setup: async () => {
      return new Promise((resolve, reject) => {
        db.transaction(
          (tx) => {
            tx.executeSql(
              "CREATE TABLE IF NOT EXISTS Workouts (work_id integer primary key not null, work_name text, ex_1 text);"
            );
          },
          (_, error) => {
            console.log("[Workouts][setup][Error] Error");
            console.log(error);
            reject(error);
          },
          (_, success) => {
            console.log("[Workouts][setup] Success");
            resolve(success);
          }
        );
      });
    },
    wipe: () => {
      db.transaction(
        (tx) => {
          tx.executeSql("DELETE FROM Workouts");
        },
        (t, error) => {
          console.log("[Workouts][wipe][Error] Error");
          console.log(error);
        },
        (t, success) => {
          console.log("[Workouts][wipe] Success");
        }
      );
    },
    insert: ({ name, ex }, loadFunc) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "INSERT INTO Workouts (work_name, ex_1) values (?, ?)",
            [name, ex]
          );
        },
        (t, error) => {
          console.log("[Workouts][insert][Error] Error");
          console.log(error);
        },
        (t, success) => {
          console.log("[Workouts][insert] Success");
          loadFunc();
        }
      );
    },
    getAll: (getAllFunc) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "SELECT * FROM Workouts",
            [],
            (_, { rows: { _array } }) => {
              getAllFunc(_array);
            }
          );
        },
        (t, error) => {
          console.log("[Workouts][getAll][Error] Error");
          console.log(error);
        },
        (_t, _success) => {
          console.log("[Workouts][getAll] Success");
        }
      );
    },
  },
};
