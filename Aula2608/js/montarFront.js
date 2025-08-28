import { produtos } from "./objetos.js";

// Confirmando que o HTML foi carregado
document.addEventListener('DOMContentLoaded', () => {

    // Recuperando elementos do HTML - Para o JS
    const elMain = document.querySelector('#gridProdutos')
    const elSelectFiltro = document.querySelector('#filtroCategoria')
    const elBtnBuscar = document.querySelector('#btnBuscar')
    const elTxtBuscar = document.querySelector('#txtBuscar')

    // função para exibir o grid de produtos 

    function exibirProdutos(listaProdutos) {
        // limpando o elemento antes de fazer uma nova busca para não acumular resultados
        elMain.innerHTML = ''

        // se nada for encontrado retornar tudo
        if(listaProdutos.length === 0 ) {
            elMain.innerHTML = `
            <div class="col-12 text-center my-5">
                <div class="alert alert-danger">
                    <h3>Desculpe, não encontramos esse produto :( </h3>
                </div>
            </div>
            `
        }

        else { 
        listaProdutos.forEach(produto => {
            elMain.innerHTML +=
                `
             <div class="col-md-6 my-3">
                <div class="card mb-3 p-3">
                    <div class="row d-flex align-items-center">
                        <div class="col-md-4 text-center">
                            <img src="${produto.imagem}" class=" w-70 rounded-start" alt=" foto do ${produto.nome}">
                        </div>
                        <div class="col-md-8 text-center text-md-start">
                            <h6>${produto.nome}</h6>
                            <h6>R$${produto.preco.toFixed(2)}</h6>
                            <p>${produto.categoria}</p>
                            <a href="" class="btn btn-success">Comprar agora</a>
                        </div>
                    </div>
                </div>
             </div> 
             `
        })};
    }

    // função para preencher o filtro de categoria

    function preencherCategorias() {
        // tirando as categorias repetidas
        const categorias = [...new Set(produtos.map(produto => produto.categoria))]
        // colocando o array em ordem alfabetica
        categorias.sort()
        // preenchendo as categorias no select
        categorias.forEach(categoria => {
            elSelectFiltro.innerHTML += `<option value=${categoria}>${categoria}</option>`
        })
    }

    // função para busca digitada
    function buscarProduto() {
        const valorBusca = elTxtBuscar.value.toLowerCase().trim()
        
        // Se estiver vazio - exibe todos os produtos
        if (valorBusca === "") {
            alert('Preencha o campo. Exibindo todos os produtos')
            exibirProdutos(produtos)
        }
        
        // caso tenhha algo preenchido iremos fazer a busca
        else {
            const encontrados = produtos.filter(produto => produto.nome.toLowerCase().includes(valorBusca))
            exibirProdutos(encontrados)
        }
    }
    

    // Eventos

    // Fazer a busca qd clicar

    elBtnBuscar.addEventListener('click', buscarProduto)
    elTxtBuscar.addEventListener('keypress', function(event){
        if (event.key === 'Enter'){
            buscarProduto()
        }
    })


        // Chamando as funções
        exibirProdutos(produtos)
        preencherCategorias()
    })
