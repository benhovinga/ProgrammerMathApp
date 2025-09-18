/**
 * Programmer Math Practice App
 * 
 * A tool to help junior developers practice some basic programming math.
 * @author Benjamin P.C. Hovinga
 * @license MIT
 * 
 * Notice: This program does not contain AI generated code.
 */


function getRandomDecimalNumber() {
    return Math.floor(Math.random() * 255);
}


function convertDecimalToBinary(decimalNumber) {
    return decimalNumber.toString(2).padStart(8, "0");
}


function convertBinaryToDecimal(binaryString) {
    return parseInt(binaryString, 2);
}


function convertDecimalToHexadecimal(decimalNumber) {
    return decimalNumber.toString(16).toUpperCase();
}


function convertHexadecimalToDecimal(hexadecimalString) {
    return parseInt(hexadecimalString, 16);
}


function App() {
    console.clear();
    console.info('Starting App...');

    // Save the pointers for the selection elements.
    const convertFromElements = document.getElementsByName('convertFrom');
    const convertToElements = document.getElementsByName('convertTo');

    // Set the default states of the app.
    const conversionOptions = ['dec', 'bin', 'hex'];
    let convertFrom = conversionOptions[0];
    let convertTo = conversionOptions[1];
    convertFromElements[0].checked = true;
    convertToElements[0].disabled = true;
    convertToElements[1].checked = true;

    // When 'convertFrom' changes.
    document.getElementById('convertFrom').addEventListener('change', function(event) {
        // Update the selected value.
        convertFrom = event.target.value;
        console.info(`User updated 'convertFrom': '${convertFrom}'`);

        // Disable the sister option in 'convertTo'.
        convertToElements.forEach(function (element, index) {
            // Reset disabled elements.
            element.disabled = false;

            // When we get to the sister option.
            if (element.value === convertFrom) {
                // Disable sister option.
                element.disabled = true;

                // Change the selection if  both 'to' and 'from' are selected.
                if (convertFrom === convertTo) {
                    if (index >= 2) {
                        // Move to top position.
                        convertToElements[0].checked = true;
                        convertTo = conversionOptions[0];
                    } else {
                        // Move to next position.
                        convertToElements[index + 1]. checked = true;
                        convertTo = conversionOptions[index + 1];
                    }
                    console.debug(`Program updated 'convertTo': '${convertTo}'`);
                }
            }
        });
    });

    // When 'Convert To' changes.
    document.getElementById('convertTo').addEventListener('change', function(event) {
        // Update the selected value
        convertTo = event.target.value;
        console.info(`User updated 'convertTo': '${convertTo}'`);
    });
}

// Start the app when the DOM is ready.
window.addEventListener('DOMContentLoaded', App);
