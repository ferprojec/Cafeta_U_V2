import {doc, db,setDoc} from '../Models/ScriptsDB.js'

let nombre = document.getElementById('first_name');
let numero = document.getElementById('phone');
let mensaje = document.getElementById('mensaje');
let tienda = document.getElementById('selec');
let usuario_activo = sessionStorage.getItem("usuario");

//Event
$("#send").click(function() {
    if(validarPal(nombre) && validarPal(numero) && validarPal(mensaje) && validarTienda(tienda)){
		peticion();
	} else Swal.fire("","Faltan algunos datos","info");
});

//Funciones
function validarPal(String){
	if (String.value.length == 0) {
		return false;
	} else {
		if (String.value.length >= 1){
			return true;
		} else {
			return false;
		}
	}
}

function validarTienda(String){
	if (String.value == 'Selccione la Tienda') {
		return false;
	} else {
		return true;
	}
}

async function peticion(){
	var ref = doc(db, "sugerencias", usuario_activo);
    const docRef = setDoc(
        ref, {
            nombre: nombre.value,
            celular: numero.value,
            mensaje: mensaje.value,
            tienda: tienda.value,
            correo: usuario_activo
        }
    )
    .then(()=>{
        Swal.fire("Atención","Sugerencia enviada","success");
        $('#phone').val('');
        $('#first_name').val('');
        $('#mensaje').val('');
    })
    .catch((error)=>{
        new Swal('Error!', error, 'error');
    });
}