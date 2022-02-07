// variable setup
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let thead = document.getElementById("thead");
let deleteAllSpace = document.getElementById("deleteAllSpace");
let mode = "create";
let temp;
let search = document.getElementById("search");
let searchNotFound = document.getElementById("searchNotFound")

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
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }
    if (title.value != "" && category.value != "" && price.value != "") {
        if (mode == "create") {
            if (product.count > 1) {
                for (let i = 0; i < product.count; i++) {
                    allProd.push(product);
                }
            } else {
                allProd.push(product);
            }
        } else if (mode == "update") {
            allProd[temp] = product;
            mode = "create"
            submit.innerHTML = "اضافة"
            count.style.display = "block";



        }
        saveToLocalStorage();
        clearData();




        readData();
    }




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
    getTotal()
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
            <td><i class="far fa-edit" onclick="updateData(${index})" ></i></td>
            <td><i class="far fa-trash-alt" onclick="deleteData(${index})"></i></td>
        </tr>
        `;


    }
    tbody.innerHTML = table;
    if (allProd.length > 0) {
        deleteAllSpace.innerHTML = `<button id="deleteAllBtn" onclick="deleteAll()">مسح الكل (${allProd.length})</button>`;
    } else {
        deleteAllSpace.innerHTML = ""
    }

}
readData();

// delete

function clearThead() {
    if (allProd.length <= 0) {
        thead.style.visibility = "hidden"

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
function updateData(i) {
    temp = i;
    mode = "update";
    this.scroll({
        top: 0,
        behavior: "smooth"

    })
    title.value = allProd[i].title;
    price.value = allProd[i].price;
    taxes.value = allProd[i].taxes;
    discount.value = allProd[i].discount;
    total.innerHTML = allProd[i].total;
    category.value = allProd[i].category;
    count.style.display = "none"
    if (price.value != '') {

        total.style.backgroundColor = '#002400';
    }
    else {
        total.innerHTML = '';
        total.style.backgroundColor = '#F05454';
    }
    submit.innerHTML = "تحديث"

}
// search
let searchMode = "title";
function getSearchMode(id) {
    search.focus()
    if (id == 'searchByName') {
        searchMode = "title";
        search.placeholder = "بحث بالاسم"
    } else {
        searchMode = "category";
        search.placeholder = "بحث بالتصنيف"

    }
    search.value = ""
    console.log(searchMode)
    readData()

}

function searchData(value) {
    value = value.toLowerCase();
    let table = "";
    if (searchMode == "title") {
        for (let i = 0; i < allProd.length; i++) {
            if (allProd[i].title.includes(value)) {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${allProd[i].title}</td>
                        <td>${allProd[i].price}</td>
                        <td>${allProd[i].taxes}</td>
                        <td>${allProd[i].total}</td>
                        <td>${allProd[i].category}</td>
                        <td><i class="far fa-edit" onclick="updateData(${i})" ></i></td>
                        <td><i class="far fa-trash-alt" onclick="deleteData(${i})"></i></td>
                    </tr>
            `;
                thead.style.visibility = "visible"
                searchNotFound.style.display = "none"
            } else {

                thead.style.visibility = "hidden"
                searchNotFound.style.display = "block"
            }
        }


    } else {
        for (let i = 0; i < allProd.length; i++) {
            if (allProd[i].category.includes(value)) {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${allProd[i].title}</td>
                        <td>${allProd[i].price}</td>
                        <td>${allProd[i].taxes}</td>
                        <td>${allProd[i].total}</td>
                        <td>${allProd[i].category}</td>
                        <td><i class="far fa-edit" onclick="updateData(${i})" ></i></td>
                        <td><i class="far fa-trash-alt" onclick="deleteData(${i})"></i></td>
                    </tr>
            `;
            }
        }
    }
    tbody.innerHTML = table;


}
// clean

