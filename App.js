import { View, Text, TouchableOpacity } from "react-native"
import { Home, Splash, Signin, Signup } from "./screens"
import React from "react"
import { Provider } from "react-redux"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Store from "./context/store"

const Stack = createNativeStackNavigator()

const App = () => {
  return <NavigationContainer>
    <Provider store={Store}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </Provider>
  </NavigationContainer>
};

export default App;
