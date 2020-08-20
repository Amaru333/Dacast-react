export * from "./actions";
export * from "./reducer";
export * from "./types";

function forgotPassword(event) {
    if (document.getElementById("forgotLoginForm").checkValidity()) {
        event.preventDefault();
        var loading = document.getElementById('forgotPwButtonLoading');
        var textButton = document.getElementById('buttonSendForgotPwText');
        var form = { 'email': document.getElementById('forgotLoginEmail').value }
        loading.style.display = 'block';
        textButton.style.display = 'none';
        jQuery.ajax({
            'type': 'POST',
            'url': 'https://bridge.dacast.com/forgot-password',
            'data': JSON.stringify(form),
            complete: function(xhr, textStatus) {
                if(xhr.status === 200) {
                    loading.style.display = 'none';
                    textButton.style.display = 'block';
                    document.getElementById('errorForgotPassword').style.display = "none";
                    document.getElementById('successForgotPassword').style.display = "block";
                } else {
                    loading.style.display = 'none';
                    textButton.style.display = 'block';
                    document.getElementById('successForgotPassword').style.display = "none";
                    document.getElementById('errorForgotPassword').style.display = "block";
                }
            } 
        })
    }
}