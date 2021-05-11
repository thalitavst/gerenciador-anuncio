const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 30 pessoas visualizam o anúncio original (não compartilhado) a cada R$ 1,00 investido.
function obterNumeroTotalVisualizacaoPorValorInvestido(valorInvestido) {
  return (numeroTotalVisualizacaoPorValorInvestido = valorInvestido * 30);
}

// a cada 100 pessoas que visualizam o anúncio 12 clicam nele.
function obterNumeroCliques(total) {
  return (12 / 100) * total;
}

// a cada 20 pessoas que clicam no anúncio 3 compartilham nas redes sociais.
function obterNumeroCompartilhamento(total) {
  return (3 / 20) * total;
}

// cada compartilhamento nas redes sociais gera 40 novas visualizações.
function obterNumeroVisualizacoesPorCompartilhamento(total) {
  return total * 40;
}

// Imprime o resultado no console
function imprimirResultado(resultado) {
  console.log(`O número estimado é de ${resultado} visualizações`);
}

// o mesmo anúncio é compartilhado no máximo 4 vezes em sequência
function obterTotalPorCompartilhamento(totalAnuncio) {
  return totalAnuncio * 4;
}

function start() {
  rl.question("Qual o valor investido ? ", function (valor) {
    if (valor < 1) {
      console.log(`${valor} abaixo do permitido.`);
      rl.close();
    }
    let numeroTotalVisualizacaoPorValorInvestido = obterNumeroTotalVisualizacaoPorValorInvestido(
      valor
    );
    let numeroClique = obterNumeroCliques(
      numeroTotalVisualizacaoPorValorInvestido
    );
    let numeroCompartilhamento = obterNumeroCompartilhamento(numeroClique);
    let numeroVisualizacaoPorCompartilhamento = obterNumeroVisualizacoesPorCompartilhamento(
      numeroCompartilhamento
    );

    imprimirResultado(Math.round(numeroVisualizacaoPorCompartilhamento));

    rl.close();
  });
}

rl.on("close", function () {
  console.log("\nBYE BYE !!!");
  process.exit(0);
});

start();
