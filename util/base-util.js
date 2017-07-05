const Base16Alphabet = '0123456789abcdef';
const Base58Alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

function isBaseX(num, baseXAlphabet) {
    return num.every(function(c) {
        return baseXAlphabet.indexOf(c) >= 0;
    });
}

function convertBase(numInBaseX, baseXAlphabet, baseYAlphabet) {
    if (typeof baseXAlphabet !== 'string' || typeof baseYAlphabet !== 'string')
        throw new Error("Alphabet should be passed as string");
    if (typeof numInBaseX !== 'string' && Object.prototype.toString.call(numInBaseX) !== '[object Array]')
        throw new Error("Number should be passed as a string or an array of chars");

    var numInBaseXLength = numInBaseX.length;
    var baseXAlphabetLength = baseXAlphabet.length;
    var baseYAlphabetLength = baseYAlphabet.length;
    var numInBaseYLength = Math.ceil(numInBaseXLength * (Math.log(baseXAlphabetLength) / Math.log(baseYAlphabetLength)));

    var numInBaseYArray = new Array(numInBaseYLength);
    for (var i = 0; i < numInBaseXLength; i++) {
        var character = numInBaseX[i];
        var characterIndex = baseXAlphabet.indexOf(character);
        if (characterIndex < 0)
            throw new Error("Given number has characters which are not in alphabet");

        for (var j = 0; j < numInBaseYLength; j++) {
            if (!numInBaseYArray[j])
                numInBaseYArray[j] = 0;

            characterIndex += baseXAlphabetLength * numInBaseYArray[j];
            numInBaseYArray[j] = characterIndex % baseYAlphabetLength;
            characterIndex = Math.floor(characterIndex / baseYAlphabetLength);
        }
    }

    var numInBaseY = '';
    numInBaseYArray.forEach(function(e) {
        numInBaseY = baseYAlphabet.charAt(e) + numInBaseY;
    });

    return numInBaseY;
}

exports.isBaseX = isBaseX;
exports.isBase16 = function(num) {
    return isBaseX(num, Base16Alphabet);
};
exports.isBase58 = function(num) {
    return isBaseX(num, Base58Alphabet);
};

exports.convertBase = convertBase;
exports.convertBase16toBase58 = function(numInBase16) {
    return convertBase(numInBase16, Base16Alphabet, Base58Alphabet);
};
exports.convertBase58toBase16 = function(numInBase58) {
    return convertBase(numInBase58, Base58Alphabet, Base16Alphabet);
};