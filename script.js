const colors = {
    "0": "#000000", "1": "#8B4513", "2": "#FF0000", "3": "#FFA500", 
    "4": "#FFFF00", "5": "#008000", "6": "#0000FF", "7": "#EE82EE", 
    "8": "#808080", "9": "#FFFFFF", "10": "#8B4513", "100": "#FF0000",
    "1000": "#FFA500", "10000": "#FFFF00", "100000": "#008000", 
    "1000000": "#0000FF", "10000000": "#EE82EE", "±5%": "#FFD700", "±10%": "#C0C0C0"
};

// Robot Click Ovoz Effektini Simulyatsiya qilish (Audio Sintezator)
function playCyberClick() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); // Chiroqli robotik signal tovushi
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.05);
}

function hisoblaVaChaliq() {
    playCyberClick();
    hisobla();
}

function hisobla() {
    let b1 = document.getElementById("band1").value;
    let b2 = document.getElementById("band2").value;
    let b3 = document.getElementById("band3").value;
    let b4 = document.getElementById("band4").value;

    let elB1 = document.getElementById("b1");
    let elB2 = document.getElementById("b2");
    let elB3 = document.getElementById("b3");
    let elB4 = document.getElementById("b4");
    let displayBox = document.getElementById("displayBox");

    // Ranglarni real vaqtda neon stilga keltirish
    elB1.style.backgroundColor = colors[b1];
    elB2.style.backgroundColor = colors[b2];
    elB3.style.backgroundColor = colors[b3];
    elB4.style.backgroundColor = colors[b4];

    // Neon halqalarni pulsatsiyalash animatsiyasi
    [elB1, elB2, elB3, elB4].forEach(el => {
        el.classList.remove("animate-pop");
        void el.offsetWidth; 
        el.classList.add("animate-pop");
    });

    // Matematik hisoblash formulasi
    let qiymat = (parseInt(b1) * 10 + parseInt(b2)) * parseInt(b3);
    let tekstQiymat = "";

    if (qiymat >= 1000000) { tekstQiymat = (qiymat / 1000000) + " MΩ"; } 
    else if (qiymat >= 1000) { tekstQiymat = (qiymat / 1000) + " kΩ"; } 
    else { tekstQiymat = qiymat + " Ω"; }

    document.getElementById("result").innerText = tekstQiymat + " " + b4;

    // Natija yangilanganda ekranni neon effektda miltillatish
    displayBox.classList.remove("pulse-update");
    void displayBox.offsetWidth;
    displayBox.classList.add("pulse-update");
}

// Avtomatik nusxalash (Auto-Copy) funksiyasi
function nusxaOling() {
    let natijaMatni = document.getElementById("result").innerText;
    navigator.clipboard.writeText(natijaMatni).then(() => {
        let hint = document.getElementById("copyHint");
        hint.innerText = "Nusxalandi! ✅";
        hint.style.color = "#00ff87";
        setTimeout(() => {
            hint.innerText = "Nusxalash uchun ustiga bosing 📋";
            hint.style.color = "#64748b";
        }, 1500);
    });
}

// Boshlang'ich yuklash
window.onload = function() {
    hisobla();
};
