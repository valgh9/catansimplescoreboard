
 
document.addEventListener("DOMContentLoaded", function() {
        
    
    const OrangeButton = document.getElementById('orange');
    const RedButton = document.getElementById('red');
    const BlueButton = document.getElementById('blue');
    const WhiteButton = document.getElementById('white');

    const MinusOrangeButton = document.getElementById('minus-orange');
    const MinusRedButton = document.getElementById('minus-red');
    const MinusBlueButton = document.getElementById('minus-blue');
    const MinusWhiteButton = document.getElementById('minus-white');

    const ResetButton = document.getElementById('reset-btn');

    const BarbsBtn = document.getElementById('barbs-ship-btn');

    const KnightCount = document.getElementById('knight-count');
    const BarbsCount = document.getElementById('barbs-count');
    const BarbsCountBtn = document.getElementById('barbs-count-btn');
    
    const clockBtn = document.getElementById('clock-btn');
    const clockDisplay = document.getElementById('timerDisplay');
      
    const startSound = new Audio('sounds/timer.mp3');
    startSound.preload = 'auto';
       
    const imgKnights = document.getElementById('img-knights');
    const imgShip = document.getElementById('img-ship');

    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');



    let timerInterval = null;
    let minutes = 2;
    let seconds = 0; 

    function updateKnightShipGlow(){

        let KnightCurrentCount = parseInt(KnightCount.textContent, 10);
        let BarbsCurrentCountBtn = parseInt(BarbsCount.textContent, 10);

        if (KnightCurrentCount >= BarbsCurrentCountBtn){

            imgKnights.classList.remove("#");
            imgKnights.classList.add("glow-white");
            KnightCount.classList.remove("#");
            KnightCount.classList.add("glow-white");

            imgShip.classList.remove("glow-red");
            imgShip.classList.add("#");
            BarbsCount.classList.remove("glow-red");
            BarbsCount.classList.add("#");
            BarbsCount.style.textShadow="-7px -7px 0 #000, 7px -7px 0 #000, -7px 7px 0 #000, 7px 7px 0 #000";

            leftArrow.style.display="block";
            rightArrow.style.display="none";

        } else{
            imgKnights.classList.remove("glow-white");
            imgKnights.classList.add("#");
            KnightCount.classList.remove("glow-white");
            KnightCount.classList.add("#");

            imgShip.classList.remove("#");
            imgShip.classList.add("glow-red");
            BarbsCount.classList.remove("#");
            BarbsCount.classList.add("glow-red");
            BarbsCount.style.textShadow="-7px -7px 0 #920000, 7px -7px 0 #6a0000, -7px 7px 0 #760000, 7px 7px 0 #740000";

            leftArrow.style.display="none";
            rightArrow.style.display="block";
        }


    }

    function updateTimerDisplay() {

        clockDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        if (minutes === 1 && seconds >= 20){ 
            clockBtn.style.backgroundColor = 'chartreuse'; 
            clockBtn.style.boxShadow="rgba(14, 11, 21, 0.54) 0 10px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#178700 0 -15px 0 inset";
        }
        else if ((minutes === 0 && seconds >= 40) || (minutes === 1 && seconds < 20)){ 
            clockBtn.style.backgroundColor = 'yellow';
            clockBtn.style.boxShadow="rgba(14, 11, 21, 0.54) 0 10px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#a19e01 0 -15px 0 inset";
        }
        else if ((minutes === 0 ) && (seconds >= 1 && seconds < 40)){ 
            clockBtn.style.backgroundColor = 'red';
            clockBtn.style.boxShadow="rgba(14, 11, 21, 0.54) 0 10px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#970404 0 -15px 0 inset";
        }
        else if (minutes === 0 && seconds === 0){
            clockBtn.style.backgroundColor = 'black';
            clockBtn.style.boxShadow="rgba(14, 11, 21, 0.54) 0 10px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#000 0 -15px 0 inset";
        }


}

function startTimer() {
    timerInterval = setInterval(function() {
        if (minutes === 0 && seconds === 0) {
            clearInterval(timerInterval);

        } else {
            if (seconds === 0) {
                minutes--;
                seconds = 59;
                
            } else {
                seconds--;
            }
            updateTimerDisplay();

        }
    }, 1000);
    }

    function stopAndResetTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        minutes = 2;
        seconds = 0;
        updateTimerDisplay();
        clockBtn.style.boxShadow="rgba(14, 11, 21, 0.54) 0 10px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#d9e7d6 0 -15px 0 inset";

    }
    clockBtn.addEventListener('click', function(){
        
        if (timerInterval) {
        stopAndResetTimer();
        clockBtn.style.backgroundColor = 'white';
        startSound.pause();
        startSound.currentTime = 0;

    } else {
        startTimer();
        startSound.pause();
        startSound.currentTime = 0;
        startSound.play();
        
    }
    });



    BarbsCountBtn.addEventListener('click', function() {

        let BarbsCurrentCountBtn = parseInt(BarbsCount.textContent, 10);
        if (BarbsCurrentCountBtn > 0){
            BarbsCurrentCountBtn--; 
            BarbsCount.textContent = BarbsCurrentCountBtn;
            updateKnightShipGlow();
        }

    });

    BarbsBtn.addEventListener('click', function() {

        let BarbsCurrentCount = parseInt(BarbsCount.textContent, 10);
        if (BarbsCurrentCount >= 0){
            BarbsCurrentCount++; 
            BarbsCount.textContent = BarbsCurrentCount;
            updateKnightShipGlow();
        }

    });

     ResetButton.addEventListener('click', function() {


        const isConfirmed = window.confirm("Are you sure you want to proceed?");

        if (isConfirmed) {
            OrangeButton.textContent = '0';
            RedButton.textContent = '0';
            BlueButton.textContent = '0';
            WhiteButton.textContent = '0';
            KnightCount.textContent = '0';
            updateKnightShipGlow();

        }
        });     


    OrangeButton.addEventListener('click', function() {

        let OrangeCurrentCount = parseInt(OrangeButton.textContent, 10);
        OrangeCurrentCount++; 
        OrangeButton.textContent = OrangeCurrentCount;

        let KnightCurrentCount = parseInt(KnightCount.textContent, 10);
        KnightCurrentCount++; 
        KnightCount.textContent = KnightCurrentCount;

        updateKnightShipGlow();


    });

    RedButton.addEventListener('click', function() {

        let RedCurrentCount = parseInt(RedButton.textContent, 10);
        RedCurrentCount++; 
        RedButton.textContent = RedCurrentCount;

        let KnightCurrentCount = parseInt(KnightCount.textContent, 10);
        KnightCurrentCount++; 
        KnightCount.textContent = KnightCurrentCount;

        updateKnightShipGlow();


    });

    BlueButton.addEventListener('click', function() {

        let BlueCurrentCount = parseInt(BlueButton.textContent, 10);
        BlueCurrentCount++; 
        BlueButton.textContent = BlueCurrentCount;

        let KnightCurrentCount = parseInt(KnightCount.textContent, 10);
        KnightCurrentCount++; 
        KnightCount.textContent = KnightCurrentCount;

        updateKnightShipGlow();

    });

    WhiteButton.addEventListener('click', function() {

        let WhiteCurrentCount = parseInt(WhiteButton.textContent, 10);
        WhiteCurrentCount++; 
        WhiteButton.textContent = WhiteCurrentCount;

        let KnightCurrentCount = parseInt(KnightCount.textContent, 10);
        KnightCurrentCount++; 
        KnightCount.textContent = KnightCurrentCount;

        updateKnightShipGlow();

    });

    MinusOrangeButton.addEventListener('click', function() {

        let OrangeCurrentCount = parseInt(OrangeButton.textContent, 10);
        if (OrangeCurrentCount > 0){
            OrangeCurrentCount--; 
            OrangeButton.textContent = OrangeCurrentCount;

            let KnightCurrentCount = parseInt(KnightCount.textContent, 10);
            KnightCurrentCount--; 
            KnightCount.textContent = KnightCurrentCount;

            updateKnightShipGlow();

        }
    });

    MinusRedButton.addEventListener('click', function() {

        let RedCurrentCount = parseInt(RedButton.textContent, 10);
        if (RedCurrentCount > 0){
            RedCurrentCount--; 
            RedButton.textContent = RedCurrentCount;

            let KnightCurrentCount = parseInt(KnightCount.textContent, 10);
            KnightCurrentCount--; 
            KnightCount.textContent = KnightCurrentCount;

            updateKnightShipGlow();

        }
    });

    MinusBlueButton.addEventListener('click', function() {

        let BlueCurrentCount = parseInt(BlueButton.textContent, 10);
        if (BlueCurrentCount > 0){
            BlueCurrentCount--; 
            BlueButton.textContent = BlueCurrentCount;

            let KnightCurrentCount = parseInt(KnightCount.textContent, 10);
            KnightCurrentCount--; 
            KnightCount.textContent = KnightCurrentCount;

            updateKnightShipGlow();

        }
    });

    MinusWhiteButton.addEventListener('click', function() {

        let WhiteCurrentCount = parseInt(WhiteButton.textContent, 10);
        if (WhiteCurrentCount > 0){
            WhiteCurrentCount--; 
            WhiteButton.textContent = WhiteCurrentCount;

            let KnightCurrentCount = parseInt(KnightCount.textContent, 10);
            KnightCurrentCount--; 
            KnightCount.textContent = KnightCurrentCount;

            updateKnightShipGlow();

        }
    });


});