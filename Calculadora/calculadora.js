// 30 pessoas visualizam o anúncio original (não compartilhado) a cada R$ 1,00 investido.
function obterNumeroTotalVisualizacaoPorValorInvestido(valorInvestido) {
  return valorInvestido * 30;
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
  console.log(`O número estimado são de ${resultado} visualizações`);
}

// o mesmo anúncio é compartilhado no máximo 4 vezes em sequência
function obterTotalPorCompartilhamento(totalAnuncio) {
  return totalAnuncio * 4;
}

module.exports = {
  obterNumeroTotalVisualizacaoPorValorInvestido,
  obterNumeroCliques,
  obterNumeroCompartilhamento,
  obterNumeroVisualizacoesPorCompartilhamento,
  obterTotalPorCompartilhamento,
  imprimirResultado,
};
