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

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == "" || this[i] == null) {
                return false;
            }
        }
        return true;
    };
}

class Bd {
    constructor() {

        let id = localStorage.getItem('id');
        if (id === null) {
            localStorage.setItem('id', 0);
        };
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id');
        return  Number(proximoId) + 1;
    };

    armazenarDespesa(despesa) {
        let id = this.getProximoId();
        localStorage.setItem('id', id);
        localStorage.setItem(id, JSON.stringify(despesa));
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

    if (despesa.validarDados()) {
        //true
        bd.armazenarDespesa(despesa);
        alert('Despesa cadastrada com sucesso.');
    } else {
        //false
        alert('Existem campos obrigatórios que não foram preenchidos!');
    };
};