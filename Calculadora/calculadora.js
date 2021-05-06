const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Qual o valor investido ? ", function (valor) {
  console.log(`${valor}`);
  rl.close();
});

rl.on("close", function () {
  console.log("\nBYE BYE !!!");
  process.exit(0);
});
