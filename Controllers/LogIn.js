import { doc, getDoc, db,setDoc} from '../Models/ScriptsDB.js';

//Variables
const Cadmin1="admin1@correo.com";
const Cadmin2="admin2@correo.com";
const Cadmin3="admin3@correo.com";
let input_correo = document.getElementById('email');
let input_password = document.getElementById('password');
let input_nombre = document.getElementById('firstname');
let input_apellido = document.getElementById('lastname');
let input_celular = document.getElementById('celular');


//Eventos
$("#signup").click(function() {
    $("#first").fadeOut("fast", function() {
    $("#second").fadeIn("fast");
    });
});
    
$("#signin").click(function() {
    $("#second").fadeOut("fast", function() {
        $("#first").fadeIn("fast");
    });
});

$("#ini").click(function() {
    location.replace('../index.html');
});

//Funciones
$(function() {
    $("form[name='login']").validate({
        rules: {
        
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            
        }
        },
        messages: {
        email: "Please enter a valid email address",
        
        password: {
            required: "Please enter password",
        
        }
        
        },
        submitHandler: function(form) {
            iniciarSesionAdmin();
        }
    });
});
            


$(function() {
    
    $("form[name='registration']").validate({
    rules: {
        firstname: "required",
        lastname: "required",
        celular: "required",
        email: {
        required: true,
        email: true
        },
        password: {
        required: true,
        minlength: 8
        }
    },
    
    messages: {
        firstname: "Please enter your firstname",
        lastname: "Please enter your lastname",
        celular: "please enter your number",
        password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long"
        },
        email: "Please enter a valid email address"
    },
    
    submitHandler: function(form) {
        validarNuevo();
    }
    });
});
    
async function iniciarSesionAdmin(){
    if(input_correo.value == Cadmin1 || input_correo.value == Cadmin2 || input_correo.value == Cadmin3){
        var ref = doc(db, "admin", input_correo.value);
        const docSnap = await getDoc(ref);
        if(docSnap.data().password == input_password.value){
            sessionStorage.setItem("usuario",docSnap.data().correo);
            location.replace('../Views/admin.html');
        } else {
            Swal.fire("Error","Contraseña incorrecta","error");
        }  
    }else{
        iniciarSesionUser();
    }
}

async function iniciarSesionUser(){
    const correo = input_correo.value;
    const password = input_password.value;
    var ref = doc(db, "user", correo);
    const docSnap = await getDoc(ref);
      if (docSnap.exists() == false){
        Swal.fire('Error!','Usuario no encontrado','error');
      }else{
        if(docSnap.data().password == password){
            if(docSnap.data().state == 'activo'){
                sessionStorage.setItem("usuario", docSnap.data().correo);
                location.replace('../index.html');
            }else{
                Swal.fire("Error","Usuario Desactivado","error");
            }
        }else{
          Swal.fire("Error","Contraseña incorrecta","error");
        }
      }
}


async function Registro(){ // email
	const correo = input_correo.value;
	const contra = input_password.value;
	var ref = doc(db, "user", correo);
    const docRef = setDoc(
        ref, {
            correo: input_correo.value,
            nombre: input_nombre.value,
            apellido: input_apellido.value,
            password: input_password.value,
            celular: input_celular.value,
            state: 'activo'
        }
    )
    .then(()=>{
        Swal.fire("Atención","Usuario creado","success");
        sessionStorage.setItem('usuario',correo);
        window.location.replace('../Index.html')
    })
    .catch((error)=>{
        new Swal('Error!', error, 'error');
    });
}
async function validarNuevo(){
	var ref = doc(db, "user", input_correo.value);
	const docSnap = await getDoc(ref);
	if (docSnap.exists()){
		Swal.fire("Atención","Ya esxiste una cuenta asociada a éste correo","error");
	} else {
		Registro();
	}
}