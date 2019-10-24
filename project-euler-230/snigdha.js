function processData(input) {
    var splitInput = input.split('\n');
    var triples = splitInput.splice(0,1)[0];
    for(var currData = 0; currData < triples; currData++){
        var currInputArr = splitInput[currData].split(' ');
        var str1 = currInputArr[0], str2 = currInputArr[1], pos = currInputArr[2];
        if(str1.length >= pos){
            console.log(str1.charAt(pos));
            continue;     
        } else if (str2.length >= pos){
            console.log(str2.charAt(pos));     
            continue;
        }
        while(true){
            if(str1.length+str2.length >= pos){
                console.log((str1.concat(str2)).charAt(pos-1));     
                break;
            }
            else{
                var temp = str1
                str1 = str2;
                str2 = temp.concat(str2);
            }
        }
    }
}

/*input:
2
143 153 15
1234 5678 10
*/

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});

