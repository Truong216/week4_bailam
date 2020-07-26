import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SingleTodoScreen ({props, route}) {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.bodyText}>Single Todo Screen</Text> */}
      <Text style={styles.headerText}>
        {route.params.id}. {route.params.status} 
      </Text>
      <Text style={styles.bodyText}>{route.params.body}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerContainer: {
    flexDirection: 'row'
  },
  headerText: {
    fontSize: 30
  },
  bodyText: {
    fontSize: 50
  }
});