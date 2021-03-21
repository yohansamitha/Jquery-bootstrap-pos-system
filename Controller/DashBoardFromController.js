function hideAll() {
    // $("#carouselSection,#manageCustomerSection,#manageItemSection,#placeOrderSection").hide();
    document.getElementById('carouselSection').style.display = "none";
    document.getElementById('manageCustomerSection').style.display = "none";
    document.getElementById('manageItemSection').style.display = "none";
    document.getElementById('placeOrderSection').style.display = "none";
}

hideAll();
// document.getElementById('carouselSection').style.display = "block";
document.getElementById('manageItemSection').style.display = "block";

document.getElementById('btnHomePage').addEventListener("click", function () {
    hideAll();
    document.getElementById('carouselSection').style.display = "block";
});

document.getElementById('btnManageCustomer').addEventListener("click", function () {
    hideAll();
    document.getElementById('manageCustomerSection').style.display = "block";
});

document.getElementById('btnManageItem').addEventListener("click", function () {
    hideAll();
    document.getElementById('manageItemSection').style.display = "block";
});

document.getElementById('btnPlaceOrder').addEventListener("click", function () {
    hideAll();
    document.getElementById('placeOrderSection').style.display = "block";
});