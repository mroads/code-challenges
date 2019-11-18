function extractData(input) {
  const lines = input.trim().split('\n');
  console.info('lines', lines);
  if (lines.length !== 2) {
    return {
      n: 0,
      m: 0,
      data: [],
    };
  }

  const firstLine = lines[0].split(' ');
  const secondLine = lines[1].split(' ');
  return {
    n: firstLine[0],
    m: firstLine[0],
    data: secondLine,
  };
}


function getSubSets(data, subSetLength) {
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      for (let k = j + 1; k < data.length; j++) {

      }
    }
  }
}


function processData(input) {
  // Enter your code here
  const inputData = extractData(input);
  console.info('inputData', inputData);
}


process.stdin.resume();
process.stdin.setEncoding('ascii');
_input = '';
process.stdin.on('data', (input) => {
  _input += input;
});

process.stdin.on('end', () => {
  processData(_input);
});
