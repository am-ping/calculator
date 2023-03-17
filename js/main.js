let current = document.querySelector(".current")
let previous = document.querySelector(".previous")

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        window.navigator.vibrate(25)
        let action = button.dataset.action
        let operators = button.dataset.operator
        let buttonContent = button.textContent
        let curDisplay = current.textContent
        let preDisplay = previous.textContent

        let operator = sessionStorage.getItem(button)

        // if it's a number
        if (!operators && !action) {
            if (curDisplay.includes('.') && buttonContent === '.') {
                current.textContent += ''
            } else {
                if (current.textContent.includes('Undefined')) {
                    current.textContent = buttonContent
                } else {
                    current.textContent += buttonContent
                }
            }
        // if it's an operator
        } else if (operators) {
            previous.textContent = curDisplay
            current.textContent = ""
            sessionStorage.setItem(button, buttonContent)
        }

        // operate() when both displays have values and action key isn't equal or delete
        if (preDisplay !== "" && curDisplay !== "" && (operators) ) {
            previous.textContent = operate()
            current.textContent = ''
        }
        
        // operate() when both displays have values and action key is equal
        if (preDisplay !== "" && curDisplay !== "" && action === 'equal') {
            previous.textContent = ""
            current.textContent = operate()
        }

        function operate(n1, n2) {

            n1 = +preDisplay
            n2 = +curDisplay
            let result

            if (operator ==='/') result = n1 / n2   //divide
            if (operator === '*') result = n1 * n2  //multiply
            if (operator === '+') result = n1 + n2  //add
            if (operator === '-') result = n1 - n2  //subtract

            return result == 'Infinity' ? 'Undefined' : Math.round(+result * 1000) / 1000
        }

        if (action === 'clear') {
            document.querySelectorAll("div").forEach(p => p.textContent = "")
        }
        
        if (action === 'delete') {
            current.textContent = curDisplay.slice(0,-1)
        }
    })
})