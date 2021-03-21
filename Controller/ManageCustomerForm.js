$('#btnSaveCustomer').click(function () {
    let cusID = $('#CustomerID').text();
    let cusName = $('#txtCustomerName').val();
    let cusAddress = $('#txtCustomerAddress').val();
    let cusEmailAddress = $('#txtEmailAddress').val();
    let cusTelephoneNumber = $('#txtPhoneNumber').val();
    let row = "<tr><td>" + cusID + "</td><td>" + cusName + "</td><td>" + cusAddress + "</td><td>" + cusEmailAddress + "</td><td>" + cusTelephoneNumber + "</td>></tr>";
    $('#tblCustomerDetail').append(row);
});