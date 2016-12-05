document.querySelector("img").onload = function() {
    var open = false;
    document.getElementById("menu").onclick = function () {
        console.log("click");
        if (open === false) {
            document.getElementById("navigate").style.display = "block";
            open = true;
        } else {
            document.getElementById("navigate").style.display = "none";
            open = false;
        }
    }
};