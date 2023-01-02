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
    // Generate a random ID
    //const id = Math.floor(Math.random() * 100000);
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
  //      <Button title="Add Item" onPress={addItem} />
  //<Button title="Wipe Items" onPress={wipeItems} />

  return (
    <View>
      <ScrollView>
        {items.map((item) => (
          <View key={item.id} style={styles.exerciseView}>
            <Text>{item.id}</Text>
            <Text>{item.name}</Text>
            <Text>{item.type}</Text>
            <Text>{item.description}</Text>
          </View>
        ))}

        {/* <Table>
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
        </Table> */}
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
