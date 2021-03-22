function loadCustomerID() {
    try {
        let lastCustomerID = customerDATA[customerDATA.length - 1].get__customerId().substr(1);
        let newID = parseInt(lastCustomerID) + 1;
        if (newID < 10) {
            $('#CustomerID').text("C00" + newID);
        } else if (newID < 100) {
            $('#CustomerID').text("C0" + newID);
        } else {
            $('#CustomerID').text("C" + newID);
        }
    } catch (e) {
        $('#CustomerID').text("C001");
    }
}

loadCustomerID();

function clearAllCustomer() {
    $('#CustomerID').text("");
    $('#txtCustomerName').val("");
    $('#txtCustomerAddress').val("");
    $('#txtEmailAddress').val("");
    $('#txtPhoneNumber').val("");
}

function loadAllCustomer() {
    $('#tblCustomerDetail>tr').off('click');
    $('#tblCustomerDetail').empty();
    for (let customer of customerDATA) {
        let row = "<tr><td>" + customer.get__customerId() + "</td><td>" + customer.get__customerName() + "</td><td>" +
            customer.get__customerAddress() + "</td><td>" + customer.get__customerEmailAddress() + "</td><td>" +
            customer.get__customerTelPhoneNumber() + "</td>></tr>";
        $('#tblCustomerDetail').append(row);
    }
    $('#tblCustomerDetail>tr').click(function () {
        let cusId = $(this).children('td:eq(0)').text();
        let cusName = $(this).children('td:eq(1)').text();
        let cusAddress = $(this).children('td:eq(2)').text();
        let cusEmailAddress = $(this).children('td:eq(3)').text();
        let cusTelephoneNumber = $(this).children('td:eq(4)').text();

        $('#CustomerID').text(cusId);
        $('#txtCustomerName').val(cusName);
        $('#txtCustomerAddress').val(cusAddress);
        $('#txtEmailAddress').val(cusEmailAddress);
        $('#txtPhoneNumber').val(cusTelephoneNumber);
    });
}

function saveCustomer() {
    let cusID = $('#CustomerID').text();
    let cusName = $('#txtCustomerName').val();
    let cusAddress = $('#txtCustomerAddress').val();
    let cusEmailAddress = $('#txtEmailAddress').val();
    let cusTelephoneNumber = $('#txtPhoneNumber').val();
    let option = confirm(`Do you want to Save ID:${cusID}`);
    if (option) {
        let customer = new Customer(cusID, cusName, cusAddress, cusEmailAddress, cusTelephoneNumber);
        let number = customerDATA.push(customer);
        console.log(number);
        loadAllCustomer();
        clearAllCustomer();
        loadCustomerID();
        loadAutoBind();
    } else {
        alert("customer failed!")
    }
}

$('#btnSaveCustomer').click(function () {
    saveCustomer();
});

function searchCustomer(id) {
    for (var i in customerDATA) {
        if (customerDATA[i].get__customerId() == id) return customerDATA[i];
    }
    return null;
}

function updateCustomer(id, name, address, email, telephone) {
    let customer = searchCustomer(id);
    if (customer != null) {
        customer.set__customerName(name)
        customer.set__customerAddress(address)
        customer.set__customerEmailAddress(email);
        customer.set__customerTelPhoneNumber(telephone);
        return true;
    } else {
        return false;
    }
}

$('#btnUpdateCustomer').click(function () {
    let cusID = $('#CustomerID').text();
    let cusName = $('#txtCustomerName').val();
    let cusAddress = $('#txtCustomerAddress').val();
    let cusEmailAddress = $('#txtEmailAddress').val();
    let cusTelephoneNumber = $('#txtPhoneNumber').val();

    let option = confirm(`Do you want to Update Customer ID:${cusID}`);

    if (option) {
        let res = updateCustomer(cusID, cusName, cusAddress, cusEmailAddress, cusTelephoneNumber);
        if (res) {
            alert("Customer Updated");
            loadAllCustomer();
            clearAllCustomer();
            loadCustomerID();
            loadAutoBind();
        } else {
            alert("Update Faild");
        }
    }
});

