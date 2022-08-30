class Calculadora {
    sumar(num1, num2){
        return (num1 + num2)
    }

    restar(num1, num2){
        return (num1 - num2)
    }

    multiplicar(num1, num2){
        return (num1 * num2)
    }

    dividir(num1, num2){
        return (num1 / num2)
    }

    potencia(num1, num2){
        return Math.pow(num1, num2)
    }

    raiz(num1){
        return Math.sqrt(num1)
    }

    valorpi(){
        return Math.PI.toFixed(2)
    }

    logaritmo(num1){
        return Math.log(num1)
    }
}