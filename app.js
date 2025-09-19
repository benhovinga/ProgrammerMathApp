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
    return decimalNumber.toString(2).padStart(8, '0');
}


function convertBinaryToDecimal(binaryString) {
    return parseInt(binaryString, 2);
}


function convertDecimalToHexadecimal(decimalNumber) {
    return decimalNumber.toString(16).toUpperCase().padStart(2, '0');
}


function convertHexadecimalToDecimal(hexadecimalString) {
    return parseInt(hexadecimalString, 16);
}


function getNewQuestion(numberSystem) {
    if (numberSystem === 'dec') {
        return getRandomDecimalNumber();
    }
    else if (numberSystem === 'bin') {
        return convertDecimalToBinary(getRandomDecimalNumber());
    }
    else if (numberSystem === 'hex') {
        return convertDecimalToHexadecimal(getRandomDecimalNumber());
    }
    new Error(`Number system '${numberSystem}' is not supported. Expected 'dec', 'bin', or 'hex'.`);
}


function App() {
    console.clear();
    console.info('Starting App...');

    // Save the pointers for the selection elements.
    const convertFromElements = document.getElementsByName('convertFrom');
    const convertToElements = document.getElementsByName('convertTo');

    // Save the pointers for the question and answer elements.
    const questionElement = document.getElementById('question');
    const answerElement = document.getElementById('answer');

    // Set the default states of the app.
    const numberSystems = ['dec', 'bin', 'hex'];
    let convertFrom = numberSystems[0];
    let convertTo = numberSystems[1];
    convertFromElements[0].checked = true;
    convertToElements[0].disabled = true;
    convertToElements[1].checked = true;
    questionElement.innerText = getNewQuestion(numberSystems[0]);

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
                        convertTo = numberSystems[0];
                    } else {
                        // Move to next position.
                        convertToElements[index + 1]. checked = true;
                        convertTo = numberSystems[index + 1];
                    }
                    console.debug(`Program updated 'convertTo': '${convertTo}'`);
                }
            }
        });

        // Finally update the question value to the new number system selected.
        questionElement.innerText = getNewQuestion(convertFrom);
        console.info(`New question value '${questionElement.innerText}'`)
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
