let allOrderDetails = [];

function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function (e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    })
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

function getCustomerDetail() {
    let customerDetail = [];
    for (let customer of customerDATA) {
        customerDetail.push(customer.get__customerName());
        customerDetail.push(customer.get__customerId());
    }
    return customerDetail;
}

function getItemDetail() {
    let itemDetail = [];
    for (let item of itemDATA) {
        itemDetail.push(item.get__itemName());
        itemDetail.push(item.get__itemID());
    }
    return itemDetail;
}

function loadAutoBind() {
    autocomplete(document.getElementById('txtPlaceOrderCustomerName'), getCustomerDetail());
    autocomplete(document.getElementById('txtPlaceOrderItemName'), getItemDetail());
}

loadAutoBind();

$('#btnCustomerSearch').on('click', function () {
    console.log('btn search on customer');
    let customerSearch = $('#txtPlaceOrderCustomerName').val();
    // let customerID = customerName.split(' ')[1];
    // console.log(customerID);
    for (let customer of customerDATA) {
        if (customer.get__customerId() === customerSearch) {
            $('#txtPlaceOrderCustomerName').val(customerSearch + " " + customer.get__customerName())
            $('#txtPlaceOrderCustomerAddress').val(customer.get__customerAddress());
            $('#txtPlaceOrderEmailAddress').val(customer.get__customerEmailAddress());
            $('#txtPlaceOrderPhoneNumber').val(customer.get__customerTelPhoneNumber());
            return;
        } else if (customer.get__customerName() === customerSearch) {
            $('#txtPlaceOrderCustomerName').val(customer.get__customerId() + " " + customerSearch)
            $('#txtPlaceOrderCustomerAddress').val(customer.get__customerAddress());
            $('#txtPlaceOrderEmailAddress').val(customer.get__customerEmailAddress());
            $('#txtPlaceOrderPhoneNumber').val(customer.get__customerTelPhoneNumber());
            return;
        }
    }
    alert("There is no customer for this name or id");
});

$('#btnItemSearch').on('click', function () {
    let itemDetail = $('#txtPlaceOrderItemName').val();
    for (let item of itemDATA) {
        if (item.get__itemID() === itemDetail) {
            $('#txtPlaceOrderItemName').val(itemDetail + " " + item.get__itemName());
            $('#txtPlaceOrderItemDescription').val(item.get__itemDescription());
            $('#txtPlaceOrderItemPrice').val(item.get__itemPrice());
            return;
        } else if (item.get__itemName() === itemDetail) {
            $('#txtPlaceOrderItemName').val(item.get__itemID() + " " + itemDetail);
            $('#txtPlaceOrderItemDescription').val(item.get__itemDescription());
            $('#txtPlaceOrderItemPrice').val(item.get__itemPrice());
            return;
        }
    }
    alert("There is no item for this name or id");
});

function quantityCheck(itemID, qty) {
    for (let item of itemDATA) {
        if (item.get__itemID() == itemID) {
            return item.get__itemQuantityOnHand() > qty;
        }
    }
    return false;
}

function alreadyAddCheck(itemID) {
    let index = 0;
    for (let allOrderDetail of allOrderDetails) {
        if (allOrderDetail.get__itemID() == itemID) {
            return index;
        }
        index++;
    }
    return -1;
}

