function Item(itemID, itemName, itemDescription, itemPrice, itemQuantityOnHand) {
    let __itemID = itemID;
    let __itemName = itemName;
    let __itemDescription = itemDescription;
    let __itemPrice = itemPrice;
    let __itemQuantityOnHand = itemQuantityOnHand;

    this.get__itemID = function () {
        return __itemID;
    }

    this.set__itemID = function (itemID) {
        __itemID = itemID;
    }

    this.get__itemName = function () {
        return __itemName;
    }

    this.set__itemName = function (itemName) {
        __itemName = itemName;
    }

    this.get__itemDescription = function () {
        return __itemDescription;
    }

    this.set__itemDescription = function (itemDescription) {
        __itemDescription = itemDescription;
    }

    this.get__itemPrice = function () {
        return __itemPrice;
    }

    this.set__itemPrice = function (itemPrice) {
        __itemPrice = itemPrice;
    }

    this.get__itemQuantityOnHand = function () {
        return __itemQuantityOnHand;
    }

    this.set__itemQuantityOnHand = function (itemQuantityOnHand) {
        __itemQuantityOnHand = itemQuantityOnHand;
    }
}