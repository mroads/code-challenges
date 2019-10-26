const BigNumber = require('bignumber.js');

/* eslint-disable no-underscore-dangle */

/**
 *
1
1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679 8214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196 210
*/

let iterationValues = [];


function calculateDifference(val1, val2) {
  return new BigNumber(`${val1}`).minus(val2);
}


function findIteration(n, A, B) {
  const AB = A + B;
  if (n <= AB.length) {
    return AB[n - 1];
  }

  for (let i = 0; i < iterationValues.length; i++) {
    if (iterationValues[i].minus(n) >= 0) {
      // console.info('n, iterationValues[i - 1]', n, iterationValues[i - 1], i);
      const difference = calculateDifference(n, iterationValues[i - 1]);
      return findIteration(difference, A, B, false);
    }
  }
  return 0;
}


function processData(input) {
  // Enter your code here
  const { q, data } = extractData(input);
  // console.info('q,data', q, data);
  data.forEach((line) => {
    iterationValues = [];
    const { A, B, n } = line;
    let prev1Length = new BigNumber(A.length);
    let prev2Length = new BigNumber(B.length);
    let i = 0;
    while (true) {
      try {
        const temp = prev2Length;
        prev2Length = prev1Length.plus(prev2Length);
        prev1Length = temp;
        iterationValues[i] = prev2Length;
        if (prev2Length.minus(n) >= 0) {
          break;
        }
      } catch (e) {
        console.warn(e, i);
        break;
      }
      i++;
    }

    // console.info('iterationValues', iterationValues, prev2Length >= n);

    const value = findIteration(n, A, B, true);

    console.info(value);
  });
}


function extractData(input) {
  const inputLines = input.split('\n');
  if (inputLines.length < 2) {
    console.info(0);
    return {
      q: 0,
    };
  }
  const q = new Number(inputLines[0]);
  const data = [];
  for (let i = 1; i <= q; i++) {
    const query = inputLines[i].split(' ');
    if (query.length < 3) {
      break;
    } else {
      // ABn
      const A = query[0];
      const B = query[1];
      const n = new BigNumber(query[2]);
      data.push({
        A,
        B,
        n,
      });
    }
  }
  return {
    q,
    data,
  };
}

process.stdin.resume();
process.stdin.setEncoding('ascii');
let _input = '';
process.stdin.on('data', (input) => {
  _input += input;
});

process.stdin.on('end', () => {
  processData(_input);
});
