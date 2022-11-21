import {rdb,ref2 , onValue, set, ref, uploadBytes, storage, remove,getDownloadURL , doc} from '../Models/ScriptsDB.js'

//Variables 
let id_usuario_activo = sessionStorage.getItem("usuario");
let tienda = selccion(id_usuario_activo);
const starCountRef = ref2(rdb, tienda);
// Create an initial document to update.
//const frankDocRef = doc(db, "users", "frank");
var lista_productos=[];
var cont=0

//Element HTML
let body_tabla = document.getElementById('body_table');
let input_nombre =  document.getElementById('input_nombre');
let input_valor =  document.getElementById('input_valor');
let input_cantidad =  document.getElementById('input_cantidad');
let input_id =  document.getElementById('input_ID');
let file_selector = document.getElementById('file-selector');

//eventos
onValue(starCountRef, (snapshot) => {
    snapshot.forEach((doc) => {
        cont++;
        lista_productos[cont]=doc.val()
    });
    cargarProductos(lista_productos)
});

file_selector.addEventListener('change', (e) => {
    if(input_nombre.value == ' '){
        Swal.fire("Importante","Debe agregar un nombre antes de subir una imagen","error");
    }else{
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(){
            $('#imageP').attr('src', reader.result);
        }
        const storageRef = ref(storage, 'imagenes/'+input_nombre.value+".jpg");
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        }).catch(()=>{
            console.log('ERROR');
        });
    }
  })

$('#boton_agregar').click(()=>{
    insertarDatos();
})

$('#cerrar').click(()=>{
    sessionStorage.removeItem("usuario")
    location.replace('../index.html');
})



//funciones
function cargarProductos(datos){
    for (let i = 1; i < datos.length; i++) {
        // Crea las hileras de la tabla
        let row = document.createElement("tr");
    
        for (let j = 0; j < 7; j++) {
          // Crea un elemento <td> y un nodo de texto, haz que el nodo de
          // texto sea el contenido de <td>, ubica el elemento <td> al final
          // de la hilera de la tabla
          let celda = document.createElement("td");
          let celda1 = document.createElement("th");
          let textoCelda = document.createTextNode(datos[i].id);
          let textoCelda1 = document.createTextNode(datos[i].nombre);
          let textoCelda2 =document.createTextNode(datos[i].valor);
          let textoCelda4 = document.createTextNode(datos[i].cantidad);
          let boton_eliminar_producto = document.createElement("b");
          let boton_editar_producto = document.createElement("b");
          
          boton_eliminar_producto.setAttribute('class','boton_eliminar_producto_class btn btn-danger fa fa-trash');
          boton_editar_producto.setAttribute('class','boton_editar_producto_class data-toggle="modal" data-target="#logIN" btn btn-warning fa fa-pencil');
          
          celda1.setAttribute('scope','row');
          if (j == 0){
            celda1.appendChild(textoCelda);
            row.appendChild(celda1);
          }
          if (j == 1){
            celda.appendChild(textoCelda1);
            row.appendChild(celda);
          }
          if (j == 2){
            celda.appendChild(textoCelda2);
            row.appendChild(celda);
          }
          if (j == 3){
            celda.appendChild(textoCelda4);
            row.appendChild(celda);
          }
          
          if (j == 4){
            boton_editar_producto.setAttribute('id', datos[i].id+10)
            boton_editar_producto.setAttribute('name', [datos[i].nombre, datos[i].valor, datos[i].cantidad])
            doc.datos
            celda.appendChild(boton_editar_producto);
            row.appendChild(celda);
          }
          
          if (j == 5){
            
            boton_eliminar_producto.setAttribute('id',datos[i].id)
            celda.appendChild(boton_eliminar_producto);
            row.appendChild(celda);
          }


          let cont = i+1
          row.id = 'fila_'+cont
        }
    
        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        body_tabla.appendChild(row);
        render();
    }
}




function selccion(key){
    switch (key) {
        case 'admin1@correo.com':
            return 'cafeteria1/productos'
        case 'admin2@correo.com':
            return 'cafeteria2/productos'
        case 'admin3@correo.com':
            return 'tiendala/productos'
        default:
            break;
    }
}

function render(){
    document.querySelectorAll('.boton_eliminar_producto_class').forEach(i => {
        i.addEventListener('click',()=>{
            Swal.fire({
            title: 'Eliminar Producto',
            text: "Se eliminara el Producto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Eliminar'
            }).then((result) => {
            if (result.isConfirmed) {
                eliminarDatos(i.id);
            }
            })
        })
    });

    
    // =================================== EDITAR =============================
    document.querySelectorAll('.boton_editar_producto_class').forEach(i => {
        i.addEventListener('click',()=>{
            $("#logIN").modal("show");
            $("#titulomodal").html("Editar producto");
            $("#parrafomodal").html("Seleccione y modifique los datos a actualizar");
            $("#boton_agregar").html("Actualizar");
            let productos = lista_productos[i.id-10]; //OBTENGO EL OBJETO CON EL PRODUCTO SEGUN SU ID

            cargarImage(productos.nombre)//Cargo la imagen de la bd en el file-selector
            document.getElementById("input_ID").value = productos.id;
            document.getElementById("input_nombre").value = productos.nombre;
            document.getElementById("input_valor").value = productos.valor;
            document.getElementById("input_cantidad").value = productos.cantidad;

        })
    });

}

function insertarDatos(){
    set(ref2(rdb, tienda+"/"+input_id.value ),{
        nombre: input_nombre.value,
        valor: Number(input_valor.value),
        cantidad:Number(input_cantidad.value),
        id:Number(input_id.value)
    })
    .then(()=>{
        Swal.fire("Exito","Se agrego el producto","succes");
        location.reload ()
    })
    .catch((e)=>{
        console.log(e);
    })
}

// =============== FUNCION ELIMINAR PRODUCTO =================
function eliminarDatos(id){
    remove(ref2(rdb, tienda+"/"+id))
    .then(()=>{
        Swal.fire("Exito","Se elimino el producto","succes");
        location.reload ()
    })
    .catch((e)=>{
        console.log(e);
    }) 
}
// =============== FUNCION CARGAR IMAGEN =================
function cargarImage(nombre){
    const storageRe = ref(storage,'imagenes/'+nombre+'.jpg');
    getDownloadURL(storageRe).then(function(url) {
      $('#imageP').attr('src', url);
    }).catch(function(error) {
      console.log(error);
    });
  }
