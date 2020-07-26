import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';
import CompleteStackScreen from './screens/CompleteScreen';
import ActiveStackScreen from './screens/ActiveScreen';
import AllStackScreen from './screens/AllScreen';
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Complete'){
              return <MaterialCommunityIcons name="check-all" size={24} color={color}  />;
            }
            else if (route.name === 'All'){
              return <AntDesign name="pluscircleo" size={24} color={color} />
            }
            else if(route.name ==='Active'){
              return <Entypo name="list" size={24} color={color} />
            } 
          },
        })}
        tabBarOptions={{
          activeTintColor: 'royalblue',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Complete" component={CompleteStackScreen} />
        <Tab.Screen name="All" component={AllStackScreen} />
        <Tab.Screen name="Active" component={ActiveStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