function deleteCustomer(id) {
    let customer = searchCustomer(id);
    if (customer != null) {
        let indexNumber = customerDATA.indexOf(customer);
        customerDATA.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}

$('#btnDeleteCustomer').click(function () {
    let cusID = $('#CustomerID').text();
    let option = confirm(`Do you want to delete ID:${cusID}`);
    if (option) {
        let res = deleteCustomer(cusID);
        if (res) {
            alert("Customer Deleted");
        } else {
            alert("Delete Failed")
        }
        loadAllCustomer();
        clearAllCustomer();
        loadCustomerID();
        loadAutoBind();
    }
});

$('#btnCancelCustomer').click(function () {
    clearAllCustomer();
    loadCustomerID();
    loadAllCustomer();
});

$("#txtCustomerName").on('keyup', function (event) {
    /*if (event.key === "Enter") {
        console.log('enter')
        $('#txtCustomerAddress').focus();
    }*/
    let cusRegEx = /^[A-z]{10,}$/;
    let inputID = $("#txtCustomerName").val();
    if (cusRegEx.test(inputID)) {
        $("#txtCustomerName").css(
            // 'border', '2px solid green',
            'border-color', '#86b7fe',
            'box-shadow', '0 0 0 0.25rem rgb(13 110 253 / 25%)');
        $("#lblcusid").text("");
    } else {
        $("#txtCustomerName").css(
            'border', '2px solid red',
            'border-color', '#f30505',
            'box-shadow', '0 0 0 0.25rem rgb(253 13 13 / 25%)!important');
        $("#lblcusid").text('Your Input Data Format is Wrong (C00-001)');
    }
});

$("#txtCustomerName").on('keydown', function (event) {
    if (event.key == "Enter") {
        $('#txtCustomerAddress').focus();
    }
});

$("#txtCustomerAddress").on('keydown', function (event) {
    if (event.key == "Enter") {
        $('#txtEmailAddress').focus();
    }
    let cusRegEx = /^[0-9|,| ]+[A-z]+$/;
    let inputID = $("#txtCustomerAddress").val();
    if (cusRegEx.test(inputID)) {
        $("#txtCustomerAddress").css(
            // 'border', '2px solid green',
            'border-color', '#86b7fe',
            'box-shadow', '0 0 0 0.25rem rgb(13 110 253 / 25%)');
        $("#lblcusid").text("");
    } else {
        $("#txtCustomerAddress").css(
            'border', '2px solid red',
            'border-color', '#f30505',
            'box-shadow', '0 0 0 0.25rem rgb(253 13 13 / 25%)!important');
        $("#lblcusid").text('Your Input Data Format is Wrong (C00-001)');
    }
});

$("#txtEmailAddress").on('keydown', function (event) {
    if (event.key == "Enter") {
        $('#txtPhoneNumber').focus();
    }
    let cusRegEx = /^[A-z|0-9]{1,}(@)[A-z]{1,}(.)[com|lk|net]{1,}$/;
    let inputID = $("#txtEmailAddress").val();
    if (cusRegEx.test(inputID)) {
        $("#txtEmailAddress").css(
            // 'border', '2px solid green',
            'border-color', '#86b7fe',
            'box-shadow', '0 0 0 0.25rem rgb(13 110 253 / 25%)');
        $("#lblcusid").text("");
    } else {
        $("#txtEmailAddress").css(
            'border', '2px solid red',
            'border-color', '#f30505',
            'box-shadow', '0 0 0 0.25rem rgb(253 13 13 / 25%)!important');
        $("#lblcusid").text('Your Input Data Format is Wrong (C00-001)');
    }
});

$("#txtPhoneNumber").on('keydown', function (event) {
    if (event.key == "Enter") {
        saveCustomer();
        $("#txtCustomerName").focus();
    }
    let cusRegEx = /^[0-9]{3,}$/;
    let inputID = $("#txtPhoneNumber").val();
    if (cusRegEx.test(inputID)) {
        $("#txtPhoneNumber").css(
            // 'border', '2px solid green',
            'border-color', '#86b7fe',
            'box-shadow', '0 0 0 0.25rem rgb(13 110 253 / 25%)');
        $("#lblcusid").text("");
    } else {
        $("#txtPhoneNumber").css(
            'border', '2px solid red',
            'border-color', '#f30505',
            'box-shadow', '0 0 0 0.25rem rgb(253 13 13 / 25%)!important');
        $("#lblcusid").text('Your Input Data Format is Wrong (C00-001)');
    }
});

$('#txtCustomerName,#txtCustomerAddress,#txtEmailAddress,#txtPhoneNumber').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});