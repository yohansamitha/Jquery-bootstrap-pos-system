function Order(orderID, cusID, date, time) {
    let __orderID = orderID;
    let __customerId = cusID;
    let __orderDate = date;
    let __orderTime = time;

    this.get__customerId = function () {
        return __customerId;
    }

    this.set__customerId = function (cusID) {
        __customerId = cusID;
    }

    this.get__orderID = function () {
        return __orderID;
    }

    this.set__orderID = function (orderID) {
        __orderID = orderID;
    }

    this.get__orderDate = function () {
        return __orderDate;
    }

    this.set__orderDate = function (date) {
        __orderDate = date;
    }

    this.get__orderTime = function () {
        return __orderTime;
    }

    this.set__orderTime = function (time) {
        __orderTime = time;
    }


}