class Product {
  constructor(name, price, id, description){
      this.name = name;
      this.price = price;
      this.id = id;
      this.description = description;
  }
}




// const product2 = new Product ("Iphone 11", 800, 2, "El sucesor del iPhone XR llega con una cámara doble que apuesta por el gran angular y deja a un lado el zoom, el mismo procesador que los nameos 'pro', un diseño más desenfadado en nuevos tonos y, sobre todo, un precio mucho más atractivo.");
// const product1 = new Product ("MacBook Pro", 1000, 1, "Estos equipos integran los nuevos procesadores Apple M1, y prometen casi el triple de rendimiento gracias a estos potentes SoC. No solo eso: la eficiencia de estos procesadores también permite a estos equipos presumir de una autonomía sin precedentes: hasta 20 horas de reproducción de vídeo, 10 horas más que su generación anterior y toda una garantía para quienes los usen en el día a día.");
// const product3 = new Product ("Air Pods 3", 500, 3, "30 horas de autonomía y soporte para 'Spatial Audio', su tecnología de sonido envolvente. Además de la mejora en sonido, los nuevos AirPods vienen con cambios en el diseño y son resistentes al agua y al sudor, con certificación IPX4. Estas son las características de los nuevos auriculares completamente inalámbricos (TWS) de Apple.");
// const product4 = new Product("ipad A1432", 900, 4, "Es un tablet iOS con procesador mediano de 1GHz Dual-core que realiza bien las funciones del Apple iPad mini (WiFi 16GB). Buena conectividad de este terminal que incluye Bluetooth 4.0 + A2DP, WiFi 802.11 a/b/g/n (2.4GHz, 5GHz), pero carece de conexión NFC. Incluyendo la batería, el tablet Apple iPad mini (WiFi 16GB) tiene 308 gramos y es un terminal muy delgado con solamente 7,2mm.")

class User {
  constructor(user, password){
      this.user = user;
      this.password = password;
  }
}




const USERS = []


const PRODUCTS = [];

const products = async () => {
  try {
    const result = await fetch('./products.json');
    const data = await result.json();
    data.products.forEach(e => {
      let objeto = {
        name: e.name,
        price: e.price,
        id: e.id
      };
      PRODUCTS.push(objeto);
    });
    console.log(PRODUCTS);
  } catch (error) {
    console.error('Error:', error);
  }
};

products(); // Llamada a la función para ejecutarla


// Comienzo, al tocar Log In se abre el formulario con el user y contraseña
const showBtn = document.querySelector("#btnLogInShow")
showBtn.onclick = () => {formLogIn.style.display = "flex", showBtn.style.display = "none"};  


// Obteniendo los elementos necesarios del DOM
const formLogIn = document.getElementById("formLogIn")
const formData = document.getElementById("formData")
const welcomeBack = document.getElementById("welcomeBack")
const divFormData = document.getElementById("divFormData")
const messageFormData = document.getElementById("messageFormData")
const userMail = document.getElementById("userMail")
const userDirec = document.getElementById("userDirec")
const userProv = document.getElementById("userProv")
const userCity = document.getElementById("userCity")
const userBarr = document.getElementById("userBarr")
const userZip = document.getElementById("userZip")
const userNotif = document.getElementById("userNotif")
const btnStartShop = document.getElementById("btnStartShop")
const btnKeepShop = document.getElementById("btnKeepShop")
const btnSubmit = document.getElementById("btnSubmit")
const divBuy = document.getElementById("startBuy")
const showPass = document.getElementById("showPass")
const cartBuys = document.getElementById('cartBuys');




// Se agrega el nombre al Local storage si nunca se ingreso (no permite crear mas de un usuario)
formLogIn.onsubmit = (e) => {
  e.preventDefault()
  let dataUser = e.target
  const userName = dataUser.querySelector("#userName").value
  const userPass = dataUser.querySelector("#userPassword").value


  let userCoinsidence = USERS.find(e => e.userName == userName)
  userCoinsidence  === undefined && (() => {
    const user1 = new User(userName, userPass);
    USERS.push(user1);
  })();

  let userSL = localStorage.getItem("userName")
  userSL === null ? (() => {
    localStorage.setItem("userName", userName)
    messageFormData.innerText = "Bienvenidx " + userName +". Como es tu primera vez ingresa tus datos"
    formData.style.display = "flex"
  })() : (() => {
    welcomeBack.innerText = "Bienvenidx de nuevo " + userName
    btnKeepShop.style.display = "flex"
    cartBuys.style.display = "flex";
    formLogIn.style.display = "none"
    startBuy()
    showCart()
  }) ();

  formLogIn.style.display = "none"
}




// Al tocar el boton se
btnKeepShop.onclick = () => {
  divBuy.style.display = "flex"
}


// Funcion para mostrar contraseña
function showPassword(){
  let userPassw = document.getElementById("userPassword")
  if (userPassw.type == "password"){
    userPassw.type = "text";
  }else{
    userPassw.type = "password"
  }
}
showPass.onclick = () => {showPassword()}


