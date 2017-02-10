$(() => {
    $("form.login").submit((event) => {
        event.preventDefault();
        const formData = {
            "email": $("input#email-input").val(),
            "password": $("input#password-input").val()
        };
        $.ajax({
            "type": "POST",
            "url": "/api/cart",
            "data": formData,
            "dataType": 'json',
            "encode": true,
            success: (response) => {
                if (response.success === true) {
                    window.location.replace("/cart/checkout");
                } else {
                    showCartError();
                }
            },
            error: () => showCartError()
        });
    });
});

const showCartError = (() => {
    const messageList = $("ul#messages-list");
    messageList.remove("li.message");
    messageList.append("<li class='message'>Something happened adding to your cart. Please try again.</li>");
})
