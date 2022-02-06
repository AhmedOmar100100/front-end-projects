// variable setup
title = document.getElementById("title");
price = document.getElementById("price");
taxes = document.getElementById("taxes");
discount = document.getElementById("discount");
total = document.getElementById("total");
count = document.getElementById("count");
category = document.getElementById("category");
submit = document.getElementById("submit");
thead = document.getElementById("thead");
deleteAllSpace = document.getElementById("deleteAllSpace");


// get total
function getTotal() {
    if (price.value != '') {
        result = +price.value + +taxes.value - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = '#002400';
    }
    else {
        total.innerHTML = '';
        total.style.backgroundColor = '#F05454';
    }

}



// save data to local storage
function saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(allProd))
}

// add product
if (localStorage.products != null) {
    allProd = JSON.parse(localStorage.products)

} else {
    allProd = [];

}
submit.onclick = function () {
    thead.style.visibility = "visible";

    product = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    }
    allProd.push(product);
    saveToLocalStorage();

    clearData();
    readData();



}

// clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    discount.value = '';
    total.innerHTML = '';
    category.value = '';
    count.value = '';
}
// read
function readData() {
    tbody = document.getElementById("tbody");
    table = ''
    for (let index = 0; index < allProd.length; index++) {
        table += `
        <tr>
            <td>${index + 1}</td>
            <td>${allProd[index].title}</td>
            <td>${allProd[index].price}</td>
            <td>${allProd[index].taxes}</td>
            <td>${allProd[index].total}</td>
            <td>${allProd[index].category}</td>
            <td><i class="far fa-edit" ></i></td>
            <td><i class="far fa-trash-alt" onclick="deleteData(${index})"></i></td>
        </tr>
        `;


    }
    tbody.innerHTML = table;
    if (allProd.length > 0) {
        deleteAllSpace.innerHTML = '<button id="deleteAllBtn" onclick="deleteAll()">مسح الكل</button>';
    } else {
        deleteAllSpace.innerHTML = ""
    }

}
readData();

// count
// delete

function clearThead() {
    if (allProd.length <= 0) {
        thead.style.visibility = "hidden"
        console.log("hidden ")

    } else {
        thead.style.visibility = "visible"
    }
}

function deleteAll() {
    allProd.splice(0)
    localStorage.clear()
    readData()
    clearThead()




}

function deleteData(i) {
    allProd.splice(i, 1)
    localStorage.products = JSON.stringify(allProd)
    localStorage.removeItem(i)
    readData()
    clearThead()

}
clearThead()
// update
// search
// clean