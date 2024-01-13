document.addEventListener('DOMContentLoaded', () => {

  const input = document.querySelector('.input');
  const output = document.querySelector('.output');
  const buttons = document.querySelectorAll('.calculator-container button');

  let prevExp = '';
  let currExp = '';

  buttons.forEach((button) => {
    button.addEventListener('click', buttonClickHandler);
  });

  function buttonClickHandler() {
    const clickedButton = this.innerText;
    switch(clickedButton) {
      case 'DEL':
        currExp = currExp.slice(0, -1);
        break;
      case 'AC':
        prevExp = '';
        currExp = '';
        break;
      case '=':
        calculate();
        break;
      default:
        if (/[\+\-\*\÷]/.test(clickedButton) && /[\+\-\*\÷]$/.test(currExp)) {
          currExp = currExp.slice(0, -1) + clickedButton;
        } else {
          currExp += clickedButton;
        }
        break;
    }
    updateDisplay();
  }

  function calculate() {
    try {
      const modifiedcurrExp = currExp.replace(/÷/g, '/');
      const result = math.evaluate(modifiedcurrExp);
      prevExp = currExp;
      currExp = Number.isInteger(result) ? result.toString() : result.toFixed(2);
    } catch (error) {
      currExp = 'Error';
    }
  }
  

  function updateDisplay() {
    input.textContent = prevExp;
    output.textContent = currExp;
  }


});