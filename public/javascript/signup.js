$(() => {
    $("form.signup-form").submit((event) => {
        event.preventDefault();
        const formData = {
            "fName": $("input#first-name").val(),
            "lName": $("input#last-name").val(),
            "email": $("input#email").val(),
            "password": $("input#password").val(),
            "address": {
                "name": $("input#address-name").val(),
                "line1": $("input#address-line1").val(),
                "line2": $("input#address-line2").val(),
                "city": $("input#address-city").val(),
                "state": $("select#address-state").val(),
                "zip": $("input#address-zip").val()
            }
        };
        $.ajax({
            "type": "POST",
            "url": "/api/user/signup",
            "data": formData,
            "dataType": 'json',
            "encode": true,
            success: (response) => {
                if (response.success === true) {
                    $("div.signup-form-content-row").hide();
                    showSignupStatus(response);
                } else {
                    showSignupStatus(response);
                }
            },
            error: (error) => showSignupStatus(error)
        });
    });
});

const showSignupStatus = ((response) => {
    const msg = (response.message ? response.message : "Couldn't create account. Please check your info and try again.");
    const messageList = $("ul#messages-list");
    messageList.remove("li.message");
    messageList.append("<li class='message'>" + msg + "</li>");
});