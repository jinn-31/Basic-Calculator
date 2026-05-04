const display = document.getElementById("display");
const historyList = document.getElementById("historyList");

let history = [];

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function removeLeadingZeros(expr) {
    return expr.split(/([+\-*/])/).map(token => {
        
        // Keep operators unchanged
        if (/^[+\-*/]$/.test(token)) return token;

        // Preserve decimals properly
        if (token.includes(".")) {
            let [whole, decimal] = token.split(".");
            whole = whole.replace(/^0+(?=\d)/, "") || "0";
            return whole + "." + decimal;
        }

        // Whole numbers only
        return token.replace(/^0+(?=\d)/, "") || "0";
    }).join("");
}

function calculate() {
    try {
        if (display.value === "") return;

        let expression = String(display.value).trim();

        // REMOVE leading zeros safely
        expression = expression.replace(/\s+/g, "");
        expression = removeLeadingZeros(expression);

        let result = Function("return " + expression)();
        result = parseFloat(result.toFixed(10));
        
        display.value = result.toString();

        // add to history
        addToHistory(expression, result);

    } catch {
        display.value = "Error";
    }
}

function addToHistory(expression, result) {
    history.unshift(`${expression} = ${result}`);

    if (history.length > 10) {
        history.pop();
    }

    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = "";

    history.forEach(item => {
        const div = document.createElement("div");
        div.className = "history-item";
        div.textContent = item;
        historyList.appendChild(div);
    });
}

// Clear history
function clearHistory() {
    history = [];
    renderHistory();
}

// 🌗 Theme toggle
function toggleTheme() {
    document.body.classList.toggle("light-mode");
}

// keyboard support
document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (!isNaN(key) || "+-*/.".includes(key)) {
        appendValue(key);
    } 
    else if (key === "Enter") {
    event.preventDefault();
    calculate();
    }
    else if (key === "Backspace") {
        deleteLast();
    } 
    else if (key === "Escape") {
        clearDisplay();
    }
});

const messages = [
    "I Love You Yesha! - Jinjo ❤️",
    "Don't forget to drink water!",
    "I'm proud of you baby!",
    "My Strongest Pillar 🏛️",
    "You and Me against the world",
    "Keep fighting, My Love",
];

const messageBox = document.getElementById("miniMessage");

function randomMessage() {
    const index = Math.floor(Math.random() * messages.length);
    messageBox.textContent = messages[index];
}

// run on load
randomMessage();

setInterval(randomMessage, 5000);
