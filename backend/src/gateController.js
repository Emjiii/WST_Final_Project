//Logic Gate Controller (Functions)

//AND Gate
function andGate(a, b) {
    return a && b;
}

//OR Gate   
function orGate(a, b) {
    return a || b;
}

//NOT Gate
function notGate(a) {
    return !a;                  
}

//NAND Gate
function nandGate(a, b) {
    return !(a && b);
}

//NOR Gate
function norGate(a, b) {
    return !(a || b);
}

//XOR Gate 
function xorGate(a, b) {
    return (a || b) && !(a && b);
}

//XNOR Gate
function xnorGate(a, b) {
    return (a || b) && (a && b);
}




module.exports = { andGate, orGate, notGate, nandGate, norGate, xorGate, xnorGate };

