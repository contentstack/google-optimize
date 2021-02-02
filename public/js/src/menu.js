function removeChars(url) {
    return url.substr(0, url.length - 1);
}

function toogleButtonState() {
    if (simpleCart.items().length === 0) {
        $(".simpleCart_empty").attr("disabled", true);
        $(".simpleCart_checkout_button").attr("disabled", true);
    } else {
        $(".simpleCart_empty").attr("disabled", true);
        $(".simpleCart_checkout_button").removeAttr("disabled");
    }
}

simpleCart.bind('ready', function () {;
    toogleButtonState();

    $("#cart").on("click", function () {
        $(".shopping-cart").fadeToggle("fast");
    });

    simpleCart.bind("afterAdd", function (item, isNew) {
        $('html, body').animate({ scrollTop: 0 }, 'medium');
        $(".shopping-cart").fadeIn("medium");
    });

    simpleCart.bind('update', toogleButtonState);
});

simpleCart({
    cartStyle: "div",
    cartColumns: [
        { view: "image", attr: "thumb", label: false },
        { attr: "name", label: "Name" },
        { attr: "price", label: "Price", view: "currency" },
        { view: "decrement", label: false, text: " - " },
        { attr: "quantity", label: "Qty" },
        { view: "increment", label: false, text: " + " },
        { view: "remove", text: "Remove", label: false }
    ]
});