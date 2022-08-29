class Display {
    constructor(displayValorAnterior, displayValorActual){
        this.displayValorActual = displayValorActual
        this.displayValorAnterior = displayValorAnterior
        this.calculador = new Calculadora()
        this.tipoOperacion = undefined
        this.valorActual = ''
        this.valorAnterior = ''
        this.signos = {
            sumar: '+',
            restar: '-',
            multiplicar: '*',
            dividir: '/',
            potencia: '^',
            raiz: '√',
            logaritmo:'log'
        }
    }

    borrar(){
        this.valorActual = this.valorActual.toString().slice(0, -1)
        this.imprimirValores()
    }

    borrarTodo(){
        this.valorActual = ''
        this.valorAnterior = ''
        this.tipoOperacion = undefined
        this.imprimirValores()
    }
    
    computar(tipo){
        this.tipoOperacion !== 'igual' && this.calcular()
        this.tipoOperacion = tipo
        this.valorAnterior = this.valorActual || this.valorAnterior
        this.valorActual = ''
        this.imprimirValores()
    }

    agregarNumero(numero){
        if(numero === '.' && this.valorActual.includes('.')) return
        if(numero === 'π') {
            this.valorActual = this.calculador.valorpi().toString()
            return
        }
        this.valorActual = this.valorActual.toString() + numero.toString()
        this.imprimirValores()
    }

    imprimirValores(){
        this.displayValorActual.textContent = this.valorActual
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`
    }

    calcular(){
        //no funciona la raiz ni el log y problemas con los decimales
        if(this.valorAnterior === '√') {
            this.valorActual = this.calculador.raiz(parseFloat(this.valorActual))
            return
        }
        if(this.valorAnterior === 'log') {
            this.valorActual = this.calculador.logaritmo(parseFloat(this.valorActual))
            return
        }
        const valorAnterior = parseFloat(this.valorAnterior)
        const valorActual = parseFloat(this.valorActual)

        if( isNaN(valorActual) || isNaN(valorAnterior)) return
        this.valorActual = this.calculador[this.tipoOperacion](valorAnterior, valorActual)
    }


    teclado (elEvento) { 
        var evento = elEvento;
        var k=evento.keyCode; //número de código de la tecla.
        //teclas númericas del teclado alfamunérico
        if (k>47 && k<58) { 
           var p=k-48; //buscar número a mostrar.
           p=String(p) //convertir a cadena para poder añádir en pantalla.
           this.agregarNumero(p); //enviar para mostrar en pantalla
           }	
        //Teclas del teclado númerico. Seguimos el mismo procedimiento que en el anterior.
        if (k>95 && k<106) {
           p=k-96;
           p=String(p);
           this.agregarNumero(p);
           }
        if (k==110 || k==190) {this.agregarNumero(".")} //teclas de coma decimal
        if (k==106) {this.computar('multiplicar')} //tecla multiplicación
        if (k==107) {this.computar('sumar')} //tecla suma
        if (k==109) {this.computar('restar')} //tecla resta
        if (k==111) {this.computar('dividir')} //tecla división
        if (k==32 || k==13) {this.computar()} //Tecla igual: intro o barra espaciadora
        if (k==46) {this.borrarTodo()} //Tecla borrado total: "supr"
        if (k==8) {this.borrar()} //Retroceso en escritura : tecla retroceso.
        if (k>64 && k<91){
            swal('Ingreso Incorrecto', 'Ingresa un numero u operando', 'error')
        }
        }
}