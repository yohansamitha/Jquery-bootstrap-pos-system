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

    let customer = new Customer(cusID, cusName, cusAddress, cusEmailAddress, cusTelephoneNumber);
    let number = customerDATA.push(customer);
    console.log(number);
    loadAllCustomer();
    clearAllCustomer();
    loadCustomerID();
}

$('#btnSaveCustomer').click(function () {
    saveCustomer();
});

$('#btnCancelCustomer').click(function () {
    clearAllCustomer();
    loadCustomerID();
    loadAllCustomer();
});
