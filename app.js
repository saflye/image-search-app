const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageListWrapper = document.querySelector(".imagelist-wrapper");

runEventListeners();
function runEventListeners() {
    form.addEventListener("submit", search);
    clearButton.addEventListener("click", clear);
}



function clear() {
    searchInput.value = "";
    Array.from(imageListWrapper.children).forEach((child) => child.remove())

}

function search(e) {
    const value = searchInput.value.trim();//trim:baş ve sondaki gereksiz boşluklar kaldırılır
    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
        method: "GET",
        headers: {
            Authorization: "Client-ID PrZuy0C4EUf5s_SzZ12OaBWjxwKCE1Vzib07HT7b8mI"
        }
    })
        .then((res) => res.json())
        .then((data) => {
            Array.from(data.results).forEach((image) => {
                // console.log(image.urls.small)
                addImageToUI(image.urls.small)
            })
        })
        .catch((err) => console.log(err))



    e.preventDefault(); //Bu yöntem, formun varsayılan gönderim davranışını engeller. Yani, form verileri sunucuya gönderilmez ve sayfa yeniden yüklenmez.
}

function addImageToUI(url) {
    const div = document.createElement("div");
    div.className = "card";

    const img = document.createElement("img");
    img.setAttribute("src", url);
    img.height = '400';
    img.width = '400';

    div.appendChild(img);
    imageListWrapper.appendChild(div);

}