// Al submitir el form se guardan los valores (no todos se usan, es para agregar mas interacción)
formData.onsubmit = (e) => {
    e.preventDefault();
    let dataUserRegis = e.target;
    formData.style.display = "none";
    userAddress.value = dataUserRegis.querySelector("#userDirec").value;
    localStorage.setItem("userAddress", userAddress.value);
    userMail.value = dataUserRegis.querySelector("#userMail").value;
    localStorage.setItem("userMail", userMail.value);
    userCity.value = dataUserRegis.querySelector("#userCity").value;
    localStorage.setItem("userCity", userCity.value);
    let gridCheck = dataUserRegis.querySelector("#gridCheck").value;
    if (gridCheck !== "on") {
      btnStartShop.disabled = true;
    }
    console.log(gridCheck);
};




btnStartShop.onclick = () => {
  divBuy.style.display = "flex"
  startBuy();
}
let cardData = {};


let cart = [];
let totalPrice = 0;




function updateTotalPrice() {
  const totalPriceElement = document.getElementById('totalPrice');
  totalPriceElement.textContent = 'Precio total: $' + totalPrice.toFixed(2);
}


function calculateTotalPrice() {
  let total = 0;
  cart.forEach((item) => {
    total += item.product.price * item.quantity;
  });
  return total;
}




function startBuy() {
  const productSelect = document.getElementById('productSelect');
  PRODUCTS.forEach((product) => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = product.name;
    productSelect.appendChild(option);
  });


  const productForm = document.getElementById('productForm');


  productForm.addEventListener('submit', function (event) {
    event.preventDefault();
    divBuy.style.display = "flex";


    const selectedProductId = productSelect.value;
    const selectedProduct = PRODUCTS.find((product) => product.id === parseInt(selectedProductId));
    const selectedColor = document.getElementById('productColor').value;
    const selectedQuantity = parseInt(document.getElementById('productQuantity').value);

    (selectedProduct && selectedQuantity > 0) && (() => {
      const productItem = {
        product: selectedProduct,
        color: selectedColor,
        quantity: selectedQuantity
      };
      cart.push(productItem);
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Producto agregado al carrito:', productItem);
  
  
      totalPrice += selectedProduct.price * selectedQuantity;
      updateTotalPrice();
    })();
  });
}

const btnBuy = document.getElementById("btnBuy")
btnBuy.onclick = () => {
  showCart()
} 



const stopBuyingButton = document.getElementById('stopBuying');
stopBuyingButton.addEventListener('click', function () {
  divBuy.style.display = "none";
  cartBuys.innerHTML.trim() === '' ? showCart() : (() => {
    cartBuys.innerHTML = '';
    showCart();
  })
  endOfShopp()
  updateTotalPrice();
});


const cancelBuyButton = document.getElementById('cancelBuy');
cancelBuyButton.addEventListener('click', function () {
  cart = [];
  localStorage.removeItem('cart');
  totalPrice = 0;
  updateTotalPrice();
  const totalBuyElement = document.getElementById('totalBuy');
  totalBuyElement.innerHTML = '';
  console.log('Compra cancelada');
  divBuy.style.display = "none";
  cartBuys.innerHTML = '';
});


function showCart(){
  cartBuys.innerHTML = ''
  let storedCardData = localStorage.getItem('cart')
  storedCardData = JSON.parse(storedCardData)
  const ulElement = document.createElement('ul');
  ulElement.classList.add('list-group', 'list-group-flush');
  storedCardData.forEach(item => {
    const liElement = document.createElement('li');
    liElement.classList.add('list-group-item');
    liElement.innerText = "-Producto: " + item.product.name + " Color: " + item.color + " Cantidad: " + item.quantity;
    ulElement.appendChild(liElement);
  });
  cartBuys.appendChild(ulElement);
}


function endOfShopp() {
  const buyText = document.createElement('p');
  buyText.classList.add('fs-5');
  const userAddressLocal = localStorage.getItem("userAddress");
  const userCityLocal = localStorage.getItem("userCity");
  const userMailLocal = localStorage.getItem("userMail");
  const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Confirmar compra',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Comprar',
      cancelButtonText: 'Cancelar compra',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Compra realizada!',
          'Tu compra ha sido realizada.',
          'success'
        )
        Swal.fire({
          position: 'top-end',
          title: 'Compra realizada',
          text: `El pedido será enviado a la dirección ${userAddressLocal} de la ciudad de ${userCityLocal}. Se le notificará por el correo electrónico ${userMailLocal} la fecha y estimado horario de entrega. Recuerde que el pedido se abona en efectivo.`,
          showConfirmButton: false,
          timer: 15000
        })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Compra cancelada',
          'TU compra ha sido realizada.',
          'error'
        )
      }
    })
  }
  

