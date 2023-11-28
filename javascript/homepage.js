let popup = document.getElementById("popup");
let popup2 = document.getElementById("popup2");

function openpopup(){
    popup.classList.add("open-popup");
}

function closepopup(){
    popup.classList.remove("open-popup");
}

function openpopup2(){
    popup2.classList.add("open-popup");
    popup2.classList.add("popup2-click");
}

function closepopup2(){
    popup2.classList.remove("open-popup");
}

