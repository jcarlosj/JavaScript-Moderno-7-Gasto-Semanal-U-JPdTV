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
        presupuesto = new Presupuesto( presupuestoUsuario );    // Instancia del Presupuesto
        const ui = new Interfaz();                              // Instancia de Interfaz

        ui .insertarPresupuesto( presupuesto .cantidad );
    }
});

/* Clase Presupuesto */
class Presupuesto {
    constructor( cantidad ) {
        this .cantidad = Number( cantidad );
        this .restante = Number( cantidad );
    }
    /* Prototypes (o Método) */
    restante( cantidad = 0 ) {
        return this .restante -= Number( cantidad );
    }
}
/* Clase Interfaz */
class Interfaz {
    insertarPresupuesto( cantidad ) {
        const presupuestoTotal = document .querySelector( 'span#total' ),
              restanteTotal    = document .querySelector( 'span#restante' );

        // Insertar al DOM
        presupuestoTotal .innerHTML = `${ cantidad }`;
        restanteTotal .innerHTML = `${ cantidad }`;
        
    }
}