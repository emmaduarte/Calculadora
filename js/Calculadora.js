class Calculadora {
    sumar(num1, num2){
        return (num1 + num2).toFixed(3)
    }

    restar(num1, num2){
        return (num1 - num2).toFixed(3)
    }

    multiplicar(num1, num2){
        return (num1 * num2).toFixed(3)
    }

    dividir(num1, num2){
        return (num1 / num2).toFixed(3)
    }

    potencia(num1, num2){
        return Math.pow(num1, num2).toFixed(3)
    }

    raiz(num1){
        return Math.sqrt(num1).toFixed(3)
    }

    valorpi(){
        return Math.PI.toFixed(3)
    }

    logaritmo(num1){
        return Math.log(num1).toFixed(3)
    }
}