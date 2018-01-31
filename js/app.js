/* Gasto Semanal */
const presupuestoUsuario = prompt( 'Cual es tu presupuesto semanal?' ),
      formulario = document .getElementById( 'agregar-gasto' );             // Obtiene el elemento FORM del formulario
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
/* El Evento 'submit' escucha cuando se da click sobre el Botón 'Agregar' del Formulario */
formulario .addEventListener( 'submit', function( e ) {
    const gasto = document .getElementById( 'gasto' ) .value,           // Obtiene el valor del elemento 'input' gasto
          cantidad = document .getElementById( 'cantidad' ) .value;     // Obtiene el valor del elemento 'input' cantidad

    e .preventDefault();            // Previene o Detiene el 'action' del formulario

    // Instancia Interfaz
    const ui = new Interfaz();                              // Instancia de Interfaz

    // Valida que los campos no estén vacíos
    if( gasto === '' || cantidad === '' ) {
        console .log( 'ERROR', 'Uno o más campos están vacíos' );

        ui .imprimirMensaje( 'error', 'Uno o más campos están vacíos' );
    }
    else {
        // Insertar el gasto al DOM
        ui .imprimirMensaje( 'correcto', 'Correcto! Gasto agregado' );
        ui .agregarGastoListado( gasto, cantidad );
        ui .presupuestoRestante( cantidad );
    }
});

/* Clase Presupuesto */
class Presupuesto {
    constructor( cantidad ) {
        this .cantidad = Number( cantidad );
        this .restante = Number( cantidad );
    }
    /* Prototypes (o Método) */
    presupuestoRestante( cantidad = 0 ) {
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
    imprimirMensaje( tipo, mensaje ) {
        const div = document .createElement( 'div' );       // Crea un elemento 'div'
        div .classList .add( 'text-center', 'alert' );      // Se agregan dos clases (Bootstrap) al elemento
        
        if( tipo === 'error' ) {
            div .classList .add( 'alert-danger' );          // Se agregan una clase (Bootstrap) al elemento cuando se genera un mensaje de ERROR
        }
        else {
            div .classList .add( 'alert-success' );         // Se agregan una clase (Bootstrap) al elemento cuando se genera un mensaje de ÉXITO
        }

        div .appendChild( document .createTextNode( mensaje ) );                    // Agrega el mensaje al elemento 'div'
        document .querySelector( '.primario' ) .insertBefore( div, formulario );    // Inserta el elemento 'div' en el DOM (Alerta ERROR)

        setTimeout( function() {
            document .querySelector( '.primario .alert' ) .remove();   // Elimina el el elemento 'div' en el DOM (Alerta ERROR)
            formulario .reset();                                        // Limpia los campos del formulario
        }, 3000 );
    }
    agregarGastoListado( gasto, cantidad ) {
        const gastoListado = document .querySelector( '#gastos ul' ),       // Obtiene el elemento 'ul' donde se imprimiran los gastos
              li = document .createElement( 'li' );                         // Crea un elemento 'li'

        li .className = 'list-group-item d-flex justify-content-between align-items-center';    // Agrega clases (Bootstrap) al elemento
        // Inserta los datos del Gasto en el elemento
        li .innerHTML = `
            ${ gasto }
            <span class="badge badge-primary badge-pill">$ ${ cantidad }</span>
        `;
        gastoListado .appendChild( li );    // Inserta el elemento en el DOM
    }
    presupuestoRestante( cantidad ) {
        const restante = document .querySelector( 'span#restante' ),                 // Obtiene el elemento que vamos a actualizar
              presupuestoRestante = presupuesto .presupuestoRestante( cantidad );   // Calcula el presupuesto restante

        restante .innerHTML = `${ presupuestoRestante }`;   // Actualiza los datos del elemento 'restante' en el DOM

        this .comprobarPresupuesto();

    }
    comprobarPresupuesto() {
        const restante = document .querySelector( '.restante' ),
              presupuestoTotal = presupuesto .cantidad, 
              presupuestoRestante = presupuesto .restante;
        
        if( ( presupuestoTotal / 4 ) > presupuestoRestante ) { // Comprobar el 25% del gasto
            restante .classList .remove( 'alert-sucesss', 'alert-warning' );
            restante .classList .add( 'alert-danger' );
        }      
        else if( ( presupuestoTotal / 2 ) > presupuestoRestante ) { // Comprobar el 50% del gasto
            restante .classList .remove( 'alert-sucesss' );
            restante .classList .add( 'alert-warning' );
        }
    }
}