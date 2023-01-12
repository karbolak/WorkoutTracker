// importing all the required components from the react native assets
import React, { useState, useEffect } from "react";
import { Button, View, Text, StyleSheet, ScrollView } from "react-native";

/* importing the SQLite library allowing for the connection 
and operation on the database */
import * as SQLite from "expo-sqlite";

// creating const function for the HistoryScreen
const HistoryScreen = (navigation) => {
  // this variable opens the connection to the database and is used as a reference to the database
  const db = SQLite.openDatabase("MyDatabase.db");

  /* declared with the use of the useState react hook because the
   components need to maintain inputted data between renders,
   the first term inside the square bracket is the created variable,
   the second term is a newly created function used for setting the
   value of the variable*/

  // declaring state variable used for holding the data extracted from the table "workoutz"
  const [workoutz, setWorkoutz] = useState([]);

  // declaring state variable used for holding the
  const [loading, setLoading] = useState(true);

  // this condition only activates the operation if the connection with the database was initiated
  useEffect(() => {
    // this module allows to perform SQL queries in the database from the code
    db.transaction((tx) => {
      /* this operation creates the table "workoutz" only if it hasn't been created before,
          with id created automatically by the database */
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS workoutz (work_id INTEGER PRIMARY KEY NOT NULL AUTOINCREMENT, work_name TEXT, ex_1 TEXT, ex_2 TEXT);`
      );
    });

    // this transaction selects all the data from the "workoutz" table and stores it to the "workoutz" variable
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM workoutz",
        null,
        (txObj, resultSet) => setWorkoutz(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
    setLoading(false);
  }, []);

  // function "wipeWorkoutz" deletes all values from the "workoutz" table in the database
  const wipeWorkouts = () => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM workoutz;");
    });
  };

  return (
    <View>
      {/* the button components create a button with an attribute calling specific functions */}
      <Button title="Wipe Workouts" onPress={wipeWorkouts} />
      {/* ScrollView component allows for scrolling of the contents inside of it,
       in case the contents do not fit */}
      <ScrollView>
        {/* this condition displays the information that the database is loading
         if the connection to the database hasn't been compleated */}
        {loading ? (
          <Text>"Loading..."</Text>
        ) : (
          <>
            {/* this part of the code extracts the data from "item" variable,
         which conta ins data extracted from the database and maps it to the 
         text below */}
            {workoutz.map((workout) => (
              <ScrollView>
                {/* key attribute to the view component is a requirement of the react native map function,
              keys help React identify which items have changed, are added, or are removed.*/}
                <View key={workout.work_id} style={styles.exerciseView}>
                  {/* below values of different fields of the same record that has been extracted from
                the database and stored in "item" variable */}
                  <Text>{workout.work_id}</Text>
                  <Text>{workout.work_name}</Text>
                  <Text>{workout.ex_1}</Text>
                  <Text>{workout.ex_2}</Text>
                </View>
              </ScrollView>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
};

// this is the style container used by the workouts table to specify the way it is displayed
const styles = StyleSheet.create({
  exerciseView: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    borderTopWidth: 2,
  },
});

// exporting the function so it can be imported by the "App.js" and used as a component
export default HistoryScreen;
