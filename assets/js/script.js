// criando class Despesa
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }
    // validando dados
    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == "" || this[i] == null) {
                return false;
            }
        }
        return true;
    };
}
// estabelecendo ligação com localStorage
class Bd {
    constructor() {

        // criando id inicial
        let id = localStorage.getItem('id');
        if (id === null) {
            localStorage.setItem('id', 0);
        };
    }

    // criando id dinãmico
    getProximoId() {
        let proximoId = localStorage.getItem('id');
        return  Number(proximoId) + 1;
    };

    // amrmazenando despesas
    armazenarDespesa(despesa) {
        let id = this.getProximoId();
        localStorage.setItem('id', id);
        localStorage.setItem(id, JSON.stringify(despesa));
    };

    // exibindo despesas
    recuperarDespesas() {

        // arraay despesas
        let despesas = [];

        //recuperando despesas
        let quantidadeItem = localStorage.getItem('id');
        for (let c = 1; c <= quantidadeItem; c++) {
            let despesa = JSON.parse(localStorage.getItem(`${c}`));

            // checando se o obejto/despesa é null/ foi removido
            if (despesa === null) {
                continue;
            };
            despesas.push(despesa);
        };
        
        return despesas;
    };
}

let bd = new Bd();

// Cadastrando despesas
function cadastrarDespesa() {

    // Recuperando valores de entrada
    let ano = document.querySelector('#ano');
    let mes = document.querySelector('#mes');
    let dia = document.querySelector('#dia');
    let tipo = document.querySelector('#tipo');
    let descricao = document.querySelector('#descricao');
    let valor = document.querySelector('#valor');
    
    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    );

    //retornando resposta da tentativa de cadastro
    if (despesa.validarDados()) {
        //true
        bd.armazenarDespesa(despesa);
        alert('Despesa cadastrada com sucesso.');
    } else {
        //false
        alert('Existem campos obrigatórios que não foram preenchidos!');
    };
};

// chamando função exibirDespesas
function exibirDespesas() {

    let despesas = bd.recuperarDespesas();

    // selecionando tabela
    let listaDespesas = document.querySelector("#listaDespesas");

    // exibindo despesas na tabela
    let quantDespesas = despesas.length;
    for (let c = 0; c < quantDespesas; c++) {
        
        // criando linhas
        function criarTabela() {

            let linha = document.createElement('tr');
            listaDespesas.appendChild(linha);

            let arrayValoresList = [];

            for (let i = 0; i < Object.keys(despesas[c]).length; i++) {
            
                let arrayValores = Object.values(despesas[c]);
                let arrayChaves = Object.keys(despesas[c])[i];

                                                    
                // juntos valores de datas para criar o pradrão de data br dd/mm/aa
                switch(arrayChaves) {
                    case 'ano':
                        arrayValoresList[0] = `${arrayValores[i]}`;
                        break;
                    case 'mes':
                        arrayValoresList[0] = `0${arrayValores[i]} / ${arrayValoresList[0]}`;
                        break;
                    case 'dia':
                        arrayValoresList[0] = `${arrayValores[i]} / ${arrayValoresList[0]}`;
                        break;
                    case 'tipo':

                        // convertendo valores de tipos de despesas
                        switch(arrayValores[i]) {
                            case '1':
                                arrayValoresList[1] = 'Alimentação';
                                break;
                            case '2':
                                arrayValoresList[1] = 'Educação';
                                break;
                            case '3':
                                arrayValoresList[1] = 'Lazer';
                                break;
                            case '4':
                                arrayValoresList[1] = 'Saúde';
                                break;
                            case '5':
                                arrayValoresList[1] = 'Transporte';
                                break;
                            };
                        break;
                        // fim da conversão dos tipos de despesas
                    case 'descricao':
                        arrayValoresList[2] = `${arrayValores[i]}`;
                        break;
                    case 'valor':
                        arrayValoresList[3] = `${arrayValores[i]}`;                       
                    break;
                };
            };

            // criando colunas e inserindo valores nas colunas
            for (let q = 0; q < 4; q++) {
                let column = document.createElement('td');
                linha.appendChild(column);
                column.innerHTML = `${arrayValoresList[q]}`; 
            };
        };

        criarTabela();
    };
};