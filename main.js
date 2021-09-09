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
          src="Multimedia/Emprendimiento/Organizador ${producto.nombre}/${producto.nombre}1.jpg"
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
        $(`#cart`).append(`<p class="checked">Compra guardada ✔</p>
      <button class="boton-final" id="enviar-compra">Enviar compra</button>`);
      } else {
        $(`#checked`).empty().append(`Actualizado y guardado ✔`);
      }
      sendList(i);
    }
  });
}

function sendList(i) {
  //se realiza el post del cart
  const URLGET = `https://jsonplaceholder.typicode.com/posts`;
  i++;
  $(`#enviar-compra`).on(`click`, function () {
    $.post(URLGET, cart, function (respuesta) {
      $(`#cart`).empty();
      for (respuesta of cart) {
        $(`#cart`).append(
          `<p class="sendList">Enviada solicitud de compra para: Organizador ${respuesta.nombre} ✔</p>`
        );
      }
    });
  });
}

// anidacion
function app() {
  displayCart();
  closeCart();
  crearCatalogo();
  saveList();
}

//app
app();
