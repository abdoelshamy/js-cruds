let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discouent = document.getElementById("discouent");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("create");
let mood = 'create';
let temp;


function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value)
            + -discouent.value;
        total.innerHTML = result;
        total.style.background = "#208b3a";
        total.style.color = "#fff";
    }

    else {
        total.innerHTML = '';
        total.style.background = "#d90429";
        total.style.color = "#ffb703";
    }
}

let prod;
if (localStorage.product != null) {
    prod = JSON.parse(localStorage.product);
}
else {
    prod = [];
}

submit.onclick = function () {
    if (title.value == '' || taxes.value == '' || price.value == '' || ads.value == ''
        || discouent.value == '' || category.value == '') {
        alert("Enter All Information About Product");
    }
    else {
        if (mood == 'create') {
            if (count.value == '') {
                alert("Enter The Count ");
            }
            else {
                for (let i = 0; i < count.value; i++) {
                    let neword = {
                        title: title.value,
                        price: price.value,
                        taxes: taxes.value,
                        ads: ads.value,
                        discouent: discouent.value,
                        total: total.innerHTML,
                        count: count.value,
                        category: category.value,
                    }
                    prod.push(neword);
                }
                localStorage.setItem('product', JSON.stringify(prod));
                clear();
            }
        }
        else {

            prod[temp].title = title.value;
            prod[temp].price = price.value;
            prod[temp].taxes = taxes.value;
            prod[temp].ads = ads.value;
            prod[temp].discouent = discouent.value;
            prod[temp].total = total.value;
            prod[temp].category = category.value;
            localStorage.setItem('product', JSON.stringify(prod));
            clear();
        }
    }
    showdata();
}


function showdata() {
    let table = '';
    for (let i = 0; i < prod.length; i++) {
        table += `
        <tr>
                        <td>${i + 1}</td>
                        <td>${prod[i].title}</td>
                        <td>${prod[i].price}</td>
                        <td>${prod[i].taxes}</td>
                        <td>${prod[i].ads}</td>
                        <td>${prod[i].discouent}</td>
                        <td>${prod[i].total}</td>
                        <td>${prod[i].category}</td>
                        <td><input onclick="update(${i})" type="submit" value="update" id="update"></td>
                        <td><input onclick="_delete(${i})" type="submit" value="delete" id="delete"></td>
                    </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let del = document.getElementById("deleteAll");
    if (prod.length > 0) {
        del.innerHTML = `<input onclick="_deleteall()" type="submit" value="delete all ${prod.length}">`
    }
    else {
        del.innerHTML = '';
    }
}

showdata();


function clear() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discouent.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';

}


function _delete(i) {
    prod.splice(i, 1);
    localStorage.product = JSON.stringify(prod);
    showdata();
}

function update(i) {
    temp = i;
    title.value = prod[i].title;
    price.value = prod[i].price;
    ads.value = prod[i].ads;
    taxes.value = prod[i].taxes;
    discouent.value = prod[i].discouent;
    total.innerHTML = prod[i].total;
    getTotal();
    category.value = prod[i].category;
    count.style.display = "none";
    mood = "update";
    submit.value = "update";
}

function _deleteall() {

    localStorage.clear();
    prod.splice(0);
    showdata();
}

let searchmood = "title";
let search = document.getElementById("search");
function getsearchmood(id) {
    if (id == 'bytitle') {
        searchmood = "title";
        document.getElementById("search").placeholder = "search by title";
    }
    else {
        searchmood = "category";
        document.getElementById("search").placeholder = "search by category";
        console.log('done');
    }
    search.focus();
    search.value = '';
    showdata();
}

function _search(value) {
    let table = '';
    if (searchmood == "title") {
        for (let i = 0; i < prod.length; i++) {
            if (prod[i].title.toUpperCase().includes(value.toUpperCase())) {
                table += `
        <tr>
                        <td>${i + 1}</td>
                        <td>${prod[i].title}</td>
                        <td>${prod[i].price}</td>
                        <td>${prod[i].taxes}</td>
                        <td>${prod[i].ads}</td>
                        <td>${prod[i].discouent}</td>
                        <td>${prod[i].total}</td>
                        <td>${prod[i].category}</td>
                        <td><input onclick="update(${i})" type="submit" value="update" id="update"></td>
                        <td><input onclick="_delete(${i})" type="submit" value="delete" id="delete"></td>
                    </tr>
        `;
            }
        }
    }
    else {
        for (let i = 0; i < prod.length; i++) {
            if (prod[i].category.toUpperCase().includes(value.toUpperCase())) {
                table += `
        <tr>
                        <td>${i + 1}</td>
                        <td>${prod[i].title}</td>
                        <td>${prod[i].price}</td>
                        <td>${prod[i].taxes}</td>
                        <td>${prod[i].ads}</td>
                        <td>${prod[i].discouent}</td>
                        <td>${prod[i].total}</td>
                        <td>${prod[i].category}</td>
                        <td><input onclick="update(${i})" type="submit" value="update" id="update"></td>
                        <td><input onclick="_delete(${i})" type="submit" value="delete" id="delete"></td>
                    </tr>
        `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}