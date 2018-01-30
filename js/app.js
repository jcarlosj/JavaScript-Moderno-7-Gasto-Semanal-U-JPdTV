/* Gasto Semanal */
const presupuestoUsuario = prompt( 'Cual es tu presupuesto semanal?' );
let presupuesto;

console .log( presupuestoUsuario );

/* El Evento 'DOMContentLoaded' Escucha cuando la página está completamente cargada */
document .addEventListener( 'DOMContentLoaded', function() {
    if( presupuestoUsuario === null || presupuestoUsuario === '' ) {
        window .location .reload();     // Recarga la ventana actual
    }
    else {
        // Instancia del Presupuesto
        presupuesto = new Presupuesto( presupuestoUsuario );
        console .log( 'Presupuesto', presupuesto );
    }
});

/* Clase Presupuesto */
class Presupuesto {
    constructor( presupuesto ) {
        this .presupuesto = Number( presupuesto );
        this .restante = Number( presupuesto );
    }
    /* Prototypes (o Método) */
    restante( cantidad = 0 ) {
        return this .restante -= Number( cantidad );
    }
}