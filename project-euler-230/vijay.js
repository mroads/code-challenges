const BigNumber = require('bignumber.js');

/* eslint-disable no-underscore-dangle */

/**
 *
1
1415926535 8979323846 0
1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679 8214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196 104683731294243150
*/

let iterationValues = [];


function solution(n, A, B, iteration) {
  // console.info('solution', n, A, B, iteration);
  if (iteration === 0) {
    return A[n - 1];
  }
  if (iteration === 1) {
    return B[n - 1];
  }
  const firstPart = iterationValues[iteration - 2];
  // const secondPart = iterationValues[iteration - 1];
  const difference = n.minus(firstPart);
  if (difference > 0) {
    return solution(difference, A, B, iteration - 1);
  }
  return solution(n, A, B, iteration - 2);
}


function processData(input) {
  // Enter your code here
  const { q, data } = extractData(input);
  // console.info('q,data', q, data.length);

  for (let i = 0; i < q; i++) {
    const line = data[i];
    // console.info('line', line);
    iterationValues = [];
    const { A, B, n } = line;

    if (n <= A.length) {
      console.info(A[n - 1]);
      break;
    }

    const AB = A + B;

    if (n <= AB.length) {
      console.info(AB[n - 1]);
      break;
    }


    let prev1Length = new BigNumber(A.length);
    let prev2Length = new BigNumber(B.length);
    iterationValues.push(prev1Length);
    iterationValues.push(prev2Length);
    while (true) {
      try {
        const temp = prev2Length;
        prev2Length = prev1Length.plus(prev2Length);
        prev1Length = temp;
        iterationValues.push(prev2Length);
        if (prev2Length.minus(n) > 0) {
          break;
        }
      } catch (e) {
        console.warn('error', e);
        break;
      }
    }

    // console.info('iterationValues', iterationValues.length - 1, iterationValues);


    const value = solution(n, A, B, iterationValues.length - 1);
    console.info(value);
  }
}


function extractData(input) {
  const inputLines = input.trim().split('\n');
  if (inputLines.length < 2) {
    return {
      q: 0,
    };
  }
  const q = new Number(inputLines[0]);
  const data = [];
  for (let i = 1; i <= q; i++) {
    const query = inputLines[i].trim().split(' ');
    if (query.length === 3) {
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
  // console.info('ended');
  processData(_input);
});
