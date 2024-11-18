//Logic Gate Controller (Functions)

//AND Gate
function andGate(a, b) {
    return Boolean(a) && Boolean(b);
}

//OR Gate   
function orGate(a, b) {
    return Boolean(a) || Boolean(b);
}

//NOT Gate
function notGate(a) {
    return !Boolean(a);                  
}

//NAND Gate
function nandGate(a, b) {
    return !(Boolean(a) && Boolean(b));
}

//NOR Gate
function norGate(a, b) {
    return !(Boolean(a) || Boolean(b));
}

//XOR Gate 
function xorGate(a, b) {
    return Boolean(a) !== Boolean(b);
}

//XNOR Gate
function xnorGate(a, b) {
    return !(Boolean(a) !== Boolean(b));
}




module.exports = { andGate, orGate, notGate, nandGate, norGate, xorGate, xnorGate };

