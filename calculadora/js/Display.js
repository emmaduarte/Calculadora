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
        /*if(tipo === 'igual') this.calcular()*/
        this.tipoOperacion !== 'igual' && this.calcular()
        if(this.valorActual !== '' && tipo === 'raiz') swal('Datos Incorrecto', 'Ingresa una operacion valida', 'error')
        if(this.valorActual !== '' && tipo === 'logaritmo') swal('Datos Incorrecto', 'Ingresa una operacion valida', 'error')
        if(this.valorActual === '' && tipo === 'potencia') swal('Datos Incorrecto', 'Ingresa una base para la potencia', 'error')
        this.tipoOperacion = tipo
        this.valorAnterior = this.valorActual || this.valorAnterior
        this.valorActual = ''
        this.imprimirValores()
    }

    agregarNumero(numero){
        if(numero === '.' && this.valorActual.includes('.')) return
        if(numero === 'π') {
            this.valorActual = this.calculador.valorpi().toString()
            this.imprimirValores()
            return
        }
        if(numero === '(-)') {
            this.valorActual = '-' + this.valorActual.toString()
            this.imprimirValores()
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
        const valorAnterior = parseFloat(this.valorAnterior)
        const valorActual = parseFloat(this.valorActual)
        
        

        if(this.tipoOperacion === 'raiz') {
            const r = this.calculador.raiz(parseFloat(this.valorActual))
            if( isNaN(r)) swal('Operacion Incorrecto', 'Ingresa otra operacion', 'error') 
            if (r % 1 == 0) {
                this.valorActual = r
                return
            } else {
                this.valorActual = r.toFixed(2)
                return
            }
        }
        if(this.tipoOperacion === 'logaritmo') {
            const l = this.calculador.logaritmo(parseFloat(this.valorActual))
            if (l % 1 == 0) {
                this.valorActual = l
                return
            } else {
                this.valorActual = l.toFixed(2)
                return
            }
        }
        
        if( isNaN(valorActual) || isNaN(valorAnterior)) return 

        
        const num3 = this.calculador[this.tipoOperacion](valorAnterior, valorActual)
        if (num3 % 1 == 0) {
            this.valorActual = num3
            return
        } else {
            this.valorActual = num3.toFixed(2)
            return
        }

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
        if (k==32 || k==13) {this.computar('igual')} //Tecla igual: intro o barra espaciadora
        if (k==46) {this.borrarTodo()} //Tecla borrado total: "supr"
        if (k==8) {this.borrar()} //Retroceso en escritura : tecla retroceso.
        if (k>64 && k<91){
            swal('Ingreso Incorrecto', 'Ingresa un numero u operando', 'error')
        }
        }
}