const metricRadio = document.getElementById('metrik');
const imperialRadio = document.getElementById('imperial');
const metricInputs = document.querySelectorAll('.metrik-input');
const imperialInputs = document.querySelectorAll('.imperial-input');
const submitButton = document.getElementById('calculate');
const resetButton = document.getElementById('reset-btn');

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('input').reset();
});

metricRadio.addEventListener('change', function() {
    if (this.checked) {
        metricInputs.forEach(input => input.style.display = 'grid');
        imperialInputs.forEach(input => input.style.display = 'none');
    }
});

imperialRadio.addEventListener('change', function() {
    if (this.checked) {
        metricInputs.forEach(input => input.style.display = 'none');
        imperialInputs.forEach(input => input.style.display = 'grid');
    }
});

resetButton.addEventListener('click', function(e){
    e.preventDefault();
    document.getElementById('input').reset();
})

var bmi = 0.00;
submitButton.addEventListener('click', function(e){
    e.preventDefault();
    
    var totalInches = 0;
    if(metricRadio.checked){
        const kgInput = parseInt(document.getElementById('berat-kg').value);
        const cmInput = parseInt(document.getElementById('tinggi-cm').value);
        bmi = countBmiMetric(kgInput, cmInput);
    }
    else{
        const lbsInput = parseInt(document.getElementById('berat-lbs').value);
        const feetInput = parseInt(document.getElementById('tinggi-kaki').value);
        const inInput = parseInt(document.getElementById('tinggi-inci').value);
        totalInches = (feetInput * 12) + inInput;
        bmi = countBmiImperial(lbsInput, totalInches);
    }
    createResultElement(bmi);
});

function createResultElement(bmi){
    const existingResult = document.getElementById('bmi-result');
    if (existingResult) {
        existingResult.remove();
    }

    const resultDiv = document.createElement('div');
    resultDiv.id = 'bmi-result';
    resultDiv.innerHTML = `
    <div id ="head3">
        <h3>${getHeadings(bmi)}</h3>
    </div> 
        <p>Berat badan kamu ${getBmiCategory(bmi)}.</p>
        <p>Hasil perhitungan BMI kamu adalah sebesar : ${bmi}</p>
        <p>${getAdvice(bmi)}</p>
    `;

    resultDiv.className = 'bmi-result';
    const container = document.querySelector('.container');
    container.appendChild(resultDiv);
    headingsStyle(bmi);
}

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        evt.preventDefault();
}


function getHeadings(bmi){
    if (bmi < 18.5) return "Masih kurang nih...";
    if (bmi < 24.9) return "Selamat!";
    else return "Yahhh...";
}

function headingsStyle(bmi){
    const element = document.querySelector('.bmi-result #head3');
    if (bmi < 29. && bmi > 18.5){
        element.style.backgroundColor = "45a049";
    }else{
        element.style.backgroundColor = "rgb(216, 13, 13)";
    }
}

function getBmiCategory(bmi) {
    if (bmi < 18.5) return "kurang";
    if (bmi < 24.9) return "normal";
    if (bmi < 29.9) return "berlebih";
    else return "obesitas";
}

function getAdvice(bmi){
    if (bmi < 18.5) return "Perbanyak konsumsi makanan bernutrisi tinggi untuk membangun tubuh kamu.";
    if (bmi < 24.9) return "Pertahankan pola hidup sehat dan makan sesuai dengan kebutuhan kalori harian kamu. Salam sehat!";
    else return "Kamu harus segera diet dan rajin berolahraga...";
}

function countBmiMetric(kg, cm){
    const res = (kg / ((cm / 100)**2));
    return res.toFixed(2);
}

function countBmiImperial(lbs, inches){
    const res = (703 * (lbs / (inches**2)));
    return res.toFixed(2);
}
