class Calculadora {
  constructor(operadorPrevioTextElement, operadorActualTextElement) {
    this.operadorPrevioTextElement = operadorPrevioTextElement;
    this.operadorActualTextElement = operadorActualTextElement;
    this.clear();
  }


  clear() {
    this.operadorActual = '';
    this.operadorPrevio = '';
    this.operacion = undefined;
  }

  delete() {
    this.operadorActual = this.operadorActual.toString().slice(0, -1);
  }

  addNum(number) {
    if (number === '.' && this.operadorActual.includes('.')) return
    this.operadorActual = this.operadorActual.toString() + number.toString();
  }

  elegirOperacion(operacion) {
    if (this.operadorActual === '') return
    if (this.operadorPrevio !== '') {
      this.compute();
    }
    this.operacion = operacion;
    this.operadorPrevio = this.operadorActual;
    this.operadorActual = '';
  }

  calculo() {
    let calcular;
    const previo = parseFloat(this.operadorPrevio);
    const actual = parseFloat(this.operadorActual);
    if (isNaN(previo) || isNaN(actual)) return;
    switch (this.operacion) {
      case '+':
        calcular = previo + actual;
        break;
      case '-':
        calcular = previo - actual;
        break;
      case '*':
        calcular = previo * actual;
        break;
      case '÷':
        calcular = previo / actual;
        break;
      default:
        return;
    }
    this.operadorActual = calcular;
    this.operacion = undefined;
    this.operadorPrevio = '';
  }

  numPantalla(numero) {
    const numString = numero.toString();
    const numEntero = parseFloat(numString.split('.')[0]);
    const numDecimal = numString.split('.')[1];
    let numEnteroPantalla;
    if (isNaN(numEntero)) {
      numEnteroPantalla = '';
    } else {
      numEnteroPantalla = numEntero.toLocaleString('en', {
        maximumFractionDigits: 0
      })
    }
    if (numDecimal != null) {
      return `${numEnteroPantalla}.${numDecimal}`;
    } else {
      return numEnteroPantalla;
    }
  }

  refreshPantalla() {
    this.operadorActualTextElement.innerText = this.numPantalla(this.operadorActual);
    if (this.operacion != null) {
      this.operadorPrevioTextElement.innerText = `${this.numPantalla(this.operadorPrevio)} ${this.operacion}`;
    } else {
      this.operadorPrevioTextElement.innerText = '';
    }
  }
}




const botonNum = document.querySelectorAll('[data-numero]');
const botonOpe = document.querySelectorAll('[data-operacion]');
const botonIgual = document.querySelector('[data-igual]');
const botonDel = document.querySelector('[data-delete]');
const botonAc = document.querySelector('[data-clear]');
const operadorPrevioTextElement = document.querySelector('[data-operador-previo]');
const operadorActualTextElement = document.querySelector('[data-operador-actual]');


const newCalculadora = new Calculadora(operadorPrevioTextElement, operadorActualTextElement);

botonNum.forEach(button => {
  button.addEventListener('click', ()=>{
    newCalculadora.addNum(button.innerText);
    newCalculadora.refreshPantalla();
  })
})

botonOpe.forEach(button => {
  button.addEventListener('click', ()=>{
    newCalculadora.elegirOperacion(button.innerText);
    newCalculadora.refreshPantalla();
  })
})

botonIgual.addEventListener('click', button=> {
  newCalculadora.calculo();
  newCalculadora.refreshPantalla();
})

botonDel.addEventListener('click', button=> {
  newCalculadora.delete();
  newCalculadora.refreshPantalla();
})

botonAc.addEventListener('click', button=> {
  newCalculadora.clear();
  newCalculadora.refreshPantalla();
})
