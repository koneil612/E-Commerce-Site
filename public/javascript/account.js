$(() => {
    $('form.account-contact-form').submit((event) => {
        event.preventDefault();
        const fName = $("input#first-name");
        const lName = $("input#last-name");
        const email = $("input#email");
        const formData = {
            "fName": fName.val(),
            "lName": lName.val(),
            "email": email.val()
        };
        $.ajax({
            "type": "POST",
            "url": "/api/user/update",
            "data": formData,
            "dataType": "json",
            "encode": true,
            success: (res) => {
                console.log(res);
                fName.val(res.data.fName);
                lName.val(res.data.lName);
                email.val(res.data.email);
                showUpdateStatus(res);
            },
            error: (error) => showUpdateStatus(error)
        });
    });
});

const showUpdateStatus = (response) => {
    const messageListItem = $("li#message");
    const msg = (response.message ? response.message 
        : "There was a problem updating your account. Please try again later."
    );
    $("div.messages").show();
    messageListItem.empty();
    messageListItem.text(msg);
};
