import React, { useState } from "react";
import { Text, StatusBar, SafeAreaView, StyleSheet} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./src/telas/Login";
import Produtos from "./src/telas/Produtos";
import LoginContext from "./src/context/LoginContext";

const Stack = createNativeStackNavigator();


function Rotas() {
  return <Stack.Navigator>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Produtos" component={Produtos}/>
    </Stack.Navigator>
}

export default function App() {
  const [token, setToken] = useState({token: "TOKEN_ZERADO"});
  return <NavigationContainer>
              <SafeAreaView style={{ flex: 1 }}>
                <Text style={estilos.tituloApp}>FIAP APP</Text>
                <StatusBar />
                  <LoginContext.Provider value={[token, setToken]}>
                    <Rotas />
                  </LoginContext.Provider>
              </SafeAreaView>
      </NavigationContainer> 
}

const estilos = StyleSheet.create({
  tituloApp: {
    fontSize: 24,
    textAlign: "center",
    padding: 5,
    fontWeight: "bold",
    color: "rgb(237, 20, 91);"
  }
});