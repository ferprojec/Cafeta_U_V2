let id_usuario_activo = sessionStorage.getItem("usuario");
console.log(id_usuario_activo)
$('#cafeteria1').click(function(){
    sessionStorage.setItem("tienda",'cafeteria1/productos');
    location.replace('./Views/Cafeteria.html');
});
$('#cafeteria2').click(function(){
    sessionStorage.setItem("tienda",'cafeteria2/productos');
    location.replace('./Views/Cafeteria.html');
});
$('#tienda_lago').click(function(){
    sessionStorage.setItem("tienda",'tiendala/productos');
    location.replace('./Views/Cafeteria.html');
});

jQuery(document).ready(function ($) {
    if(id_usuario_activo == null){
        $('#usuario').hide();
    }else{
        $("#nombreU").text(id_usuario_activo)
    }
});
