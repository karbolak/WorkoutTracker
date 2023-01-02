import React from "react";
import { View, Text, FlatList } from "react-native";
import { openDatabase } from "expo-sqlite";

SQLite.enablePromise(true);
const db = openDatabase("WorkoutTrackerDB.db");

export default class App extends React.Component {
  state = {
    items: [],
  };

  componentDidMount() {
    this.loadItems();
  }

  loadItems() {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from ExercisesList;",
        [],
        (_, { rows: { _array } }) => this.setState({ items: _array })
      );
    });
  }

  renderItem({ item }) {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  }

  render() {
    return (
      <FlatList
        data={this.state.items}
        renderItem={this.renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}
