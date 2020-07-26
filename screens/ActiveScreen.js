import * as React from 'react';
import {useState} from 'react';
import { Text, View,Alert, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TODOS } from 'C:/Users/Admin/week4_assignment/utils/data';
import SingleTodoScreen from './SingleTodoScreen';
const TodoItem = props => {
  const statusStyle = {
    backgroundColor: props.todo.status === 'Done' ? 'ghostwhite' : 'lightsalmon'
  };
  const onLongPress = todo => {
    const prompt = `"${todo.body}"`;
    Alert.alert(
      'Bạn Chắc chắn muốn xóa ?',
      prompt,
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Cancel Pressed'),
          style: 'Hủy'
        },
        { text: 'OK', onPress: () => props.onDeleteTodo(todo.id) }
      ],
      { cancelable: true }
    );
  };
  return (
    <TouchableOpacity
      key={props.todo.body}
      style={[styles.todoItem, statusStyle]}
      onLongPress={() => onLongPress(props.todo)}
      onPress={() => props.onToggleTodo(props.todo.id)}
    >
      <Text style={styles.todoText}>
        {props.idx + 1}: {props.todo.body}
      </Text>
    </TouchableOpacity>
  );
};
 function ActiveScreen({ navigation }) {
  const [todoList, setTodoList] = useState(TODOS);
  const onToggleTodo = id => {
    const todo = todoList.find(todo => todo.id === id);
    setTimeout(() => {
      const foundPosition = todoList.findIndex(todo => todo.id === id);
      navigation.navigate('SingleTodo', {
      id: foundPosition + 1,
      status: todo.status,
      body: todo.body,  
    });
    }, 500);
  };
  const onDeleteTodo = id => {
    const newTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(newTodoList);
  };
  return (
    <View style={styles.container} >
<KeyboardAvoidingView
  enabled
  behavior="padding"
  style={styles.keyboard}
>
  <ScrollView style={{ flex: 1 }}>
    <View style={styles.container}>
      {todoList.map((todo, idx) => {
        if(todo.status === 'Active'){
    return (
      <TodoItem
        idx={idx}
        todo={todo}
        key={todo.body}
        onDeleteTodo={onDeleteTodo}
        onToggleTodo={onToggleTodo}
      />    
    );}
  })}
  </View>
  </ScrollView>
</KeyboardAvoidingView>
</View>
  );
  }
  const ActiveStack = createStackNavigator();
 export default  function ActiveStackScreen() {
    return (
      <ActiveStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: 'dodgerblue',
        },
        headerTintColor: "#fff",
      }}>    
        <ActiveStack.Screen  name="Active" component={ActiveScreen} />
        <ActiveStack.Screen name="SingleTodo" component={SingleTodoScreen}/>
      </ActiveStack.Navigator>
    );
  }   
  const styles = StyleSheet.create({
      ActiveScr: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
      },
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgrey',
      },
      todoItem: {
        margin: 5,
        padding: 10,
        minHeight: 50,
        width: '95%',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
      },
      todoText: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
      },
      scrollView: {
        flex: 1,
      }
  })