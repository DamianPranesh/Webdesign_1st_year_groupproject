var count=4;

function splashtimer(){
    count=count-1;
    if (count <= 0){
        window.location.href = "home page.html";
        return;
    }
}

var interval =  setInterval(splashtimer,1000);