import * as React from 'react';
import {useState} from 'react';
import { Text, View,Alert, StyleSheet, TouchableOpacity, TextInput,ScrollView, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TODOS } from 'C:/Users/Admin/week4_assignment/utils/data';
const TodoItem = props => {
  const statusStyle = {
    backgroundColor: props.todo.status === 'Done' ? 'ghostwhite' : 'fba788'
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
    >
      <Text style={styles.todoText}>
        {props.idx + 1}: {props.todo.body}
      </Text>
    </TouchableOpacity>
  );
};
 function CompleteScreen({ navigation }) {
  const [todoList, setTodoList] = useState(TODOS);
  const [todoBody, setTodoBody] = useState('');
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
        if(todo.status === 'Done'){
    return (
      <TodoItem
        idx={idx}
        todo={todo}
        key={todo.body}
        onDeleteTodo={onDeleteTodo}
      />    
    );}
  })}
  </View>
  </ScrollView>
</KeyboardAvoidingView>
</View>
  );
  }
  const CompleteStack = createStackNavigator();
 export default  function CompleteStackScreen() {
    return (
      <CompleteStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: 'dodgerblue',
        },
        headerTintColor: '#fff',
      }}>
        <CompleteStack.Screen  name="Complete" component={CompleteScreen} />
      </CompleteStack.Navigator>
    );
  }   
  const styles = StyleSheet.create({
      CompleteScr: {
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