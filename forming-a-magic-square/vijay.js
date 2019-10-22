
const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', (inputStdin) => {
  inputString += inputStdin;
});

process.stdin.on('end', () => {
  inputString = inputString.replace(/\s*$/, '')
    .split('\n')
    .map((str) => str.replace(/\s*$/, ''));

  main();
});

function readLine() {
  return inputString[currentLine++];
}

// Complete the formingMagicSquare function below.
function formingMagicSquare(s) {


}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const s = Array(3);

  for (let i = 0; i < 3; i++) {
    s[i] = readLine().split(' ').map((sTemp) => parseInt(sTemp, 10));
  }

  const result = formingMagicSquare(s);

  ws.write(`${result}\n`);

  ws.end();
}
