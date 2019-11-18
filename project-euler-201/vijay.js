/**


6 3
1 3 6 8 10 11

 */


function extractData(input) {
  const lines = input.trim().split('\n');
  //   console.info('lines', lines);
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
    n: parseInt(firstLine[0]),
    m: parseInt(firstLine[1]),
    data: secondLine.map((i) => parseInt(i)),
  };
}


function getUniqueSubSetSumTotal(data, subSetLength) {
  const uniqueSum = getUniqueSubSetSum(data, subSetLength);
  const uniqueSumTotal = uniqueSum.reduce((total, i) => total + i, 0);
  //   console.info('uniqueSumTotal', uniqueSumTotal);
  return uniqueSumTotal;
}


function getUniqueSubSetSum(data, subSetLength) {
  const sum = getSubSetsSum(data, subSetLength);
  const uniqueSum = [];
  sum.forEach((s) => {
    const occurence = uniqueSum.findIndex((i) => i === s);
    if (occurence !== -1) {
      uniqueSum.splice(occurence, 1);
    } else {
      uniqueSum.push(s);
    }
  });
  //   console.info('uniqueSum', uniqueSum.length);
  return uniqueSum;
}


function getSubSetsSum(data, subSetLength) {
  const subSets = getSubSets(data, subSetLength);
  const sum = subSets.map((i) => i.reduce((total, j) => total + j, 0));
  //   console.info('sum', sum.length);
  return sum;
}


function getSubSets(data, subSetLength) {
  const subSets = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      if (j === i) { continue; }
      for (let k = j + 1; k < data.length; k++) {
        if (k === j || k === i) { continue; }
        subSets.push([data[i], data[j], data[k]]);
      }
    }
  }
  //   console.info('subSets', subSets.length);
  return subSets;
}


function processData(input) {
  // Enter your code here
  const inputData = extractData(input);
  //   console.info('inputData', inputData);
  console.info(getUniqueSubSetSumTotal(inputData.data, inputData.m));
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


// const data = [1, 3, 6, 8, 10, 11];

// getUniqueSubSetSumTotal(data, 3);
