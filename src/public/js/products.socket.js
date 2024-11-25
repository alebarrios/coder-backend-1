const socket = io();

const productsList = document.getElementById("products-list");
const productsForm = document.getElementById("products-form");
const inputProductId = document.getElementById("input-product-id");
const btnDeleteProduct = document.getElementById("btn-delete-product");
const errorMessage = document.getElementById("error-message");

socket.on("products-list", (data) => {
    console.log(data);
});

productsForm.onsubmit = (event) => {
    event.preventDefault();
    console.log(event);

};

btnDeleteProduct.onclick = () => {
    console.log("onclick btnDeleteProduct");

};

socket.on("error-message", (data) => {
    errorMessage.innerText = data.message;
});