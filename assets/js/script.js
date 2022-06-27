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

    pesquisar(despesa) {
        // chamando método recupearDespesas
        let despesasF = this.recuperarDespesas();

        // filtrando ano
        if (despesa.ano != '') {
            despesasF = despesasF.filter(valor => valor.ano == despesa.ano);
        };

        // filtrando mês
        if (despesa.mes != '') {
            despesasF = despesasF.filter(valor => valor.mes == despesa.mes);
        };

        // filtrando dia
        if (despesa.dia != '') {
            despesasF = despesasF.filter(valor => valor.dia == despesa.dia);
        };

        // filtrando tipo
        if (despesa.tipo != '') {
            despesasF = despesasF.filter(valor => valor.tipo == despesa.tipo);
        };

        // filtrando descrição
        if (despesa.descricao != '') {
            despesasF = despesasF.filter(valor => valor.descricao == despesa.descricao);
        };

        // filtrando valor
        if (despesa.valor != '') {
            despesasF = despesasF.filter(valor => valor.valor == despesa.valor);
        };

        console.log(despesasF);
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
        ano.value = '';
        mes.value = '';
        dia.value = '';
        tipo.value = '';
        descricao.value = '';
        valor.value = '';
    } else {
        //false
        alert('Existem campos obrigatórios que não foram preenchidos!');
    };
};

// chamando função exibirDespesas
function exibirDespesas() {

    let despesas = bd.recuperarDespesas();
    // invertendo array para exibir as novas despesas no início
    despesas.reverse();

    // selecionando tabela
    let listaDespesas = document.querySelector("#listaDespesas");

    // exibindo despesas na tabela
    for (let c = 0; c < despesas.length; c++) {
        
        // criando linhas da tabela
        let linha = document.createElement('tr');
            listaDespesas.appendChild(linha);
        
        // função que cria a tabela ao fazer reload na página de consulta
        function criarTabela() {

            let arrayDespesa = despesas[c];

            //c criando array para armezenar os valores formados que serão exibidos na tabela
            let arrayValoresList = [];

            //atribuindo valores ao arrayValoresList
            // formatando o mes para dois algarismos
            let mesFormatado;
            if (arrayDespesa['mes'].length == 1) {
                mesFormatado = `0${arrayDespesa['mes']}`;
            } else {
                mesFormatado = arrayDespesa['mes'];
            };
            arrayValoresList[0] = `${arrayDespesa['dia']} / ${mesFormatado} / ${arrayDespesa['ano']}`;
            // formatando o tipo de despesa
            switch (arrayDespesa['tipo']) {
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
            arrayValoresList[2] = `${arrayDespesa['descricao']}`;
            arrayValoresList[3] = `${arrayDespesa['valor']}`;

            // criando colunas e inserindo valores nestas
            for (let q = 0; q < 4; q++) {
                let coluna = document.createElement('td');
                linha.appendChild(coluna);
                coluna.innerHTML = arrayValoresList[q];
            };
        };
        // chamando função criarTabela
        criarTabela();
    };
};

function pesquisarDespesa() {
    
    // Recuperando valores de entrada
    let ano = document.querySelector('#ano').value;
    let mes = document.querySelector('#mes').value;
    let dia = document.querySelector('#dia').value;
    let tipo = document.querySelector('#tipo').value;
    let descricao = document.querySelector('#descricao').value;
    let valor = document.querySelector('#valor').value;

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);

    bd.pesquisar(despesa);
};