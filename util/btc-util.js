const coreUtil = require('./core-util');
const baseUtil = require('./base-util');

const BTC_SATOSHI = 100000000;

function isBitcoinAddress(address) {
    if (address.length < 25 || address.length > 34)
        return false;

    address = Array.prototype.slice.call(address);
    if (!baseUtil.isBase58(address))
        return false;

    var address16;
    try {
        address16 = baseUtil.convertBase58toBase16(address);
    } catch (error) {
        console.log(error);
        return false;
    }

    while (address16.length < 50)
        address16 = '0' + address16;

    var addressBuffer = new Buffer(address16, 'hex');

    return coreUtil.calculateSHA256(addressBuffer.slice(0, 21), 2).slice(0, 4).equals(addressBuffer.slice(21, 25));
}

function BTCtoSATOSHI(btc) {
    return btc * BTC_SATOSHI;
}

function SATOSHItoBTC(satoshi) {
    return satoshi / BTC_SATOSHI;
}

exports.isBitcoinAddress = isBitcoinAddress;
exports.BTCtoSATOSHI = BTCtoSATOSHI;
exports.SATOSHItoBTC = SATOSHItoBTC;