function loadAllOrderItems() {
    console.log('orderDetail table load');
    $('#placeOrderItemDetail>tr').off('click');
    $('#placeOrderItemDetail').empty();

    for (let allOrderDetail of allOrderDetails) {
        let row = "<tr>" +
            "<td>" + allOrderDetail.get__itemID() + "</td>" +
            "<td>" + allOrderDetail.get__itemName() + "</td>" +
            // "<td>" + allOrderDetail.get__itemDescription() + "</td>" +
            "<td>" + allOrderDetail.get__itemPrice() + "</td>" +
            "<td>" + allOrderDetail.get__qty() + "</td>>" +
            "</tr>";
        $('#placeOrderItemDetail').append(row);
    }
    $('#placeOrderItemDetail>tr').click(function () {
        let itemID = $(this).children('td:eq(0)').text();
        let itemName = $(this).children('td:eq(1)').text();
        // let itemDescription = $(this).children('td:eq(2)').text();
        let itemPrice = $(this).children('td:eq(2)').text();
        let itemQty = $(this).children('td:eq(3)').text();

        console.log('id', itemID);
        console.log('name', itemName);
        // console.log('item dis',itemDescription);
        console.log('price', itemPrice);
        console.log('qty', itemQty);

        $('#txtPlaceOrderItemName').val(itemID + " " + itemName);
        $('#txtPlaceOrderItemDescription').val("");
        $('#txtPlaceOrderItemPrice').val(itemPrice);
        $('#txtPlaceOrderQty').val(itemQty);
    });
}

function recalculateTotal() {
    let total = 0;
    for (let order of allOrderDetails) {
        let qty = parseInt(order.get__qty());
        let itemPrice = parseInt(order.get__itemPrice());
        total += qty * itemPrice;
    }
    $('#total').text(total);
}

$('#btnAddToCart').on('click', function () {
    let itemIdAndName = $('#txtPlaceOrderItemName').val();
    let itemID = itemIdAndName.split(' ')[0];
    let itemName = itemIdAndName.split(' ')[1];
    let itemDescription = $('#txtPlaceOrderItemDescription').val();
    let itemPrice = $('#txtPlaceOrderItemPrice').val();
    let qty = parseInt($('#txtPlaceOrderQty').val());

    let itemAvailability = quantityCheck(itemID, qty);
    if (itemAvailability) {
        let index = alreadyAddCheck(itemID);
        if (index === -1) {
            console.log('new Item');
            let orderDetail = new OrderDetailsDATA(itemID, itemName, itemDescription, itemPrice, qty);
            allOrderDetails.push(orderDetail);
        } else {
            console.log('old item', index);
            let orderQty = parseInt(allOrderDetails[index].get__qty());
            allOrderDetails[index] = new OrderDetailsDATA(itemID, itemName, itemDescription, itemPrice, qty + orderQty);
        }
        loadAllOrderItems();
        recalculateTotal();
    } else {
        alert("Sorry we dont have that much amount of items!");
    }
});

$('#btnPlaceOrderOnAction').on('click', function () {
    let orderId = $('#placeOrderID').text();
    let customerSearch = $('#txtPlaceOrderCustomerName').val();
    let customerID = customerSearch.split(' ')[0];

    let date = new Date().toLocaleDateString();
    let time = new Date().toLocaleTimeString();

    let order = new Order(orderId, customerID, date, time);
    OrderDATA.push(order);
    for (let allOrderDetail of allOrderDetails) {
        OrderDetailsDATA.push(allOrderDetail);
    }
});

$('#btnPayOnAction').on('click', function () {
    let customerCash = parseInt($('#placeOrderCash').val());
    $('#placeOrderBalance').val(customerCash - parseInt($('#total').text()));
    alert("thank you for your payment");
    clearAllPlaceOrder();
});

$('#btnCancelOrderOnAction').on('click', function () {
    clearAllPlaceOrder();
});

function clearAllPlaceOrder() {
    $('#txtPlaceOrderCustomerName').val("");
    $('#txtPlaceOrderCustomerAddress').val("");
    $('#txtPlaceOrderEmailAddress').val("");
    $('#txtPlaceOrderPhoneNumber').val("");
    $('#txtPlaceOrderItemName').val("");
    $('#txtPlaceOrderItemDescription').val("");
    $('#txtPlaceOrderItemPrice').val("");
    $('#txtPlaceOrderQty').val("");
    $('#total').text("0.00");
    $('#subtotal').text("0.00");
    $('#placeOrderCash').val("");
    $('#placeOrderDiscount').val("");
    $('#placeOrderBalance').val("");
    $('#placeOrderItemDetail>tr').off('click');
    $('#placeOrderItemDetail').empty();
}