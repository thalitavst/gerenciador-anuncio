"use strict";

function convertStringToDate(dateAsString) {
  const date = dateAsString.split("/");
  return new Date(date[2], date[1], date[0]);
}

class Cliente {
  constructor(
    nomeCliente,
    nomeAnuncio,
    dataInicio,
    dataTermino,
    investimentoPorDia
  ) {
    this.nomeCliente = nomeCliente;
    this.nomeAnuncio = nomeAnuncio;
    this.dataInicio = convertStringToDate(dataInicio);
    this.dataTermino = convertStringToDate(dataTermino);
    this.investimentoPorDia = investimentoPorDia;
  }
}

const clienteRepositorio = new (class {
  constructor() {
    this.clientes = [];
  }

  salvar(dadosCliente) {
    const cliente = new Cliente(
      dadosCliente.nomeCliente,
      dadosCliente.nomeAnuncio,
      dadosCliente.dataInicio,
      dadosCliente.dataTermino,
      dadosCliente.investimentoPorDia
    );
    this.clientes.push(cliente);
  }

  listar() {
    return this.clientes;
  }
})();

// Perguntas:
/* Principal
1) - Cadastrar Cliente
2) - Exibir Relatório

Opção 1) Cadastrar Cliente
* solicita os dados do cliente
Dados:
// nome do anúncio
// cliente (ou nome do cliente)
// data de início
// data de término
// investimento por dia
-terminou de solicitar retorna para Principal.

Opção 2) Exibir Relatório
Perguntas:
pergunta número 1: Informe o tempo do cliente em dias:
pergunta núemro 2: Informe o nome do cliente:

Opção 3) Terminar
*/

const inquirer = require("inquirer");

console.log("Olá, bem vindo ao gerenciado de anúncios!");

const questions = [
  {
    type: "list",
    name: "solicitacaoInicial",
    message: "O que você deseja fazer agora?",
    choices: ["Cadastrar Cliente", "Exibir Relatório", "Sair"],
  },
];

const questionsCadastrarCliente = [
  {
    type: "input",
    name: "nomeCliente",
    message: "Qual o nome do cliente?",
  },
  {
    type: "input",
    name: "nomeAnuncio",
    message: "Qual o nome do Anúncio?",
  },
  {
    type: "input",
    name: "dataInicio",
    message: "Qual a data de início do anúncio? (DD/MM/YYYY)",
  },
  {
    type: "input",
    name: "dataTermino",
    message: "Qual a data final do anúncio? (DD/MM/YYYY)",
  },
  {
    type: "input",
    name: "investimentoPorDia",
    message: "Qual o valor investido por dia?",
  },
];

const questionsExibirRelatorio = [
  {
    type: "input",
    name: "nomeCliente",
    message: "Qual o nome do cliente?",
  },
  {
    type: "input",
    name: "dataInicio",
    message: "Qual a data de início? (DD/MM/YYYY)",
  },
  {
    type: "input",
    name: "dataFinal",
    message: "Qual a data final? (DD/MM/YYYY)",
  },
];

function start() {
  inquirer.prompt(questions).then((answers) => {
    switch (answers.solicitacaoInicial) {
      case "Cadastrar Cliente":
        inquirer.prompt(questionsCadastrarCliente).then((dadosCliente) => {
          clienteRepositorio.salvar(dadosCliente);
          console.log("################################\n");
          console.log("#  Cliente Salvo com Sucesso!  #\n");
          console.log("################################\n");
          start();
        });
        break;
      case "Exibir Relatório":
        inquirer.prompt(questionsExibirRelatorio).then((dadosRelatorio) => {
          console.log("################################\n");
          console.log("#  Exibindo Clientes Salvos    #\n");
          console.log("################################\n");
          console.log(JSON.stringify(clienteRepositorio.listar()));

          // Os relatórios poderão ser filtrados por intervalo de tempo e cliente.
          const dataInicio = convertStringToDate(dadosRelatorio.dataInicio);
          const dataFinal = convertStringToDate(dadosRelatorio.dataFinal);

          // valor total investido
          // quantidade máxima de visualizações
          // quantidade máxima de cliques
          // quantidade máxima de compartilhamentos

          start();
        });
        break;
      case "Sair":
        break;
    }
  });
}

start();

// valor total investido
function valorTotalInvestido() {}

// quantidade máxima de visualizações
function qtdMaximaVisualizacoes() {}

// quantidade máxima de cliques
function qtdMaximaCliques() {}

// quantidade máxima de compartilhamentos
function qtdMaximaCompartilhamentos() {}
