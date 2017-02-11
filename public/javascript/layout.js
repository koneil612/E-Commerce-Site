$(() => {
    $("button#logIn-button").on("click", () => {
        window.location.replace("/user/login");
    });
    $("button#logOut-button").on("click", () => {
        $.ajax({
            "type": "POST",
            "url": "/api/user/logout",
            success: () => {
                window.location.replace("/");
            }
        });
    });
});