function Customer(cusID, cusName, cusAddress, cusEmailAddress, telephoneNumber) {
    let __customerId = cusID;
    let __customerName = cusName;
    let __customerAddress = cusAddress;
    let __customerEmailAddress = cusEmailAddress;
    let __customerTelPhoneNumber = telephoneNumber;

    this.get__customerId = function () {
        return __customerId;
    }

    this.set__customerId = function (cusID) {
        __customerId = cusID;
    }

    this.get__customerName = function () {
        return __customerName;
    }

    this.set__customerName = function (cusName) {
        __customerName = cusName;
    }

    this.get__customerAddress = function () {
        return __customerAddress;
    }

    this.set__customerAddress = function (cusAddress) {
        __customerAddress = cusAddress;
    }

    this.get__customerEmailAddress = function () {
        return __customerEmailAddress;
    }

    this.set__customerEmailAddress = function (cusEmailAddress) {
        __customerEmailAddress = cusEmailAddress;
    }

    this.get__customerTelPhoneNumber = function () {
        return __customerTelPhoneNumber;
    }

    this.set__customerTelPhoneNumber = function (cusTelNumber) {
        __customerTelPhoneNumber = cusTelNumber;
    }
}