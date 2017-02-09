$(() => {
    $("form.login").submit((event) => {
        console.log("time to log in!");
        event.preventDefault();
        const formData = {
            "email": $("input#email-input").val(),
            "password": $("input#password-input").val()
        };
        console.log(formData);
        $.ajax({
            "type": "POST",
            "url": "/api/user/login",
            "data": formData,
            "dataType": 'json',
            "encode": true,
            success: () => {
                window.location.replace("/");
            }
        })
    })
})