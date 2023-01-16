import React, { useEffect, useContext } from "react";
import { Text } from "react-native"
import produtoService from "../servicos/ProdutoService";
import LoginContext from "../context/LoginContext";

export default function Produtos(){

    const [token, setToken] = useContext(LoginContext);

    function listarProdutos() {
        console.log("Token recebido: ", token);
        produtoService.listarProdutos(token);
    }


    useEffect(() => {
        console.log(" -- Inicio do LISTAR PRODUTOS! -- ")
        listarProdutos();
    }, []);

    return <Text>Você está na tela de listar os Produtos!</Text>


}

