// importing all the required components from the react native assets
import React, { useState, useEffect, Component } from "react";
import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";

/* importing the SQLite library allowing for the connection 
and operation on the database */
import * as SQLite from "expo-sqlite";

// creating const function for the ExercisesScreen
const ExercisesScreen = (navigation) => {
  /* variables below are declared with the use of the useState react hook because the
   components need to maintain inputted data between renders,
   the first term inside the square bracket is the created variable,
   the second term is a newly created function used for setting the
   value of the variable*/

  // declaring state variable used by the database
  const [database, setDatabase] = useState();
  // declaring state variable used for holding the data extracted from the database
  const [items, setItems] = useState([]);
  // declaring state variable used to store the name of the exercise given by the user
  const [exerciseName, setExerciseName] = React.useState(null);
  // declaring state variable used to store the type of the exercise given by the user
  const [exerciseType, setExerciseType] = React.useState(null);
  // declaring state variable used to store the youtube link of the exercise given by the user
  const [exerciseDescription, setExerciseDescription] = React.useState(null);

  /* using useEffet react hook allows the inside of the hook
   to be updated after each render of the application */
  useEffect(() => {
    // this condition opens the connection with the database only if it hasn't been opened before
    if (!database) {
      const db = SQLite.openDatabase("MyDatabase.db");
      setDatabase(db);
    }
  }, []);

  useEffect(() => {
    // this condition only activates the operation if the connection with the database was initiated
    if (database) {
      // this module allows to perform SQL queries in the database from the code
      database.transaction(
        (tx) => {
          tx.executeSql(
            /* this operation creates the table "items" only if it hasn't been created before,
             with id created automatically by the database */
            "create table if not exists items (id integer primary key not null AUTOINCREMENT, name text, type text, description text);"
          );
        },
        null,
        // at the end of this hook, "loadItems" function is called, which selects all the data from the table "items"
        loadItems
      );
    }
  }, [database]);

  // function "loadItems" selects all the data from the "items" table and stores it to the "items" variable
  const loadItems = () => {
    database.transaction((tx) => {
      tx.executeSql("select * from items;", [], (_, { rows: { _array } }) => {
        // function "setItems" sets the value of the "items" variable
        setItems(_array);
        // this is the request to print all the data from the "items" table in the console for debugging purposes
        console.log(_array);
      });
    });
  };

  // function "addItems" inserts all the values inputted by the user into the "items" table
  const addItem = () => {
    database.transaction(
      (tx) => {
        tx.executeSql(
          "insert into items (name, type, description) values (?, ?, ?);",
          /* below are three variables which's values are inputted into the database, 
          the values of these variables are inputted by user */
          [exerciseName, exerciseType, exerciseDescription]
        );
      },
      null,
      loadItems
    );
  };

  // function "wipeItems" deletes all values from the "items" table in the database
  const wipeItems = () => {
    database.transaction(
      (tx) => {
        tx.executeSql("DELETE FROM items;");
      },
      null,
      loadItems
    );
  };

  return (
    <View>
      {/* this components allows user to input the name of the exercise */}
      <TextInput
        style={button.input}
        /* since the exerciseName variable operates within the useState,
         the function changing its value is required */
        onChangeText={setExerciseName}
        value={exerciseName}
        /* placeholder attribute allows to display inside of the text input box,
         a greyed out suggestion when it comes to what user should input */
        placeholder="Exercise Name"
        // keyboardType attribute specifies what type of digital keyboard should be provided for input
        keyboardType="text"
      />
      <TextInput
        style={button.input}
        onChangeText={setExerciseType}
        value={exerciseType}
        placeholder="Exercise Type"
        keyboardType="text"
      />
      <TextInput
        style={button.input}
        onChangeText={setExerciseDescription}
        value={exerciseDescription}
        placeholder="Exercise YT Link"
        keyboardType="text"
      />
      {/* the button components create a button with an attribute calling specific functions */}
      <Button title="Add Item" onPress={addItem} />
      <Button title="Wipe Items" onPress={wipeItems} />
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
            {/* below values of different fields of the same record that has been extracted from
            the database and stored in "item" variable */}
            <Text>{item.id}</Text>
            <Text>{item.name}</Text>
            <Text>{item.type}</Text>
            {/* this text component displays the youtube link of the exercise while having an
            onPress attribute allowing to open the link in the browser upon clicking */}
            <Text
              style={styles.textStyle}
              onPress={() => Linking.openURL(item.description)}
            >
              {item.description}
            </Text>
          </View>
        ))}
      </ScrollView>
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
  },
  // this is the style container used by the link text component to specify the way they are displayed
  textStyle: {
    textDecorationLine: "underline",
    color: "blue",
  },
});

// exporting the function so it can be imported by the "App.js" and used as a component
export default ExercisesScreen;
