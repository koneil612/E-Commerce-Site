$(() => {
    $("form.login").submit((event) => {
        event.preventDefault();
        const formData = {
            "email": $("input#email").val(),
            "password": $("input#password").val()
        };
        $.ajax({
            "type": "POST",
            "url": "api/user/login",
            "data": formData,
            "dataType": 'json',
            encode: true,
            success: (response) => {
                console.log(response);
            }
        })
    })
})