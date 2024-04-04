function convert() {
  let number = document.getElementById('number').value;
  let from = document.getElementById('from').value;
  let to = document.getElementById('to').value;
  let result;

  if (from === 'binary') {
    if (!isBinaryNumber(number)) {
      alert('Invalid binary number');
      return;
    }
  } else if (from === 'hexadecimal') {
    if (!isHexadecimalNumber(number)) {
      alert('Invalid hexadecimal number');
      return;
    }
  }

  switch (from) {
      case 'decimal':
          switch (to) {
              case 'decimal':
                  result = number;
                  break;
              case 'binary':
                  result = decimalToBinary(number);
                  break;
              case 'hexadecimal':
                  result = decimalToHexadecimal(number);
                  break;
              case 'octal':
                  result = decimalToOctal(number);
                  break;
              default:
                  result = 'Invalid';
          }
          break;
      case 'binary':
          switch (to) {
              case 'decimal':
                  result = binaryToDecimal(number);
                  break;
              case 'binary':
                  result = number;
                  break;
              case 'hexadecimal':
                  result = binaryToHexadecimal(number);
                  break;
              case 'octal':
                  result = binaryToOctal(number);
                  break;
              default:
                  result = 'Invalid';
          }
          break;
      case 'hexadecimal':
          // Convert hexadecimal to decimal first, then to the desired format
          let decimalFromHexadecimal = parseInt(number, 16);
          switch (to) {
              case 'decimal':
                  result = decimalFromHexadecimal;
                  break;
              case 'binary':
                  result = decimalToBinary(decimalFromHexadecimal);
                  break;
              case 'hexadecimal':
                  result = number;
                  break;
              case 'octal':
                  result = decimalToOctal(decimalFromHexadecimal);
                  break;
              default:
                  result = 'Invalid';
          }
          break;
      case 'octal':
          // Convert octal to decimal first, then to the desired format
          let decimalFromOctal = parseInt(number, 8);
          switch (to) {
              case 'decimal':
                  result = decimalFromOctal;
                  break;
              case 'binary':
                  result = decimalToBinary(decimalFromOctal);
                  break;
              case 'hexadecimal':
                  result = decimalToHexadecimal(decimalFromOctal);
                  break;
              case 'octal':
                  result = number;
                  break;
              default:
                  result = 'Invalid';
          }
          break;
      default:
          result = 'Invalid';
  }

  document.getElementById('result').innerText = result;
}

function isHexadecimalNumber(number) {
  const hexadecimalString = number.toString();
  const integerAndFractionalParts = hexadecimalString.split('.');
  const integerPart = integerAndFractionalParts[0];
  const fractionalPart = integerAndFractionalParts[1] || '';

  // Check the integer part
  if (!integerPart.split('').every(char => /[0-9a-fA-F]/.test(char))) {
    return false;
  }

  // Check the fractional part
  if (fractionalPart !== '') {
    return fractionalPart.split('').every(char => /[0-9a-fA-F]/.test(char));
  }

  return true;
}

// Decimal to binary conversion function
function decimalToBinary(decimal) {
  let binary = '';
  let integerPart = Math.floor(decimal);
  let fractionalPart = decimal - integerPart;
  while (integerPart > 0) {
      binary = (integerPart % 2) + binary;
      integerPart = Math.floor(integerPart / 2);
  }
  if (binary === '') {
      binary = '0';
  }
  if (fractionalPart > 0) {
      binary += '.';
      let maxFractionalBits = 10; // Max bits for fractional part
      while (fractionalPart > 0 && maxFractionalBits > 0) {
          fractionalPart *= 2;
          binary += Math.floor(fractionalPart);
          fractionalPart -= Math.floor(fractionalPart);
          maxFractionalBits--;
      }
  }
  return binary;
}

function decimalToHexadecimal(decimal) {
  let hexadecimal = '';
  let integerPart = Math.floor(decimal);
  let fractionalPart = decimal - integerPart;
  while (integerPart > 0) {
    let remainder = integerPart % 16;
    hexadecimal = (remainder < 10 ? remainder : String.fromCharCode(remainder + 55)) + hexadecimal;
    integerPart = Math.floor(integerPart / 16);
  }
  if (hexadecimal === '') {
    hexadecimal = '0';
  }
  if (fractionalPart > 0) {
    hexadecimal += '.';
    let maxFractionalDigits = 10; // Max digits for fractional part
    while (fractionalPart > 0 && maxFractionalDigits > 0) {
      fractionalPart *= 16;
      let digit = Math.floor(fractionalPart);
      hexadecimal += (digit < 10 ? digit : String.fromCharCode(digit + 55));
      fractionalPart -= Math.floor(fractionalPart);
      maxFractionalDigits--;
    }
  }
  return hexadecimal;
}

function decimalToOctal(decimal) {
  let octal = '';
  let integerPart = Math.floor(decimal);
  let fractionalPart = decimal - integerPart;
  while (integerPart > 0) {
    octal = (integerPart % 8) + octal;
    integerPart = Math.floor(integerPart / 8);
  }
  if (octal === '') {
    octal = '0';
  }
  if (fractionalPart > 0) {
    octal += '.';
    let maxFractionalBits = 10; // Max bits for fractional part
    while (fractionalPart > 0 && maxFractionalBits > 0) {
      fractionalPart *= 8;
      octal += Math.floor(fractionalPart);
      fractionalPart -= Math.floor(fractionalPart);
      maxFractionalBits--;
    }
  }
  return octal;
}

function isBinaryNumber(number) {
  const binaryString = number.toString();
  return binaryString.split('.').every(part => part.split('').every(char => char === '0' || char === '1'));
}

function binaryToDecimal(binary) {
  if (!isBinaryNumber(binary)) {
    throw new Error('Invalid binary number');
  }

  const binaryString = binary.toString();
  const [integerPart, fractionalPart] = binaryString.split('.');
  let decimal = 0;

  for (let i = 0; i < integerPart.length; i++) {
    decimal += parseInt(integerPart[i]) * Math.pow(2, integerPart.length - 1 - i);
  }

  if (fractionalPart !== undefined) {
    for (let i = 0; i < fractionalPart.length && i < 10; i++) { // Limit the number of fractional bits for safety
      decimal += parseInt(fractionalPart[i]) * Math.pow(2, -(i + 1));
    }
  }

  return decimal;
}

function binaryToHexadecimal(binary) {
  const decimal = binaryToDecimal(binary);
  return decimalToHexadecimal(decimal);
}

function binaryToOctal(binary) {
  const decimal = binaryToDecimal(binary);
  return decimalToOctal(decimal);
}