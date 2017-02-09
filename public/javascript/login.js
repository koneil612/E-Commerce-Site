$(() => {
    $("form.login").submit((event) => {
        event.preventDefault();
        const formData = {
            "email": $("input#email-input").val(),
            "password": $("input#password-input").val()
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
        })
    })
})

const showLoginError = (() => {
    const messageList = $("ul#messages-list");
    messageList.remove("li.message");
    messageList.append("<li class='message'>Login failed, please try again.</li>");
})