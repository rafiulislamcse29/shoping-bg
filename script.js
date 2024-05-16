const productContainer = document.querySelector(".product_container");


async function getAllProducts() {
  const response = await fetch("https://fakestoreapi.com/products")
  const products = await response.json()

  displayProduct(products)
}

const displayProduct = (products) => {
  products.forEach((product) => {
    const div = document.createElement("div")
    div.classList.add("product")
    div.innerHTML = `
    <img src="${product.image}" alt="${product.title}"/>
    <div class="product_details">
      <span>${product.category}</span>
      <h4>${product.title}</h4>
      <span>${product.price}$</span>
      <button onclick="handleProductDetails('${product.id}')">Details</button>
      <button onclick="handleAddToCart('${product.title}','${product.price}')">Add to cart</button>    </div>
    `
    productContainer.appendChild(div)
  })
}




const cartMainContainer = document.querySelector(".card-main-container")
const handleAddToCart = (title, price) => {
  const div = document.createElement('div')
  div.classList.add('card-list')
  div.innerHTML = `
    <h5>${title.slice(0, 10)}</h5>
    <p class="price">${price}$</p>
 `
  cartMainContainer.appendChild(div)
  totalPrice()
  totalCount()
}

const totalPrice=()=>{
  const price=document.querySelectorAll('.price')
  let total=0
  console.log(price)
  for(const element of price){
    total += parseFloat(element.innerHTML)
  }

  document.querySelector('.total-price').innerHTML=`${total.toFixed(2)}$`

}

const totalCount=()=>{
  const totolItem=document.querySelector(".totol-Item")
  totolItem.innerHTML=parseInt(totolItem.innerHTML)+1
}


const handleProductDetails=async(id)=>{
  const response = await fetch(`https://fakestoreapi.com/products/${id}`)
  const product = await response.json()
  productDetails(product)

}

const productDetails=(product)=>{
  const modalContainer=document.querySelector(".modal-container")
  const modalContent=document.querySelector(".modal-content")
  const div = document.createElement("div")
    // div.classList.add("product")
    div.innerHTML = `
    <div>
      <span>${product.category}</span>
      <h4>${product.title}</h4>
      <h4>${product.description}</h4>
      <span>${product.price}$</span>
      </div>
      <button onClick="handleModalCose()">close</button>    
    `
    modalContent.appendChild(div)
    modalContainer.style.display="block"
}

const modalContainer=document.querySelector(".modal-container")
const modalContent=document.querySelector(".modal-content")

const handleModalCose=()=>{
  modalContainer.style.display="none"
  modalContent.innerHTML=""
}


window.onclick = function(event) {
  if (event.target == modalContainer) {
    modalContainer.style.display = "none";
    modalContent.innerHTML=""
  }
}
getAllProducts()