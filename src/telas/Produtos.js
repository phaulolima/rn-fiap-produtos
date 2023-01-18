import React, { useEffect, useContext, useState } from "react";
import { Text, FlatList, View, StyleSheet, ActivityIndicator } from "react-native";
import produtoService from "../servicos/ProdutoService";
import LoginContext from "../context/LoginContext";
import ItemLista from "../componentes/ItemLista";
import Styles from "../MainStyle";



export default function Produtos({navigation}){

    const [token, setToken] = useContext(LoginContext);
    const [listaProdutos, setlistaProdutos] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [maisPaginas, setMaisPaginas] = useState(true);

    async function listarProdutos() {
        if (!maisPaginas) return;
        const resultListar =  await produtoService.listarProdutos(token, pagina);
            if (resultListar.status === 200) {
                const listaAtual = resultListar.data.products;
                setlistaProdutos(prev => [...prev, ...listaAtual]);
                console.log("length: ", listaProdutos.length);
                if (resultListar.data.totalItems > listaProdutos.length) {
                    setPagina(prev => prev + 1);
                } else {
                    setMaisPaginas(false);
                }

                console.log("Pagina: ", pagina);
            } 
    }
 

    useEffect(() => {
        listarProdutos();
    }, []);


    const TopoLista = () => {
        return <>
            <Text style={Styles.tituloSecundario}>Os melhores produtos...</Text>
        </>
    }

    return <>
        <FlatList
            data={listaProdutos}
            ListHeaderComponent={TopoLista}
            renderItem={
                ({ item }) => <ItemLista 
                    {...item}
                    aoPressionar={() => {
                        navigation.navigate('Detalhes', item);
                }} />
            }
            ListFooterComponent={Loading(maisPaginas)}
            onEndReached={listarProdutos}
            onEndReachedThreshold={0.1}
        />
    </>
}

function Loading(carregando) {
    if (carregando) {
        return <ActivityIndicator size={'large'}/>;
    }

    return null;
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
  

