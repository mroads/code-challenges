const BigNumber = require('bignumber.js');

/* eslint-disable no-underscore-dangle */

/**
 *
2
1415926535 8979323846 35
1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679 8214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196 104683731294243150

*/

let iterationValues = [];


function calculateDifference(val1, val2) {
  return new BigNumber(`${val1}`).minus(val2);
}


function findIteration(n, A, B, iteration) {
  const AB = A + B;

  // console.info('iteration', n, A, B, iteration);


  if (iteration === 2 && n <= AB.length) {
    // console.info('match found', iteration, n, AB);
    return AB[n > 0 ? n - 1 : n];
  }


  for (let i = iteration; i > 0; i--) {
    // console.info('find me', iterationValues[i], n);
    if (n.minus(iterationValues[i]) > 0) {
      const difference = n.minus(iterationValues[i]);
      // console.info('n, iterationValues[i]', n, iterationValues[i], i, difference);
      return findIteration(difference, A, B, i);
    }
  }

  if (n < B.length) {
    // console.info('match found', iteration, n, AB);
    return B[n > 0 ? n - 1 : n];
  } if (n < AB.length) {
    // console.info('match found', iteration, n, AB);
    return AB[n > 0 ? n - 1 : n];
  }
  // return B[n - 1];
}


function processData(input) {
  // Enter your code here
  const { q, data } = extractData(input);
  // console.info('q,data', q, data.length);
  data.forEach((line) => {
    // console.info('line', line);
    iterationValues = [];
    const { A, B, n } = line;
    let prev1Length = new BigNumber(A.length);
    let prev2Length = new BigNumber(B.length);
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
        console.warn(e);
        break;
      }
    }

    // console.info('iterationValues', iterationValues, iterationValues.length - 1);

    const value = findIteration(n, A, B, iterationValues.length - 1);

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


// processData('1\n1415926535 8979323846 20');
