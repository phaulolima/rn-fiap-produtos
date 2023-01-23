import React, { useEffect, useContext, useState } from "react";
import { Text, FlatList, View, StyleSheet, ActivityIndicator } from "react-native";
import produtoService from "../servicos/ProdutoService";
import LoginContext from "../context/LoginContext";
import ItemLista from "../componentes/ItemLista";
import Styles from "../MainStyle";
import Topo from "./Topo";


export default function ProdutosFavoritos({navigation}) {

    const [token, setToken] = useContext(LoginContext);
    const [listaProdutos, setlistaProdutos] = useState([]);
    const [isLoading, setLoading] = useState(false);
  
    async function listarProdutosFavoritos() {
        setLoading(true)
        const resultListar =  await produtoService.listarProdutosFavoritos(token);
            if (resultListar.status === 200) {
                setLoading(false);
                const listaAtual = resultListar.data.products;
                setlistaProdutos(listaAtual);
            } else {
                setLoading(false);
            }
    }

    useEffect(() => {
        listarProdutosFavoritos();
    }, []);


    const TopoLista = () => {
        return <>
            <Text style={Styles.tituloSecundario}>Escolha um produto!</Text>
        </>
    }

    return <>
        <Topo exibeVoltar={true}/>   
        { isLoading &&
          <ActivityIndicator style={estilos.activityIndicator}/>
        }
        { !isLoading    
              
            && <FlatList
                data={listaProdutos}
                ListHeaderComponent={TopoLista}
                renderItem={
                    ({ item }) => <ItemLista 
                        {...item}
                        aoPressionar={() => {
                            navigation.navigate('Detalhes', item);
                    }} />
                }
            />
        }
    </>
}

const estilos =  StyleSheet.create({
    item: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ECECEC",
        paddingVertical: 16,
        marginHorizontal: 16,
        alignItems: "center",
    },

   
  });