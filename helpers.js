// Function to add two binary numbers
function add(A, M) {

    const maxLength = Math.max(A.length, M.length);
    A = A.padStart(maxLength, '0');
    M = M.padStart(maxLength, '0');

    let carry = 0;
    let sum = "";

    for (let i = A.length - 1; i >= 0; i--) {
        let temp = parseInt(A[i]) + parseInt(M[i]) + carry;

        if (temp > 1) {
            sum = (temp % 2) + sum;
            carry = 1;
        } else {
            sum = temp + sum;
            carry = 0;
        }
    }

    return {sum, carry}
}

// Function to find the complement of the binary number
function complement(m) {
    let M = "";

    for (let i = 0; i < m.length; i++) {
        M += (parseInt(m[i]) + 1) % 2;
    }

    M = add(M, "1".padStart(m.length, '0')).sum;
    return M;
}


function binaryToDecimal(binary) {
    let decimal = 0;
    let power = 0;

    for (let i = binary.length - 1; i >= 0; i--) {
        decimal += parseInt(binary[i]) * Math.pow(2, power);
        power++;
    }

    return decimal;
}

function decimalToBinary(decimal) {
    let binary = "";

    while (decimal > 0) {
        binary = (decimal % 2) + binary;
        decimal = Math.floor(decimal / 2);
    }

    return binary;
}