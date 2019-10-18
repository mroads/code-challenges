/* eslint-disable no-underscore-dangle */

/**
 *
2
1415926535 8979323846 35
1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679 8214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196 104683731294243150
 */
function processData(input) {
  // Enter your code here
  const { q, data } = extractData(input);
  console.info('q,data', q, data);
  data.forEach((line) => {
    const { A, B, n } = line;
    console.info('line length', A.length, B.length, n);
    let prev1Length = A.length;
    let prev2Length = B.length;
    const prev1 = 'A';
    const prev2 = 'B';
    let i = 0;
    const iterationValues = [];
    while (true) {
      try {
        const temp = prev2Length;
        prev2Length = prev1Length + prev2Length;
        prev1Length = temp;
        // const temp2 = prev2;
        // prev2 = `${prev1}+${prev2}`;
        // prev1 = temp2;
        console.info('prev1Length,prev2Length', prev1Length, prev2Length, n);
        if (prev2Length >= n) {
          break;
        }
      } catch (e) {
        console.warn(e, i);
        break;
      }
      iterationValues[i] = prev2Length;
      i++;
    }

    // const result = prev2.split('+');
    // let length = 0;
    // let value = '';
    // for (i = 0; i < result.length; i++) {
    //   if (result[i] === 'A') {
    //     length += A.length;
    //     value = A;
    //   } else {
    //     length += B.length;
    //     value = B;
    //   }
    //   if (length > n) {
    //     break;
    //   }
    // }

    const difference = prev2Length - n;


    for (let j = 0; j < iterationValues.length; j++) {
      if (iterationValues[j] > difference) {
        console.info('find me', prev2Length, i, n, j);
        break;
      }
    }
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
      const n = query[2];
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
