import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Produtos from "../telas/Produtos";
import ProdutosFavoritos from "../telas/ProdutosFavoritos";
import Login from "../telas/Login";


export default function MenuDrawer() {

    const Drawer = createDrawerNavigator();

    return <Drawer.Navigator>
      <Drawer.Screen name="Lista de Produtos" component={Produtos}/>
      <Drawer.Screen name="Produtos Favoritos" component={ProdutosFavoritos}/>
      <Drawer.Screen name="Sair" component={Login}/>
    </Drawer.Navigator>

}