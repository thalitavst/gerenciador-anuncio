"use strict";

const calculadora = require("../Calculadora/calculadora");
const inquirer = require("inquirer");

function convertStringToDate(dateAsString) {
  const date = dateAsString.split("/");
  return new Date(date[2], date[1], date[0]);
}

function getNumberOfDaysBetweenTwoDates(dataInicial, dataFinal) {
  const differenceInTime = dataFinal.getTime() - dataInicial.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return differenceInDays;
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
          console.log("##############################################\n");
          console.log(
            "  Exibindo Relatório para o cliente: " +
              dadosRelatorio.nomeCliente +
              "\n"
          );
          console.log("##############################################\n");

          // Os relatórios poderão ser filtrados por intervalo de tempo e cliente.
          const dataInicio = convertStringToDate(dadosRelatorio.dataInicio);
          const dataFinal = convertStringToDate(dadosRelatorio.dataFinal);
          const numeroEmDias = getNumberOfDaysBetweenTwoDates(
            dataInicio,
            dataFinal
          );
          const clienteSelecionado = clienteRepositorio
            .listar()
            .filter(
              (cliente) =>
                cliente.nomeCliente.toLowerCase() ===
                dadosRelatorio.nomeCliente.toLowerCase()
            )[0];

          console.log(`cliente selecionado: ${clienteSelecionado.nomeCliente}`);

          const investimentoPorDia = parseFloat(
            clienteSelecionado.investimentoPorDia
          );

          // valor total investido
          const valorTotalInvestido =
            investimentoPorDia * parseInt(numeroEmDias);

          const numeroTotalVisualizacaoPorValorInvestido =
            calculadora.obterNumeroTotalVisualizacaoPorValorInvestido(
              valorTotalInvestido
            );
          console.log(
            `Valor total investido: ${Math.round(valorTotalInvestido)}`
          );

          // quantidade máxima de cliques
          const numeroClique = Math.round(
            calculadora.obterNumeroCliques(
              numeroTotalVisualizacaoPorValorInvestido
            )
          );
          console.log(
            `Quantidade máxima de cliques: ${Math.round(numeroClique)}`
          );

          // quantidade máxima de compartilhamentos
          const numeroCompartilhamento =
            calculadora.obterNumeroCompartilhamento(numeroClique);
          console.log(
            `Quantidade máxima de compartilhamentos: ${Math.round(
              numeroCompartilhamento
            )}`
          );

          // quantidade máxima de visualizações
          const quantidadeMaximaVisualizacoes =
            calculadora.obterNumeroVisualizacoesPorCompartilhamento(
              numeroCompartilhamento
            );
          console.log(
            `Quantidade máxima de visualizações: ${Math.round(
              quantidadeMaximaVisualizacoes
            )}`
          );

          start();
        });
        break;
      case "Sair":
        break;
    }
  });
}

start();
