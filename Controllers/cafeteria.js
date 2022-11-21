import {rdb,ref2 , onValue, ref,getDownloadURL, storage} from '../Models/ScriptsDB.js'

//Variables 
const dbp = sessionStorage.getItem("tienda");
console.log(dbp)
const starCountRef = ref2(rdb, dbp);
var lista_productos=[];
var cont=0

//Element HTML
let body_tabla = document.getElementById('grilla');

//eventos
onValue(starCountRef, (snapshot) => {
    snapshot.forEach((doc) => {
        cont++;
        lista_productos[cont]=doc.val()
    });
    cargarProductos(lista_productos)
});

//Funciones
function cargarProductos(datos){
    $('#empty').hide();
    console.log(datos);
    for (let i = 1; i < datos.length; i++) {
        let div1 = document.createElement("div");
        let div2 = document.createElement("div");
        let div3 = document.createElement("div");
        let div4 = document.createElement("div");
        let div5 = document.createElement("div");
        let imagen = document.createElement("img");
        let h2 = document.createElement("h2");
        let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        let a1 = document.createElement("a");
        let a2 = document.createElement("a");
        let texto1 = document.createTextNode("Nombre: "+datos[i].nombre);
        let texto2 = document.createTextNode("Costo: "+datos[i].valor+"$");
        let texto3 = document.createTextNode("Stock: "+datos[i].cantidad);

        div1.setAttribute('class','col-md-3 top_box');
        div2.setAttribute('class','view view-ninth');
        div3.setAttribute('class','mask mask-1');
        div4.setAttribute('class','mask mask-2');
        div5.setAttribute('class','content');
        imagen.setAttribute('id',datos[i].nombre);
        imagen.setAttribute('class','img-responsive');
        imagen.setAttribute('src','../assets/images/fprojects/2.jpg');
        a1.setAttribute('href','#');
        a2.setAttribute('href','#');

        h2.appendChild(texto1);
        p1.appendChild(texto2);
        p2.appendChild(texto3);
        div5.appendChild(h2);
        div5.appendChild(p1);
        div5.appendChild(p2);
        a1.appendChild(imagen);
        a1.appendChild(div3);
        a1.appendChild(div4);
        a1.appendChild(div5);
        div2.appendChild(a1);
        div1.appendChild(div2);

        body_tabla.appendChild(div1);
        cargarImage(datos[i].nombre);
    }
}


function cargarImage(nombre){
    const storageRe = ref(storage,'imagenes/'+nombre+'.jpg');
    getDownloadURL(storageRe).then(function(url) {
      $('#'+nombre).attr('src', url);
    }).catch(function(error) {
      console.log(error);
    });
  }