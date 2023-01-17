import axios from "axios"
import Config from "../Config"

class ProdutoService {
    

    async listarProdutos(token, numeroPagina){
        return axios({
            url: Config.API_URL + `storeProducts/?page=${numeroPagina}&perPage=5&orderDirection=asc`,
            method: "GET",
            timeout: Config.TIMEOUT_REQUEST,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            console.log("-------- Passou no sucesso do listar!");
            console.log(response.data.totalItems);
            return Promise.resolve(response)
        }).catch((error) => {
            console.log('--------- Erro ao listar produtos! : ', error);
            return Promise.reject(error)
        })
    }
 
}

const produtoService = new ProdutoService()
export default produtoService

