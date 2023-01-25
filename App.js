import React, { useState } from "react";
import { Text, StatusBar, SafeAreaView, StyleSheet} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./src/telas/Login";
import Produtos from "./src/telas/Produtos";
import LoginContext from "./src/context/LoginContext";
import UsuarioContext from "./src/context/UsuarioContext";
import CadastroUsuario from "./src/telas/CadastroUsuario";
import DetalhesProduto from "./src/telas/DetalhesProduto";
import MenuDrawer from "./src/rotas/MenuDrawer";
import Topo from "./src/telas/Topo";

const Stack = createNativeStackNavigator();


function Rotas() {
  return <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Produtos" component={MenuDrawer}/>
      <Stack.Screen name="Cadastro" component={CadastroUsuario}/>
      <Stack.Screen name="Detalhes" component={DetalhesProduto}/>
    </Stack.Navigator>
}

export default function App() {
  const [token, setToken] = useState({token: "TOKEN_ZERADO"});
  const [usuario, setUsuario] = useState({token: "CONVIDADO"});

  return <NavigationContainer>
              <SafeAreaView style={{ flex: 1 }}>
                <StatusBar />
                  <LoginContext.Provider value={[token, setToken]}>
                    <UsuarioContext.Provider value={[usuario, setUsuario]}>
                      <Rotas />
                    </UsuarioContext.Provider>
                  </LoginContext.Provider>
              </SafeAreaView>
        </NavigationContainer> 
}

