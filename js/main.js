let current = document.querySelector(".current")
let previous = document.querySelector(".previous")

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
    
        let action = button.dataset.action
        let buttonContent = button.textContent
        let curDisplay = current.textContent
        let preDisplay = previous.textContent

        let operator = sessionStorage.getItem(button)

        // if it's a number
        if (!action) {
            if (curDisplay.includes('.') && buttonContent === '.') {
                current.textContent += ''
            } else {
                current.textContent += buttonContent
            }
        // if it's an action key that is not delete, equal or clear
        } else if (action !== 'delete' && action !== 'equal' && action !== 'clear') {
            previous.textContent = curDisplay
            current.textContent = ""
            sessionStorage.setItem(button, buttonContent)
        }

        // operate() when both displays have values and action key isn't equal or delete
        if (preDisplay !== "" && curDisplay !== "" && (action == 'add' || action == "subtract" || action === 'divide' || action === 'multiply') ) {
            previous.textContent = operate()
            current.textContent = ''
        }
        
        // operate() when both displays have values and action key is equal
        if (preDisplay !== "" && curDisplay !== "" && action === 'equal') {
            previous.textContent = ""
            current.textContent = operate()
        }

        function operate(n1, n2) {

            n1 = preDisplay
            n2 = curDisplay
            let result

            if (operator ==='/') divide()
            if (operator === '*') multiply()
            if (operator === '+') add()
            if (operator === '-') subtract()

            function divide() {
                return result = +n1 / +n2
            }

            function multiply() {
                return result = +n1 * +n2
            }

            function add() {
                return result = +n1 + +n2
            }

            function subtract() {
                return result = +n1 - +n2
            }
            return +result.toFixed(2)
        }

        if (action === 'clear') {
            document.querySelectorAll("p").forEach(p => p.textContent = "")
        }
        
        if (action === 'delete') {
            current.textContent = curDisplay.slice(0,-1)
        }
    })
})