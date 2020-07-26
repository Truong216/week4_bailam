import React from 'react';
import {useState} from 'react';
import { Text, View,Alert, StyleSheet, TouchableOpacity, TextInput,ScrollView, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SingleTodoScreen from './SingleTodoScreen';
import { TODOS } from 'C:/Users/Admin/week4_assignment/utils/data';
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
  function AllScreen(props ) {
    const [todoList, setTodoList] = useState(TODOS);
    const [todoBody, setTodoBody] = useState('');
    const onSubmitTodo = () => {
      if(todoBody !== ''){
      const newTodo = {
        body: todoBody,
        status: 'Active',
        id: todoList.length + 1
      };
      const newTodoList = [...todoList, newTodo];
      setTodoList(newTodoList);
      setTodoBody('');
    }};
    const onToggleTodo = id => {
      const todo = todoList.find(todo => todo.id === id);
      todo.status = todo.status === 'Done' ? 'Active' : 'Done';
      const foundIndex = todoList.findIndex(todo => todo.id === id);
      todoList[foundIndex] = todo;
      const newTodoList = [...todoList];
      setTodoList(newTodoList);
      setTimeout(() => {
        props.navigation.navigate('SingleTodo', {
        id: foundIndex + 1,
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
      <View style={{ marginTop: "120%" }}></View>
      <View style={styles.container}>
      {todoList.map((todo, idx) => {
        return (
          <TodoItem
            idx={idx}
            todo={todo}
            key={todo.body}
            onDeleteTodo={onDeleteTodo}
            onToggleTodo={onToggleTodo}
          />    
        );
        })}
        <View style={styles.inputContainer}>
          <TextInput
            value={todoBody}
            style={styles.todoInput}
            onChangeText={text => setTodoBody(text)}
          />
          <TouchableOpacity style={styles.button} onPress={onSubmitTodo}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
    </View>
    );
  }
  const AllStack = createStackNavigator();
  export default function AllStackScreen() {
 return (
   <AllStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: 'dodgerblue',
    },
    headerTintColor: "#fff",
  }}>
    <AllStack.Screen name="All" component={AllScreen}/>
    <AllStack.Screen name="SingleTodo" component={SingleTodoScreen}/> 
   </AllStack.Navigator>
  );
}
const styles = StyleSheet.create({
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
    borderRadius: 5,
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
  todoInput: {
    width: '95%',
    minHeight: 30,
    color: 'black',
    borderWidth: 1,
    marginTop: '20%',
    marginBottom: '5%',
    borderColor: 'black',
    fontWeight: 'bold'
  },
  inputContainer: {
    flex: 1,
    width: '90%',
    marginBottom: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100
  },
  button: {
    height: 50,
    width: '50%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'blue',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  scrollView: {
    flex: 1,
  }
});