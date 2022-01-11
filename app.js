class Calculator {
    constructor(previousOperandTexElement,currentOperandTextElement) {
        this.previousOperandTexElement = previousOperandTexElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.previousOperand = ``
        this.currentOperand = ``
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
        
    }

    appendNumber(number){
        if (number === "." &&this.currentOperand.includes("."))   return 
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return 
        if(this.previousOperand !== '') {
            calculator.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break  
            default: 
                return 
        }
        this.currentOperand = computation
        this.operation= undefined
        this.previousOperand = ``
    }

    getDisplayNumber(number){
        debugger;
        const stringNumber = number.toString()
        const IntegerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay 
        if (isNaN(IntegerDigits)){
            integerDisplay = ''
        }else{
        integerDisplay = IntegerDigits.toLocaleString('en', {maximumFractionDigits:0})}

        if (decimalDigits != undefined){
            return parseFloat(`${integerDisplay}.${decimalDigits}`)
        } else {
        return integerDisplay
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerHTML = this.getDisplayNumber(this.currentOperand)
        if(this.operation !== undefined){
            this.previousOperandTexElement.innerHTML = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else{
            this.previousOperandTexElement.innerHTML = this.previousOperand
        }

        
    }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const allclearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalsButton = document.querySelector("[data-equals]");
const previousOperandTexElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousOperandTexElement,currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener("click",  () => {
        calculator.appendNumber(button.innerHTML);
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click",  () => {
        calculator.chooseOperation(button.innerHTML);
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

allclearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})







