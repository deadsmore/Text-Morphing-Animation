let elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

let texts = [
    "Каждый ",
    "охотник",
    "хочет",
    "знать",
    "где",
    "сидит",
    "фазан",
    `=)`

];

let morphTime = 1;
let cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];  // text[1] и тд
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;  //дробная часть морфа

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {

    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`; //для второго слова
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`; //для первого слова
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;             //текст когда просто стоит

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}


function animate() {
    requestAnimationFrame(animate); //сообщает браузеру, что вы хотите выполнить анимацию, и запрашивает,
    // чтобы браузер вызвал указанную функцию для обновления анимации перед следующей перерисовкой.

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {             //если кулдан заканчивается, то
        if (shouldIncrementIndex) {
            textIndex++;            //следующие слово
        }

        doMorph();
    } else {
        doCooldown();           //если кулдаун идёт, текст просто в морфе
    }
}


animate();