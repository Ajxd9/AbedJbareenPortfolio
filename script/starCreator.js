let stars = document.getElementById("starsMain");
const starCount = 50;
let iconList = ["html", "css", "sass", "js", "oop", "typescript", "api", "react", "nodejs"];
function starCreate() {
    let max = 0, min = 12;
    for (let index = 0; index < starCount; index++) {
        let randomizer = Math.floor(Math.random() * 8 + 0);
        let star = document.createElement("div");
        star.className = "star";
        stars.appendChild(star);
        let icon = document.createElement("img");
        icon.className = "icon";
        icon.src = "./images/techIcons/" + iconList[randomizer] + ".png";
        star.appendChild(icon);
    }
}

starCreate();