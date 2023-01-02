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

const ExercisesScreen = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const db = SQLite.openDatabase("MyDatabase.db");
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists Items (id integer primary key not null, name text, type text, description text);"
        );
      },
      null,
      loadItems
    );
  }, []);

  const loadItems = () => {
    const db = SQLite.openDatabase("MyDatabase.db");
    db.transaction((tx) => {
      tx.executeSql("select * from Items;", [], (_, { rows: { _array } }) =>
        setItems(_array)
      );
    });
  };

  const addItem = () => {
    // Generate a random ID
    const id = Math.floor(Math.random() * 100000);
    const name = `Item ${id}`;
    const type = "Fruit";
    const description = "A delicious and nutritious fruit";
    const db = SQLite.openDatabase("MyDatabase.db");
    db.transaction(
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

  return (
    <View>
      <Button title="Add Item" onPress={addItem} />
      <ScrollView>
        <Table>
          <TableRow>
            <TableCell>
              <Text style={styles.tableHeader}>ID</Text>
            </TableCell>
            <TableCell>
              <Text style={styles.tableHeader}>Name</Text>
            </TableCell>
            <TableCell>
              <Text style={styles.tableHeader}>Type</Text>
            </TableCell>
            <TableCell>
              <Text style={styles.tableHeader}>Description</Text>
            </TableCell>
          </TableRow>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Text>{item.id}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.name}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.type}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.description}</Text>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tableHeader: {
    fontWeight: "bold",
  },
});

export default ExercisesScreen;
