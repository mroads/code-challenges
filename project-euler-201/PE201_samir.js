
const uniqueSum = {};

function getSubsetsSumArray(arr, al, sl, index, data, i) {
  if (index === +sl) {
    let sum = 0;
    for (let j = 0; j < sl; j++) {
      sum += +data[j];
    }
    if (uniqueSum[sum]) {
      uniqueSum[sum] += 1;
    } else {
      uniqueSum[sum] = 1;
    }
    return;
  }
  if (i >= al) {
    return;
  }
  data[index] = arr[i];
  getSubsetsSumArray(arr, al, sl, index + 1, data, i + 1);
  getSubsetsSumArray(arr, al, sl, index, data, i + 1);
}

function getUniqueSumArray(inputArray) {
  const uArray = [];
  inputArray.forEach((ele) => {
    const eleIndex = uArray.indexOf(ele);
    eleIndex === -1
      ? uArray.push(ele)
      : uArray.splice(eleIndex, 1);
  });
  return uArray;
}

function processData(input) {
  const subsetLength = input.split('\n')[0].split(' ')[1];
  const arrLen = input.split('\n')[0].split(' ')[0];
  const splitArr = input.split('\n')[1].split(' ');

  if (arrLen < splitArr.length) {
    splitArr.splice(0, arrLen);
  }
  if (subsetLength > splitArr.length) {
    return 0;
  }
  getSubsetsSumArray(splitArr, arrLen, subsetLength, 0, [], 0);
  let total = 0;
  Object.keys(uniqueSum).forEach((sum) => {
    if (uniqueSum[sum] === 1) {
      total += +sum;
    }
  });
  // const uniqueArray = getUniqueSumArray(subsetSumArray);
  // console.info('uniqueArray', Object);

  // const total = uniqueSumArray.reduce((s, i) => s + i, 0);

  // console.info('total', total, new BigNumber(total));
  return total;
}

// process.stdin.resume();
// process.stdin.setEncoding('ascii');
// _input = '';
// process.stdin.on('data', (input) => {
//   _input += input;
// });

// process.stdin.on('end', () => {
//   const result = processData(_input);
//   console.info(result);
// });


const { data, m, n } = {
  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29], m: 15, numOfSubSets: '77558759.99999999', n: 29,
};

const startTime = new Date().getTime();

getSubsetsSumArray(data, n, m, 0, [], 0);
let total = 0;
Object.keys(uniqueSum).forEach((sum) => {
  if (uniqueSum[sum] === 1) {
    total += +sum;
  }
});
// const uniqueArray = getUniqueSumArray(subsetSumArray);
// console.info('uniqueArray', Object);

// const total = uniqueSumArray.reduce((s, i) => s + i, 0);

console.info('total', total, 'executed in ', new Date().getTime() - startTime);
