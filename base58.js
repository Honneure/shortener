var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
var base = alphabet.length;

function encode (num) {
    var encoded = "";
    while(num) {
        var remainder = num % base; // give me a number between 0 and 58 
        num = Math.floor(num / base); // give me the first part of the result of num/base and will end the looop
        encoded = alphabet[remainder].toString() + encoded; // we set the encoding taking a number or a letter (MAJ or min) of the alphabet - we convert it toString (in case of number)
    }
    
    return encoded; // return a small combination of number and letter 
}

function decode (str) {
    var decoded = 0; 
    while (str) {
        var index = alphabet.indexOf(str[0]); // set a number of the position of "str[0]" in alphabet --> between 1 and 58
        var power = str.length - 1 ; // length-1 set a number 
        decoded += index * (Math.pow(base, power)); // index's number * the base^power AND increase the number of decoded 
        str = str.substring(1); // str is reducing over each loop, decreasing by 1 component
        
    }
    
    return decoded; // return a huge number 
}

module.exports.encode = encode;
module.exports.decode = decode;

