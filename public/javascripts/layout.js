window.onload = function() {
    document.getElementById("menu").onclick = function () {
        if (document.getElementById("navigate").style.display == "none") {
            document.getElementById("navigate").style.display = "block";
        } else {
            document.getElementById("navigate").style.display = "none";
        }
    }
};