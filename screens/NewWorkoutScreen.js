// importing all the required components from the react native assets
import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Settings,
} from "react-native";

/* importing the SQLite library allowing for the connection 
and operation on the database */
import * as SQLite from "expo-sqlite";

// creating const function for the NewWorkoutScreen
const NewWorkoutScreen = (navigation) => {
  // this variable opens the connection to the database and is used as a reference to the database
  const db = SQLite.openDatabase("MyDatabase.db");

  /* variables below are declared with the use of the useState react hook because the
   components need to maintain inputted data between renders,
   the first term inside the square bracket is the created variable,
   the second term is a newly created function used for setting the
   value of the variable*/

  // declaring state variable used to store the name of one of the exercises chosen by the user
  const [tempEx1, setTempEx1] = useState("");
  // declaring state variable used to store the name of one of the exercises chosen by the user
  const [tempEx2, setTempEx2] = useState("");
  // declaring state variable used for holding the data extracted from the table "items"
  const [items, setItems] = useState([]);
  // declaring state variable used for holding the data extracted from the table "workoutz"
  const [workoutz, setWorkoutz] = useState([]);
  // declaring state variable used to store the name of the workout given by the user
  const [workoutName, setWorkoutName] = React.useState(null);

  /* using useEffet react hook allows the inside of the hook
   to be updated after each render of the application */
  useEffect(() => {
    // this module allows to perform SQL queries in the database from the code
    db.transaction((tx) => {
      tx.executeSql(
        /* this operation creates the table "items" only if it hasn't been created before,
        with id created automatically by the database */
        `CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY NOT NULL AUTOINCREMENT, name TEXT, type TEXT, description TEXT);`
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        /* this operation creates the table "workoutz" only if it hasn't been created before,
        with id created automatically by the database */
        `CREATE TABLE IF NOT EXISTS workoutz (work_id INTEGER PRIMARY KEY NOT NULL AUTOINCREMENT, work_name TEXT, ex_1 TEXT, ex_2 TEXT);`
      );
    });

    // this transaction selects all the data from the "items" table and stores it to the "items" variable
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM items",
        null,
        (txObj, resultSet) => setItems(resultSet.rows._array),
        (txObj, error) => console.log(error)
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
  }, []);

  /* this function sets the value of tempEx1 and tempEx2,
  by giving it the value of the name of the exercise that the user clicked on */
  const addItem = (name) => {
    setTempEx1(name);
    setTempEx2(name);
  };

  // function "addWorkoutz" inserts all the values inputted by the user into the "workoutz" table
  const addWorkoutz = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO workoutz (work_name, ex_1, ex_2) values (?, ?, ?);",
        [workoutName, tempEx1, tempEx2],
        (txObj, resultSet) => {
          // ??????????????????????????
          const newWorkoutz = [
            ...workoutz,
            {
              work_name: workoutName,
              ex_1: tempEx1,
              ex_2: tempEx2,
            },
          ];
          setWorkoutz(newWorkoutz);
        }
      );
    });
  };

  return (
    <View>
      {/* this components allows user to input the name of the workout */}
      <TextInput
        style={button.input}
        /* since the workoutName variable operates within the useState,
         the function changing its value is required */
        onChangeText={setWorkoutName}
        /* placeholder attribute allows to display inside of the text input box,
         a greyed out suggestion when it comes to what user should input */
        value={workoutName}
        placeholder="Workout Name"
        // keyboardType attribute specifies what type of digital keyboard should be provided for input
        keyboardType="text"
      />
      {/* ScrollView component allows for scrolling of the contents inside of it,
       in case the contents do not fit */}
      <ScrollView>
        {/* this part of the code extracts the data from "item" variable,
         which conta ins data extracted from the database and maps it to the 
         text below */}
        {items.map((item) => (
          /* key attribute to the view component is a requirement of the react native map function,
           keys help React identify which items have changed, are added, or are removed.*/
          <View key={item.id} style={styles.exerciseView}>
            {/* TouchableOpacity is a component that allows to capture the clicks of the user on
            the table below allowing the user to choose the exercises for the workout by clicking on them,
            which calls the function "addItem" and gives it the name of the exercise chosen by the user */}
            <TouchableOpacity key={item.id} onPress={() => addItem(item.name)}>
              {/* below values of different fields of the same record that has been extracted from
            the database and stored in "item" variable */}
              <Text>{item.id}</Text>
              <Text>{item.name}</Text>
              <Text>{item.type}</Text>
              <Text>{item.description}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {/* the button components create a button with an attribute calling addWorkout function */}
      <Button title="Add Workout" onPress={addWorkoutz} />
    </View>
  );
};

// this is the style container used by the text input boxes to specify the way they are displayed
const button = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

const styles = StyleSheet.create({
  // this is the style container used by the exercises table to specify the way it is displayed
  exerciseView: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    borderTopWidth: 2,
  },
});

// exporting the function so it can be imported by the "App.js" and used as a component
export default NewWorkoutScreen;
