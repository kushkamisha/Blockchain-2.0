let title = document.getElementById("title");
let description = document.getElementById("description");
let year = document.getElementById("year");
let belivery_volume = document.getElementById("belivery_volume");
let price = document.getElementById("price");

let xmlhttp = new XMLHttpRequest();
let xmlDoc;

xmlhttp.onload = function() {
    xmlDoc = new DOMParser().parseFromString(xmlhttp.responseText,'text/xml');
    findById("1");
}

function findById(id) {
    let ids = xmlDoc.getElementsByTagName("id");
    for(let i = 0; i < ids.length; i++) {
        if(ids[i].childNodes[0].nodeValue == id) {
            setCollection(xmlDoc.getElementsByTagName("collection")[i]);
            return;
        };
    }
}

function setCollection(collection) {
    $("#collection-img").attr("src","Images/Catalog/" + collection.getElementsByTagName("id")[0].childNodes[0].nodeValue + "-1.png");
    console.log("Images/Catalog/" + collection.getElementsByTagName("id")[0].childNodes[0].nodeValue + "-1.png");
    title.innerHTML = collection.getElementsByTagName("title")[0].childNodes[0].nodeValue;
    description.innerHTML = collection.getElementsByTagName("description")[0].childNodes[0].nodeValue;
    year.innerHTML = "Year: " + collection.getElementsByTagName("year")[0].childNodes[0].nodeValue;
    belivery_volume.innerHTML = "Вelivery volume: " + collection.getElementsByTagName("belivery_volume")[0].childNodes[0].nodeValue;
    price.innerHTML = "$" + collection.getElementsByTagName("price")[0].childNodes[0].nodeValue;
}

xmlhttp.open("GET", "Data/catalog.xml", false);
xmlhttp.send();