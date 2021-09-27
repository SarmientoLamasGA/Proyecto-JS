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

//Generar usuario
function createUser() {
  $(`#submit-form`).on(`click`, function (e) {
    e.preventDefault();

    let dniUsuario = $(`#dni`).val();
    let nombreUsuario = $(`#nombre`).val();
    let apellidoUsuario = $(`#apellido`).val();

    let usuario = new User(dniUsuario, nombreUsuario, apellidoUsuario);

    saveUser(usuario);
    checkUser();
  });
}

function saveUser(usuario) {
  localStorage.setItem(1, JSON.stringify(usuario));
}

function checkUser() {
  if (usuario == 1) {
    const userLogged = Clientes.find((element) => element === 1);
    alert(userLogged);
    $(`#logIn`).load().empty().append(`${userLogged}`);
  }
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

          //SELECCION
          $(`#boton-${producto.nombre}`).on(`click`, function () {
            //se elige producto, se hace el push al carro y se imprime en forma de lista
            click++; //contador de clicks ver linea 113
            cart.push(producto);
            $(`#list`).prepend(
              `<li class="buyListObject">Organizador ${producto.nombre} $${producto.precio}</li>`
            );
            if (click == 1) {
              //si se hace un click en un botón se imprime un "li" con el total
              $(`#list`).append(
                `<li class="buyListTotal">El costo total es de: ${sumarTotal()}</li>`
              );
              total = sumarTotal();
            } else {
              //si se vuelve a hacer click, se modifica el "li" del total
              $(`#list`).ready(function () {
                $(`.buyListTotal`)
                  .empty()
                  .append(`El costo total es de: ${sumarTotal()}`);
              });
            }
            messageAdd(click);
            cantidadCart();
          });
        }
      }
    }
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
    console.log(total);
  }
  return total;
}

//bonton enviar compra = guardar en storage el array
function saveList() {
  let i = 0;
  $(`#guardar-compra`).on(`click`, function () {
    i++;
    const savedList = JSON.stringify(cart);
    localStorage.setItem("CompraDeUsuario", savedList);
    console.log("se ha guardado su compra" + savedList);

    if (cart.length == 0) {
      //se verifica si hay productos en el carro
      alert(
        "No se han detectado productos en el carro, por favor seleccione uno"
      );
    } else {
      if (i == 1) {
        $(`#cart`)
          .append(
            `<p class="checked">Compra guardada ✔</p>
            <button class="boton-final" id="enviarCompra">Enviar compra</button>`
          )
          .ready();
      } else {
        $(`#checked`).empty().append(`Actualizado y guardado ✔`);
      }
      displayPagos(i);
    }
  });
}

//Ingreso de datos para compra
function displayPagos(i) {
  $(`#enviarCompra`).on(`click`, function () {
    $(`#pagosSection`).fadeIn(500);
  });
}

function closePagos() {
  $(`.cierre`).on(`click`, function () {
    $(`#pagosSection`).fadeOut(500);
  });
}

function confirmarCompra() {
  $(`#submitForm`).on(`click`, function (e) {
    e.preventDefault();
    let dniInput = document.getElementById("dni").value;
    let nombreInput = document.getElementById("apellido").value;
    let ApellidoInput = document.getElementById("nombre").value;
    let emailInput = document.getElementById("email").value;
    let telefonoInput = document.getElementById("tel").value;
    let tipoTarjetaInput = document.getElementsByClassName("tarjeta").value;
    let numTarjetaInput = document.getElementById("numTarjeta").value;
    let vencimientoInput = document.getElementById("vencimiento").value;
    let codSeguridadInput = document.getElementById("codSeguridad").value;

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

    console.log(titularTarjeta);
    sendList(datosTarjeta);
  });
}

function sendList(cliente) {
  //se realiza el post del cart
  const URLGET = `https://jsonplaceholder.typicode.com/posts`;
  $(`#submitForm`).on(`click`, function () {
    $.post(URLGET, cart, function (respuesta) {
      $(`#cart`).empty();
      cierreCompra(cliente);
    });
  });
}

function cierreCompra(datosTarjeta) {
  alert("cierre");
  $(`#form`).hide();
  $(`h1.titles`).hide();
  $(`#pagosSection`).append(`<h2>Muchas gracias por su compra</h2>`);
}

// anidacion
function app() {
  //Funciones carro
  displayCart();
  closeCart();

  //Funciones usuario
  createUser();

  //Funcion catalogo
  crearCatalogo();

  //Guardar carro
  saveList();

  //Pagos
  displayPagos();
  closePagos();
  confirmarCompra();
}

//app
app();
