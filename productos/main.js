//Constructor
class User {
  //DATOS CLIENTES
  constructor(dni, nombre, apellido, compra, datosTarjeta) {
    this.dni = parseInt(dni);
    this.nombre = nombre;
    this.apellido = apellido;
    this.compra = compra;
    this.datosTarjeta = datosTarjeta;
  }
}

class datosTarjeta {
  constructor(
    nombre,
    apellido,
    dni,
    email,
    telefono,
    tipoTarjeta,
    numTarjeta,
    vencimiento,
    codSeguridad
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.email = email;
    this.telefono = telefono;
    this.tipoTarjeta = tipoTarjeta;
    this.numTarjeta = numTarjeta;
    this.vencimiento = vencimiento;
    this.codSeguridad = codSeguridad;
  }
}

// ARRAY
const productosJSON = "productos.json";
const cart = [];

//CARRITO
function displayCart() {
  $(`#cartDiv`).on(`click`, function () {
    $(`#buySection`).fadeIn(500);
  });
}

function closeCart() {
  $(`#cierre`).on(`click`, function () {
    $(`#buySection`).fadeOut(500);
  });
}

//EDICION DOM
function crearCatalogo() {
  // genera catalogo HTML
  let click = 0;

  $.getJSON(productosJSON, function (respuesta, estado) {
    //se trae el array en json de productos para luego crear el DOM
    if (estado === "success") {
      let productos = respuesta;
      for (const info of productos) {
        for (const producto of info.productos) {
          $(`.catalogo`).append(` <div class="caja-de-producto">
          <h3 class="titulo-tarjeta">ORGANIZADOR ${producto.nombre}</h3>
          <div class="muestrario" id="caja-${producto.nombre}">
          <img class="foto-producto"
          src="../Multimedia/Emprendimiento/Organizador ${producto.nombre}/${producto.nombre}1.jpg"
          alt="Foto del producto ${producto.nombre}"/>
          </div>
          <div class="texto-producto"><p>$${producto.precio}</p></div>
          <button class="boton" id="boton-${producto.nombre}">Agregar al carrito</button>
          </div>`);

          //Interacción con DOM
          interactuarBotones(producto, click);
        }
      }
    }
  });
}

function interactuarBotones(producto, click) {
  //Seleccion de catalogo
  $(`#boton-${producto.nombre}`).on(`click`, function () {
    //se elige producto, se hace el push al carro y se imprime en forma de lista
    click++;
    cart.push(producto);
    $(`#list`).append(
      `<tr class="buyListObject object${producto.nombre}"> 
      <th>Organizador ${producto.nombre}</th> 
      <th>$${producto.precio}</th> 
      <th><button class="delete${producto.nombre} boton-borrar">X</button></th> 
      </tr>`
    );

    if (click == 1) {
      //si se hace un click en un botón se imprime una linea con el total
      $(`#total`).append(
        `<th class="buyListTotal">El costo total es de: ${sumarTotal()}`
      );
      total = sumarTotal();
    } else {
      //si se vuelve a hacer click, se modifica la linea del total
      $(`#total`).ready(function () {
        $(`.buyListTotal`)
          .empty()
          .append(`El costo total es de: ${sumarTotal()}`);
      });
    }

    messageAdd(click);
    borrarDelCarro(producto);
    cantidadCart();
  });
}

function borrarDelCarro(producto) {
  $(`.delete${producto.nombre}`).on(`click`, function () {
    alert("click");
    let organizador = cart.find((x) => x.id === producto.id);
    let indexProducto = cart.indexOf(organizador);
    cart.splice(indexProducto, 1);
    $(`.object${producto.nombre}`).remove();
    $(`#total`).ready(function () {
      $(`.buyListTotal`)
        .empty()
        .append(`El costo total es de: ${sumarTotal()}`);
    });
    cantidadCart();
  });
}

function messageAdd(click) {
  //Mensaje de producto agregado al carro
  if (click <= 1) {
    $(`main`).append(`<div class="mensajeCompra"></div>`);
    $(`.mensajeCompra`).append(
      `<p id="compraNro${click}">Se ha agregado un producto al carrito</p>`
    );
    $(`#compraNro${click}`)
      .hide()
      .slideDown(`3500`, function () {
        $(`#compraNro${click}`)
          .delay(1500)
          .slideUp(`3500`, function () {
            $(`#compraNro${click}`).remove();
          });
      });
  } else {
    $(`.mensajeCompra`).append(
      `<p id="compraNro${click}">Se ha agregado otro producto al carrito</p>`
    );
    $(`#compraNro${click}`)
      .hide()
      .slideDown(`3500`, function () {
        $(`#compraNro${click}`)
          .delay(1500)
          .slideUp(`3500`, function () {
            $(`#compraNro${click}`).remove();
          });
      });
  }
}

