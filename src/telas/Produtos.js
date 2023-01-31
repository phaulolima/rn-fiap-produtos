import React, { useEffect, useContext, useState } from "react";
import { Text, FlatList, View, StyleSheet, ActivityIndicator } from "react-native";
import produtoService from "../servicos/ProdutoService";
import LoginContext from "../context/LoginContext";
import ItemLista from "../componentes/ItemLista";
import Styles from "../MainStyle";
import Topo from "./Topo";



export default function Produtos({navigation}){

    const [token, setToken] = useContext(LoginContext);
    const [listaProdutos, setlistaProdutos] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [maisPaginas, setMaisPaginas] = useState(true);
    const [load, setLoad] = useState(true);

    async function listarProdutos() {
        if (!maisPaginas) return;
        const resultListar =  await produtoService.listarProdutos(token, pagina);
            if (resultListar.status === 200) {
                const listaAtual = resultListar.data.products;
                setlistaProdutos(prev => [...prev, ...listaAtual]);
                if (resultListar.data.totalItems > listaProdutos.length) {
                    setPagina(prev => prev + 1);
                } else {
                    setMaisPaginas(false);
                }
            } 
    }
 

    useEffect(() => {
        listarProdutos();
        navigation.addListener('focus', ()=>setLoad(!load));
    }, [load, navigation]);


    const TopoLista = () => {
        return <>
            <Text style={Styles.tituloSecundario}>Escolha um produto!</Text>
        </>
    }

    return <>
        <Topo exibeVoltar={false}/>
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
  

