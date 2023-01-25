import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Produtos from "../telas/Produtos";
import ProdutosFavoritos from "../telas/ProdutosFavoritos";
import Login from "../telas/Login";
import Usuario from "./Usuario";


export default function MenuDrawer() {

    const Drawer = createDrawerNavigator();

    return <Drawer.Navigator
    screenOptions={{
      activeTintColor: '#e91e63',
      itemStyle: {marginVertical: 5},
    }}
    // Here we are setting our custom sidebar menu 
    drawerContent={props => <Usuario {...props} />}>
      <Drawer.Screen name="Lista de Produtos" component={Produtos}/>
      <Drawer.Screen name="Produtos Favoritos" component={ProdutosFavoritos}/>
      <Drawer.Screen name="Sair" component={Login} options={{headerShown: false }}/>
    </Drawer.Navigator>

}