function cantidadCart() {
  //sumar objetos al carrito

  $(`#cartNumber`).append(
    `Cantidad de productos en el carrito: ${cart.length}`
  );
  if (cart.length == 1) {
    $(`#cartNumber`)
      .empty()
      .append(`Cantidad de productos en el carrito: ${cart.length}`)
      .addClass(`colorCantidad`);
  } else {
    $(`#cartNumber`)
      .empty()
      .append(`Cantidad de productos en el carrito: ${cart.length}`);
  }
}

function sumarTotal() {
  //sumar precios
  let total = 0;
  for (producto of cart) {
    total += producto.precio;
  }
  return total;
}

//bonton continuar compra
function continuarCompra() {
  let i = 0;
  $(`#continuar-compra`).on(`click`, function () {
    i++;

    if (cart.length == 0) {
      //se verifica si hay productos en el carro
      alert(
        "No se han detectado productos en el carro, por favor seleccione uno"
      );
    } else {
      displayPagos(i);
    }
  });
}

//Ingreso de datos para compra
function displayPagos(i) {
  $(`#pagosSection`).fadeIn(500);
}

function closePagos() {
  $(`.cierre`).on(`click`, function () {
    $(`#pagosSection`).fadeOut(500);
  });
}

function numbers(e) {
  if (window.event) {
    keyNum = e.keyCode;
  } else {
    keyNum = e.which;
  }

  if ((keyNum > 47 && keyNum < 58) || keyNum == 8 || keyNum == 13) {
    return true;
  } else {
    return false;
  }
}

function numbersBar(e) {
  if (window.event) {
    keyNum = e.keyCode;
  } else {
    keyNum = e.which;
  }

  if ((keyNum > 46 && keyNum < 58) || keyNum == 8 || keyNum == 13) {
    return true;
  } else {
    return false;
  }
}

function confirmarCompra() {
  $(`#submitForm`).on(`click`, function (e) {
    e.preventDefault();
    let dniInput = parseInt($("#dni").val());
    let nombreInput = $("#apellido").val();
    let ApellidoInput = $("#nombre").val();
    let emailInput = $("#email").val();
    let telefonoInput = $("#tel").val();
    let tipoTarjetaInput = $(".tarjeta").val();
    let numTarjetaInput = parseInt($("#numTarjeta").val());
    let vencimientoInput = $("#vencimiento").val();
    let codSeguridadInput = parseInt($("#codSeguridad").val());

    let titularTarjeta = new datosTarjeta(
      nombreInput,
      ApellidoInput,
      dniInput,
      emailInput,
      telefonoInput,
      tipoTarjetaInput,
      numTarjetaInput,
      vencimientoInput,
      codSeguridadInput
    );

    confirmacionFinal(
      dniInput,
      nombreInput,
      ApellidoInput,
      cart,
      titularTarjeta
    );
  });
}

function confirmacionFinal(
  dniInput,
  nombreInput,
  ApellidoInput,
  cart,
  datosTarjeta
) {
  let confirmacion = confirm("¿Desea confirmar esta compra?");
  if (confirmacion == true) {
    let usuario = new User(
      dniInput,
      nombreInput,
      ApellidoInput,
      cart,
      datosTarjeta
    );
    localStorage.setItem(`Usuario`, JSON.stringify(usuario));
    localStorage.setItem(`compraUsuario`, JSON.stringify(cart));
    cart.length = 0;
    cierreCompra(datosTarjeta);
  }
}

function cierreCompra(datosTarjeta) {
  $(`#pagosSection`).fadeOut(500);
  $(`#cart`)
    .empty()
    .append(`<h1 class="titles">Muchas gracias por su compra</h1>`);
}

// anidacion
function app() {
  //Funciones carro
  displayCart();
  closeCart();

  //Funcion catalogo
  crearCatalogo();

  //Pagos
  closePagos();
  continuarCompra();
  confirmarCompra();
}

//app
app();
