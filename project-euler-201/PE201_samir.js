const subsetSumArray = [];

function getSubsetsSumArray(arr, al, sl, index, data, i) {
    if (index === +sl) {
        let sum = 0;
        for (j = 0; j < sl; j++) {
            sum += +data[j];
        }
        subsetSumArray.push(sum);
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
    inputArray.forEach(ele => {
        const eleIndex = uArray.indexOf(ele);
         eleIndex === -1 ? 
            uArray.push(ele) : 
            uArray.splice(eleIndex, 1);
       
    });
    return uArray;
}

function processData(input) {
    const subsetLength = input.split('\n')[0].split(' ')[1];
    const arrLen = input.split('\n')[0].split(' ')[0];
    let splitArr = input.split('\n')[1].split(' ');

    if (arrLen < splitArr.length) {
        splitArr.splice(0, arrLen);
    }
    if (subsetLength > splitArr.length) {
        return 0;
    }
    getSubsetsSumArray(splitArr, arrLen, subsetLength, 0, [], 0);
//     getSubsetsSumArray([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17
// , 18, 19, 20, 21 ] , 21, 9, 0, [], 0);
    // console.info('subsetSumArray', subsetSumArray.length);
    const uniqueArray = getUniqueSumArray(subsetSumArray);
    return uniqueArray.reduce((total, i) => total + i, 0);
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   var result = processData(_input);
   console.info(result);
});
