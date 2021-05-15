const calculadora = require("./calculadora");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function startCalculadora() {
  rl.question("Qual o valor investido ? ", function (valor) {
    if (valor < 1) {
      console.log(`${valor} abaixo do permitido.`);
      rl.close();
    }
    const numeroTotalVisualizacaoPorValorInvestido =
      calculadora.obterNumeroTotalVisualizacaoPorValorInvestido(valor);
    const numeroClique = calculadora.obterNumeroCliques(
      numeroTotalVisualizacaoPorValorInvestido
    );
    const numeroCompartilhamento =
      calculadora.obterNumeroCompartilhamento(numeroClique);
    const numeroVisualizacaoPorCompartilhamento =
      calculadora.obterNumeroVisualizacoesPorCompartilhamento(
        numeroCompartilhamento
      );

    calculadora.imprimirResultado(
      Math.round(numeroVisualizacaoPorCompartilhamento)
    );

    rl.close();
  });
}

rl.on("close", function () {
  console.log("\nBYE BYE !!!");
  process.exit(0);
});

startCalculadora();
