function hideAll() {
    // $("#Page1,#Page2,#Page3,#Page4").css('display','none');
    document.getElementById('carouselSection').style.display = "none";
    document.getElementById('manageCustomerSection').style.display = "none";
    document.getElementById('manageItemSection').style.display = "none";
    document.getElementById('placeOrderSection').style.display = "none";
}

hideAll();
document.getElementById('carouselSection').style.display = "block";

document.getElementById('homePage').addEventListener("click", function () {
    console.log("button testing");
    hideAll();
    document.getElementById('carouselSection').style.display = "block";
});

document.getElementById('manageCustomerPage').addEventListener("click", function () {
    hideAll();
    document.getElementById('manageCustomerSection').style.display = "block";
});

document.getElementById('manageItemPage').addEventListener("click", function () {
    hideAll();
    document.getElementById('manageItemSection').style.display = "block";
});

document.getElementById('placeOrderPage').addEventListener("click", function () {
    hideAll();
    document.getElementById('placeOrderSection').style.display = "block";
});