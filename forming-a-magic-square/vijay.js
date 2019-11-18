
const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;


const magicSquares = getAllMagicSquares();

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


function isDistinct(s) {
  let occurence = new Array(s.length * s.length).fill(0).map((_, index) => index + 1);
  s.forEach((row) => {
    row.forEach((cell) => {
      occurence = occurence.filter((value) => value !== cell);
    });
  });
  return occurence.length === 0;
}


function isMagicSquare(s) {
  if (!isDistinct(s)) {
    console.info('is not distict');
    return false;
  }
  const flatS = s.reduce((total, val) => total.concat(val), []);
  /**
     * index 0 = row 0 [0,1,2] sum
     * index 1 = row 1 [3,4,5] sum
     * index 2 = row 2 [6,7,8] sum
     * index 3 = col 0 [0,3,6] sum
     * index 4 = col 1 [1,4,7] sum
     * index 5 = col 2 [2,5,8] sum
     * index 6 = diag 1 [0,4,8] sum
     * index 7 = diag 2 [2,4,6] sum
     */
  const magicValues = new Array(8).fill(0).map((val, index) => {
    if (index < 3) {
      const currentIndex = index * 3;
      return flatS[currentIndex] + flatS[currentIndex + 1] + flatS[currentIndex + 2];
    }
    if (index < 6) {
      const currentIndex = index - 3;
      return flatS[currentIndex] + flatS[currentIndex + 3] + flatS[currentIndex + 6];
    }
    {
      const currentIndex = (index - 6) * 2;
      // console.info('currentIndex', currentIndex);
      return flatS[currentIndex] + flatS[4] + flatS[8 - currentIndex];
    }
  });

  // console.info('magicValues', magicValues);
  return magicValues.every((item) => item === magicValues[0]);
}


function getDisitinctPossiblities(s) {
  let inputValues = new Array(9).fill(0).map((_, index) => index + 1);
  let repeatedPositions = [];
  s.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      inputValues = inputValues.filter((val) => val !== cell);
      const occurenceIndex = repeatedPositions.findIndex((val) => val.cell === cell);
      if (occurenceIndex !== -1) {
        const occurence = repeatedPositions[occurenceIndex];
        occurence.count += 1;
        occurence.indices.push({ row: rowIndex, col: colIndex });
      } else {
        repeatedPositions.push({ cell, count: 1, indices: [{ row: rowIndex, col: colIndex }] });
      }
    });
  });
  repeatedPositions = repeatedPositions.filter((item) => item.count > 1);
  // console.info('missingValues', inputValues, JSON.stringify(repeatedPositions));
  const positions = repeatedPositions.reduce((total, position) => total.concat(position.indices), []);
  const combinations = getCombinations([...inputValues, ...repeatedPositions.map((position) => position.cell)]);
  // console.info('combinations', combinations);
  return combinations.map((combination) => {
    const tempMatrix = JSON.parse(JSON.stringify(s));
    combination.forEach((value, index) => {
      const { row, col } = positions[index % positions.length];
      tempMatrix[row][col] = value;
    });
    return tempMatrix;
  });
}

function getCost(s) {
  let sum = 0;
  if (s[1][1] !== 5) {
    sum += Math.abs(s[1][1] - 5);
    s[1][1] = 5;
  }
  const result = rotateToMatchSquare(s);
  // console.info('result', s);
  result.unmatchedIndices.forEach(({ expected, current }) => {
    sum += Math.abs(current - expected);
  });
  return sum;
}

// Complete the formingMagicSquare function below.
function formingMagicSquare(s) {
  // [ [ 8, 3, 4 ], [ 1, 5, 9 ], [ 6, 7, 2 ] ]
  let sum = 9999999999;
  // if (isDistinct(s)) {
  sum = getCost(s);
  // } else {
  //   sum = getCost(s);
  //   const possibilities = getDisitinctPossiblities(s);
  //   // console.info('possibilities', possibilities);
  //   possibilities.forEach((matrix) => {
  //     const result = getMatchRate(s, matrix);
  //     let iterationSum = 0;
  //     // console.info('result', result);
  //     result.unmatchedIndices.forEach(({ expected, current }) => {
  //       iterationSum += Math.abs(current - expected);
  //     });
  //     // console.info('matrixCost', iterationSum);
  //     iterationSum += getCost(matrix);
  //     // console.info('matrixCost', iterationSum);
  //     if (iterationSum < sum) {
  //       sum = iterationSum;
  //     }
  //   });
  // }
  return sum;
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


function getMatchRate(current, expected) {
  let rate = 0;
  const unmatchedIndices = [];
  // console.info('comparing matrices', current, expected);
  current.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === expected[rowIndex][colIndex]) {
        rate++;
      } else {
        unmatchedIndices.push({
          rowIndex, colIndex, expected: expected[rowIndex][colIndex], current: cell,
        });
      }
    });
  });
  return { rate, unmatchedIndices };
}


