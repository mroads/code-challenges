const BigNumber = require('bignumber.js');

/* eslint-disable no-underscore-dangle */

/**
 *
1
1415926535 8979323846 21
1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679 8214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196 104683731294243150

*/

let iterationValues = [];


function findIteration(n, A, B, iteration) {
  // console.info('iteration', n, A, B, iteration);


  for (let i = iteration; i >= 0; i -= 2) {
    // console.info('find me', iterationValues[i], n, i);
    if (n.minus(iterationValues[i]) > 0) {
      const difference = n.minus(iterationValues[i]);
      // console.info('difference', i, iterationValues[i]);
      if (i > 0 && difference.minus(iterationValues[i - 1]) > 0) {
        // console.info('in second part', difference.minus(iterationValues[i - 1]));
        return findIteration(difference.minus(iterationValues[i - 1]), A, B, i);
      }
      // console.info('in first part', difference.minus(iterationValues[i - 1]));

      return findIteration(difference, A, B, i - 1);
    }
  }

  if (iteration % 2 === 0) {
    return A[n > 0 ? n - 1 : n];
  }
  return B[n > 0 ? n - 1 : n];
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

    // console.info('iterationValues', iterationValues.length - 1, n.minus(prev1Length));


    const value = findIteration(n, A, B, iterationValues.length - 1);
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
  // console.info('ended');
  processData(_input);
});
