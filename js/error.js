document.addEventListener("DOMContentLoaded", function() {
    backBtn()
});

/* 404 PAGE */
function backBtn() {
    document.getElementById('go-back').addEventListener('click', function() {
        window.history.back();
    });
}

