const crypto = require('crypto');

function calculateSHA256(buffer, noOfTimes) {
    if (noOfTimes < 1) {
        return buffer;
    } else {
        noOfTimes--;
        buffer = crypto.createHash('sha256').update(buffer).digest();
        return calculateSHA256(buffer, noOfTimes);
    }
}

exports.calculateSHA256 = calculateSHA256;