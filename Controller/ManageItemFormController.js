// to load all customer
function loadALLItem() {
    console.log('item table load');
    $('#tblItemDetails>tr').off('click');
    $('#tblItemDetails').empty();

    for (let item of itemDATA) {
        let row = "<tr>" +
            "<td>" + item.get__itemID() + "</td>" +
            "<td>" + item.get__itemName() + "</td>" +
            "<td>" + item.get__itemDescription() + "</td>" +
            "<td>" + item.get__itemPrice() + "</td>" +
            "<td>" + item.get__itemQuantityOnHand() + "</td>>" +
            "</tr>";
        $('#tblItemDetails').append(row);
    }
    $('#tblItemDetails>tr').click(function () {
        let itemID = $(this).children('td:eq(0)').text();
        let itemName = $(this).children('td:eq(1)').text();
        let itemDescription = $(this).children('td:eq(2)').text();
        let itemPrice = $(this).children('td:eq(3)').text();
        let itemQty = $(this).children('td:eq(4)').text();

        $('#ItemID').text(itemID);
        $('#txtItemName').val(itemName);
        $('#txtItemDescription').val(itemDescription);
        $('#txtItemPrice').val(itemPrice);
        $('#txtItemQty').val(itemQty);
    });
}

// to clear all textield
function clearAllItem() {
    $('#ItemID').text("");
    $('#txtItemName').val("");
    $('#txtItemDescription').val("");
    $('#txtItemPrice').val("");
    $('#txtItemQty').val("");
    $('#txtItemName,#txtItemDescription,#txtItemPrice,#txtItemQty').css(
        'border-color', '#86b7fe',
        'box-shadow', '0 0 0 0.25rem rgb(13 110 253 / 25%)'
    );
}

// to load new item id
function loadItemID() {
    try {
        let lastCustomerID = itemDATA[itemDATA.length - 1].get__itemID().substr(1);
        let newID = parseInt(lastCustomerID) + 1;
        if (newID < 10) {
            $('#ItemID').text("I00" + newID);
        } else if (newID < 100) {
            $('#ItemID').text("I0" + newID);
        } else {
            $('#ItemID').text("I" + newID);
        }
    } catch (e) {
        $('#ItemID').text("I001");
    }
}

// to save an item
function saveItem() {
    let itemID = $('#ItemID').text();
    let itemName = $('#txtItemName').val();
    let itemDescription = $('#txtItemDescription').val();
    let itemPrice = $('#txtItemPrice').val();
    let itemQty = $('#txtItemQty').val();

    let item = new Item(itemID, itemName, itemDescription, itemPrice, itemQty);
    itemDATA.push(item);
    loadALLItem();
    clearAllItem();
    loadItemID();
    loadAutoBind();
    $('#txtItemName,#txtItemDescription,#txtItemPrice,#txtItemQty').css(
        'border-color', '#86b7fe',
        'box-shadow', '0 0 0 0.25rem rgb(13 110 253 / 25%)'
    );
    $("#txtItemName").focus();
}

// save button action
$('#btnSaveItem').on('click', function () {
    console.log('function check');
    saveItem();
});

// cancel button action
$('#btnCancelItem').on('click', function () {
    clearAllItem();
    loadItemID();
    loadALLItem();
});

$("#txtItemName").on('keydown', function (event) {
    if (event.key == "Enter") {
        $("#txtItemDescription").focus();
    }
    let cusRegEx = /^[A-z]{5,}$/;
    let inputID = $("#txtItemName").val();
    if (cusRegEx.test(inputID)) {
        $("#txtItemName").css(
            // 'border', '2px solid green',
            'border-color', '#86b7fe',
            'box-shadow', '0 0 0 0.25rem rgb(13 110 253 / 25%)');
        $("#lblcusid").text("");
    } else {
        $("#txtItemName").css(
            'border', '2px solid red',
            'border-color', '#f30505',
            'box-shadow', '0 0 0 0.25rem rgb(253 13 13 / 25%)!important');
        $("#lblcusid").text('Your Input Data Format is Wrong (C00-001)');
    }
});

$("#txtItemDescription").on('keydown', function (event) {
    if (event.key == "Enter") {
        $("#txtItemPrice").focus();
    }
    let cusRegEx = /^[A-z]{5,}$/;
    let inputID = $("#txtItemDescription").val();
    if (cusRegEx.test(inputID)) {
        $("#txtItemDescription").css(
            // 'border', '2px solid green',
            'border-color', '#86b7fe',
            'box-shadow', '0 0 0 0.25rem rgb(13 110 253 / 25%)');
        $("#lblcusid").text("");
    } else {
        $("#txtItemDescription").css(
            'border', '2px solid red',
            'border-color', '#f30505',
            'box-shadow', '0 0 0 0.25rem rgb(253 13 13 / 25%)!important');
        $("#lblcusid").text('Your Input Data Format is Wrong (C00-001)');
    }
});

$("#txtItemPrice").on('keydown', function (event) {
    if (event.key == "Enter") {
        $("#txtItemQty").focus();
    }
    let cusRegEx = /^[0-9]+$/;
    let inputID = $("#txtItemPrice").val();
    if (cusRegEx.test(inputID)) {
        $("#txtItemPrice").css(
            // 'border', '2px solid green',
            'border-color', '#86b7fe',
            'box-shadow', '0 0 0 0.25rem rgb(13 110 253 / 25%)');
        $("#lblcusid").text("");
    } else {
        $("#txtItemPrice").css(
            'border', '2px solid red',
            'border-color', '#f30505',
            'box-shadow', '0 0 0 0.25rem rgb(253 13 13 / 25%)!important');
        $("#lblcusid").text('Your Input Data Format is Wrong (C00-001)');
    }
});

$("#txtItemQty").on('keydown', function (event) {
    if (event.key == "Enter") {
        saveItem();
    }
    let cusRegEx = /^[0-9]+$/;
    let inputID = $("#txtItemQty").val();
    if (cusRegEx.test(inputID)) {
        $("#txtItemQty").css(
            // 'border', '2px solid green',
            'border-color', '#86b7fe',
            'box-shadow', '0 0 0 0.25rem rgb(13 110 253 / 25%)');
        $("#lblcusid").text("");
    } else {
        $("#txtItemQty").css(
            'border', '2px solid red',
            'border-color', '#f30505',
            'box-shadow', '0 0 0 0.25rem rgb(253 13 13 / 25%)!important');
        $("#lblcusid").text('Your Input Data Format is Wrong (C00-001)');
    }
});


$('#txtItemName,#txtItemDescription,#txtItemPrice,#txtItemQty').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});