function rotateToMatchSquare(s) {
  // const magicSquare = [[4, 9, 2], [3, 5, 7], [8, 1, 6]];


  // let rotatedMatrix = JSON.parse(JSON.stringify(magicSquare));
  // let bestMatchResult;
  // for (let i = 0; i < 4; i++) {
  //   rotatedMatrix = rotateMatrix(rotatedMatrix);
  //   const matchResult = getMatchRate(s, rotatedMatrix);
  //   if (!bestMatchResult) {
  //     bestMatchResult = { ...matchResult, matrix: rotatedMatrix };
  //   }
  //   if (matchResult.rate > bestMatchResult.rate) {
  //     bestMatchResult = { ...matchResult, matrix: rotatedMatrix };
  //   }
  // }


  // rotatedMatrix = JSON.parse(JSON.stringify(colsToRows(magicSquare)));
  // for (let i = 0; i < 4; i++) {
  //   rotatedMatrix = rotateMatrix(rotatedMatrix);
  //   const matchResult = getMatchRate(s, rotatedMatrix);
  //   if (!bestMatchResult) {
  //     bestMatchResult = { ...matchResult, matrix: rotatedMatrix };
  //   }
  //   if (matchResult.rate > bestMatchResult.rate) {
  //     bestMatchResult = { ...matchResult, matrix: rotatedMatrix };
  //   }
  // }

  // const magicSquares = getAllMagicSquares();

  let bestMatchResult;

  magicSquares.forEach((magicSquare) => {
    const matchResult = getMatchRate(s, magicSquare);
    if (!bestMatchResult) {
      bestMatchResult = matchResult;
    } else if (matchResult.rate > bestMatchResult.rate) {
      bestMatchResult = { ...matchResult, matrix: magicSquare };
    }
  });

  // console.info('matchRate', bestMatchResult);

  return bestMatchResult;
}


function colsToRows(matrix) {
  const tempMatrix = new Array(matrix.length).fill([]).map((row, index) => matrix.map((col) => col[index]));
  // matrix.forEach((col, colIndex) => {
  //   col.forEach((cell, rowIndex) => {
  //     tempMatrix[rowIndex][colIndex] = cell;
  //   });
  // });
  return tempMatrix;
}

function rotateMatrix(matrix) {
  // const tempMatrix = JSON.parse(JSON.stringify(matrix));
  const cols = [[], [], []];
  [...matrix].reverse().forEach((row, index) => {
    cols[index] = [...row];
  });
  // console.info(matrix, colsToRows(cols));
  return colsToRows(cols);
}


// rotateMatrix([[8, 3, 4], [1, 5, 9], [6, 7, 2]]);


// rotateToMatchSquare([[8, 3, 4], [1, 5, 9], [6, 7, 4]]);

// console.info(getDisitinctPossiblities([[1, 1, 1], [1, 5, 9], [6, 7, 4]]));

// console.info('sum', formingMagicSquare([[4, 8, 2], [4, 5, 7], [6, 1, 6]]));


function getCombinations(values) {
  if (values.length === 1) {
    return values.map((value) => [value]);
  }

  const combinations = [];
  values.forEach((value) => {
    const otherPossibilities = getCombinations(values.filter((val) => val !== value));
    // console.info('otherPossibilities', otherPossibilities);
    combinations.push(...otherPossibilities.map((combination) => [value, ...combination]));
  });

  return combinations;
}


// console.info(getCombinations([1, 2, 3, 4]));

// isMagicSquare([[8, 3, 4], [1, 5, 9], [6, 7, 2]]);


function getAllMagicSquares() {
  const values = new Array(9).fill(0).map((_, index) => index + 1);
  const combinations = getCombinations(values);
  // console.info('combinations', combinations[0]);
  const matrices = [];
  combinations.forEach((combination, index) => {
    matrices.push([combination.slice(0, 3), combination.slice(3, 6), combination.slice(6, 9)]);
  });
  // console.info('matrices', matrices[0]);
  const magicSquares = [];
  matrices.forEach((combination) => {
    if (isMagicSquare(combination)) {
      magicSquares.push(combination);
    }
  });
  // console.info('magicSquares', magicSquares);
  return magicSquares;
}


// getAllMagicSquares();
