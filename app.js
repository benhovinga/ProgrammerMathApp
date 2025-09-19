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


function checkAnswer(from, to, question, answer) {
    // Check that a answer was provided.
    if (answer === '') {
        return false;
    }

    // Decimal to Binary
    if (from === 'dec' && to === 'bin') {
        return parseInt(question, 10) === convertBinaryToDecimal(answer);
    }
    // Decimal to Hexadecimal.
    else if (from === 'dec' && to === 'hex') {
        return parseInt(question, 10) === convertHexadecimalToDecimal(answer);
    }
    // Binary to Decimal.
    else if (from === 'bin' && to === 'dec') {
        return convertBinaryToDecimal(question) === parseInt(answer, 10);
    }
    // Binary to Hexadecimal.
    else if (from === 'bin' && to === 'hex') {
        return convertBinaryToDecimal(question) === convertHexadecimalToDecimal(answer);
    }
    // Hexadecimal to Decimal.
    else if (from === 'hex' && to === 'dec') {
        return convertHexadecimalToDecimal(question) === parseInt(answer, 10);
    }
    // Hexadecimal to Binary.
    else if (from === 'hex' && to === 'bin') {
        return convertHexadecimalToDecimal(question) === convertBinaryToDecimal(answer);
    }
}


function App() {
    console.clear();
    console.info('Starting App...');

    // Define the number systems.
    const NUMBER_SYSTEMS = ['dec', 'bin', 'hex'];

    // Save the pointers for the selection elements.
    const convertFromElements = document.getElementsByName('convertFrom');
    const convertToElements = document.getElementsByName('convertTo');

    // Save the pointers for the question, answer, and result elements.
    const questionElement = document.getElementById('question');
    const answerElement = document.getElementById('answer');
    const resultElement = document.getElementById('result');

    // Set the default states of the app.
    let convertFrom = NUMBER_SYSTEMS[0];
    let convertTo = NUMBER_SYSTEMS[1];
    convertFromElements[0].checked = true;
    convertToElements[0].disabled = true;
    convertToElements[1].checked = true;
    questionElement.innerText = getNewQuestion(NUMBER_SYSTEMS[0]);

    // Define a helper function to reset styles.
    function resetStyles() {
        answerElement.classList.remove('correct', 'incorrect');
        resultElement.classList.remove('correct', 'incorrect');
    }

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
                        convertTo = NUMBER_SYSTEMS[0];
                    } else {
                        // Move to next position.
                        convertToElements[index + 1]. checked = true;
                        convertTo = NUMBER_SYSTEMS[index + 1];
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

    // When the Submit button is clicked.
    document.getElementById('submitBtn').addEventListener('click', function(event) {
        event.preventDefault();
        // Reset the styles.
        resetStyles();

        // Check if the answer is correct.
        if (checkAnswer(convertFrom, convertTo, questionElement.innerText, answerElement.value.trim())) {
            answerElement.classList.add('correct');
            resultElement.innerText = "Correct!";
            resultElement.classList.add('correct');
        }
        else {
            answerElement.classList.add('incorrect');
            resultElement.innerText = "Try again.";
            resultElement.classList.add('incorrect');
        }
    });

    // When the Reset button is clicked.
    document.getElementById('resetBtn').addEventListener('click', function(event) {
        event.preventDefault();
        // Reset the styles.
        resetStyles();
        // Get a new question.
        questionElement.innerText = getNewQuestion(convertFrom);
        // Clear the answer and result.
        answerElement.value = "";
        resultElement.innerText = "";
    });
}

// Start the app when the DOM is ready.
window.addEventListener('DOMContentLoaded', App);
