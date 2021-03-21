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
})