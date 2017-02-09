$(() => {
    $("form.login").submit((event) => {
        event.preventDefault();
        const formData = {
            "email": $("input#email-login").val(),
            "password": $("input#password-login").val()
        };
        $.ajax({
            "type": "POST",
            "url": "/api/user/login",
            "data": formData,
            "dataType": 'json',
            "encode": true,
            success: (response) => {
                if (response.success === true) {
                    window.location.replace("/");
                } else {
                    showLoginError();
                }
            },
            error: () => showLoginError()
        });
    });
});

const showLoginError = (() => {
    const messageListItem = $("li#message");
    messageListItem.empty();
    messageListItem.text("Login failed, please try again.");
})