var screen = document.querySelector('#screen');
var btn = document.querySelectorAll('.btn');

// For getting the value of button, using event listeners
for (item of btn) {
    item.addEventListener('click', (e) => {
        btntext = e.target.innerText;

        if (btntext == '×') {
            btntext = '*';
        }

        if (btntext == '÷') {
            btntext = '/';
        }

        if (btntext == 'π') {
            btntext = Math.PI;
        }

        screen.value += btntext;
    });
}

// Helper function to ensure parentheses closure
function closeFunctions(expression) {
    const functionRegex = /(Math\.sin|Math\.cos|Math\.tan|Math\.log|Math\.sqrt)\(/g;
    let openParens = 0;
    let closeParens = 0;

    // Count the number of open parentheses
    expression.replace(functionRegex, (match) => {
        openParens++;
        return match;
    });

    // Count the number of closing parentheses
    closeParens = (expression.match(/\)/g) || []).length;

    // Add missing closing parentheses
    while (openParens > closeParens) {
        expression += ')';
        closeParens++;
    }

    return expression;
}

// Function for evaluating and calculating the expression
function calculate() {
    try {
        let expression = screen.value;
        expression = closeFunctions(expression); // Add closing parentheses if necessary
        screen.value = eval(expression); // Evaluate the expression
    } catch (err) {
        screen.value = 'Error';
    }
}

// Convert degrees to radians
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Trigonometric and logarithmic functions (with degree to radian conversion for trig functions)
function sin() {
    screen.value += `Math.sin(toRadians(`; // Convert degrees to radians before applying sin
}

function cos() {
    screen.value += `Math.cos(toRadians(`; // Convert degrees to radians before applying cos
}

function tan() {
    screen.value += `Math.tan(toRadians(`; // Convert degrees to radians before applying tan
}

function log() {
    screen.value += 'Math.log('; // Append Math.log( for the calculation
}

// Power function x^y
function pow() {
    screen.value += '**';
}

// Square root function
function sqrt() {
    screen.value += 'Math.sqrt(';
}

// Insert the value of Pi
function pi() {
    screen.value += Math.PI;
}

// Insert Euler's number e
function e() {
    screen.value += Math.E;
}

// Factorial function
function fact() {
    let num = eval(screen.value);
    if (num < 0) {
        screen.value = 'Error'; // Factorial of negative numbers is undefined
        return;
    }
    let f = 1;
    for (let i = 1; i <= num; i++) {
        f *= i;
    }
    screen.value = f;
}

// Backspace to delete last character
function backspc() {
    screen.value = screen.value.slice(0, -1);
}

// Clear screen
function clearScreen() {
    screen.value = ""; // Clear the calculator screen
}
