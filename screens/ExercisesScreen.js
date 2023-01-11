import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Table,
  TableRow,
  TableCell,
} from "react-native";
import * as SQLite from "expo-sqlite";

const ExercisesScreen = (navigation) => {
  const [database, setDatabase] = useState();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!database) {
      const db = SQLite.openDatabase("MyDatabase.db");
      setDatabase(db);
    }
  }, []);

  useEffect(() => {
    if (database) {
      database.transaction(
        (tx) => {
          tx.executeSql(
            "create table if not exists Items (id integer primary key not null, name text, type text, description text);"
          );
        },
        null,
        loadItems
      );
    }
  }, [database]);

  const loadItems = () => {
    database.transaction((tx) => {
      tx.executeSql("select * from Items;", [], (_, { rows: { _array } }) => {
        setItems(_array);
        console.log(_array);
      });
    });
  };

  const addItem = () => {
    const id = 1;
    const name = `Push up`;
    const type = "Arms";
    const description = "Up and down";

    database.transaction(
      (tx) => {
        tx.executeSql(
          "insert into Items (id, name, type, description) values (?, ?, ?, ?);",
          [id, name, type, description]
        );
      },
      null,
      loadItems
    );
  };

  const wipeItems = () => {
    database.transaction(
      (tx) => {
        tx.executeSql("DELETE FROM Items;");
      },
      null,
      loadItems
    );
  };

  return (
    <View>
      <Button title="Add Item" onPress={addItem} />
      <Button title="Wipe Items" onPress={wipeItems} />
      <ScrollView>
        {items.map((item) => (
          <View key={item.id} style={styles.exerciseView}>
            <Text>{item.id}</Text>
            <Text>{item.name}</Text>
            <Text>{item.type}</Text>
            <Text>{item.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tableHeader: {
    fontWeight: "bold",
  },
  exerciseView: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
});

export default ExercisesScreen;
