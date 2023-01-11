import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Items,
  Table,
  TableRow,
  TableCell,
  TouchableOpacity,
} from "react-native";
import * as SQLite from "expo-sqlite";

const NewWorkoutScreen = (navigation) => {
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
    const id = 2;
    const name = `Push up`;
    const type = "Arms";
    const description = "Up and down";
  };

  const tempid = -1;

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
      <ScrollView>
        {items.map((item) => (
          <View key={item.id} style={styles.exerciseView}>
            <TouchableOpacity
              key={id}
              onPress={() => onPressItem && onPressItem(id)}
            >
              <Text>{item.id}</Text>
              <Text>{item.name}</Text>
              <Text>{item.type}</Text>
              <Text>{item.description}</Text>
            </TouchableOpacity>
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

export default NewWorkoutScreen;
