

document.addEventListener("DOMContentLoaded", function () {


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
    const swordSound = new Audio('sounds/sword.mp3');
    swordSound.preload = 'auto';
    swordSound.volume = 0.5;
    const shieldSound = new Audio('sounds/shield.mp3');
    shieldSound.preload = 'auto';
    const shipSound = new Audio('sounds/ship.mp3');
    shipSound.preload = 'auto';

    const imgKnights = document.getElementById('img-knights');
    const imgShip = document.getElementById('img-ship');

    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');

    let winningSide = "pirates";
    let currentTimerColor = "white";

    const customDialog = document.getElementById('customDialog');
    const confirmResetButton = document.getElementById('confirm-reset');
    const cancelResetButton = document.getElementById('cancel-reset');

    const activeKnightsMovement = document.getElementById('active-knights-mov');

    const eventsContainer = document.getElementById('events');
    const eventBg = document.getElementById('event-bg');
    const eventImg = document.getElementById('event-img');
    let resetBtnClicked = false;
    let animationRunning = false;


    const totalAnimationDuration = 1500;

    let timerInterval = null;
    let minutes = 2;
    let seconds = 0;

    /************************************ */
    function showEventBg() {


        if (!animationRunning) {

            animationRunning = true;

            eventsContainer.style.display = 'block';
            eventBg.classList.add('fadeIn');
            setTimeout(() => {
                eventBg.classList.remove('fadeIn');
                eventBg.classList.add('fadeOut');

                eventBg.addEventListener('animationend', () => {
                    // This code will run when the 'fadeOut' animation is completed
                    eventsContainer.style.display = 'none';
                    eventBg.classList.remove('fadeOut');
                    eventImg.src = "";
                    eventImg.className = "";

                    if (resetBtnClicked) {
                        resetBtnClicked = false;
                    }

                    animationRunning = false;

                }, { once: true });

            }, totalAnimationDuration);

        }
    }


    function showSwordsEvent() {

        if (!animationRunning) {

            showEventBg();
            swordSound.play();
            eventImg.src = "img/event-swords.png";
            eventImg.classList.add('fadeInLeft');
            setTimeout(() => {
                eventImg.className = "";
                eventImg.classList.add('fadeOut');

            }, totalAnimationDuration);
        }
    }

    function showShatteredShieldEvent() {

        if (!animationRunning) {

            showEventBg();
            shieldSound.play();
            eventImg.src = "img/event-shield.png";
            eventImg.classList.add('fadeInTop');
            setTimeout(() => {
                eventImg.className = "";
                eventImg.classList.add('fadeOut');

            }, totalAnimationDuration);
        }
    }

    function showPirateShipEvent() {

        if (!animationRunning) {

            showEventBg();
            shipSound.play();
            eventImg.src = "img/event-pirate.png";
            eventImg.classList.add('fadeInRight');
            setTimeout(() => {
                eventImg.className = "";
                eventImg.classList.add('fadeOut');

            }, totalAnimationDuration);
        }
    }

    /**************************************** */

    function updateKnightShipGlow() {
        // change glow and effects (start if)
        let KnightCurrentCount = parseInt(KnightCount.textContent, 10);
        let BarbsCurrentCountBtn = parseInt(BarbsCount.textContent, 10);

        if (KnightCurrentCount >= BarbsCurrentCountBtn) {

            if (winningSide !== "knights") {

                showSwordsEvent();

                imgKnights.className = "";
                imgKnights.classList.add("glow-white");
                activeKnightsMovement.classList.add("active-knights");
                KnightCount.classList.add("glow-white");

                imgShip.className = "";
                imgShip.classList.add("losing-side");
                BarbsCount.className = "";
                BarbsCount.style.textShadow = "-7px -7px 0 #000, 7px -7px 0 #000, -7px 7px 0 #000, 7px 7px 0 #000";

                leftArrow.style.display = "block";
                rightArrow.style.display = "none";

                winningSide = "knights";



            }


            //change knights img color

            let OrangeCurrentCount = parseInt(OrangeButton.textContent, 10);
            let RedCurrentCount = parseInt(RedButton.textContent, 10);
            let BlueCurrentCount = parseInt(BlueButton.textContent, 10);
            let WhiteCurrentCount = parseInt(WhiteButton.textContent, 10);

            const knightsCount = [OrangeCurrentCount, RedCurrentCount, BlueCurrentCount, WhiteCurrentCount];

            function findDuplicateHighestNumbers(arr) {
                const maxNumber = Math.max(...arr); // Find the highest number in the array.
                let duplicates = [];
                if (maxNumber != 0) {
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i] === maxNumber) {
                            duplicates.push(arr[i]);
                        }
                    }
                    return duplicates;
                } else {
                    return [];
                }
            }

            const duplicateHighestNumbers = findDuplicateHighestNumbers(knightsCount);
            const highestValue = Math.max(...knightsCount);

            if (highestValue != 0 && duplicateHighestNumbers.length === 1) {

                if (highestValue === OrangeCurrentCount) {
                    imgKnights.src = "img/orange-knight.png";
                } else if (highestValue === RedCurrentCount) {
                    imgKnights.src = "img/red-knight.png";
                } else if (highestValue === BlueCurrentCount) {
                    imgKnights.src = "img/blue-knight.png";
                } else if (highestValue === WhiteCurrentCount) {
                    imgKnights.src = "img/white-knight.png";
                }
            } else {
                imgKnights.src = "img/black-knight.png";

            }

        } else {         // change glow and effects (else)

            if (winningSide !== "pirates") {

                if (!resetBtnClicked) {
                    showShatteredShieldEvent();

                }


                imgKnights.className = "";
                imgKnights.classList.add("losing-side");
                activeKnightsMovement.className = "";
                KnightCount.className = "";


                imgShip.classList.className = "";
                imgShip.classList.add("glow-red");
                BarbsCount.className = "";
                BarbsCount.classList.add("glow-red");
                BarbsCount.style.textShadow = "-7px -7px 0 #920000, 7px -7px 0 #6a0000, -7px 7px 0 #760000, 7px 7px 0 #740000";

                leftArrow.style.display = "none";
                rightArrow.style.display = "block";

                imgKnights.src = "img/black-knight.png";

                winningSide = "pirates";

            }

        }

    }
    
    function updateTimerDisplay() {

        clockDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if ((minutes === 1 && seconds >= 20) && currentTimerColor !== "green") {
            clockBtn.style.backgroundColor = 'chartreuse';
            clockBtn.style.boxShadow = "rgba(14, 11, 21, 0.54) 0 10px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#178700 0 -15px 0 inset";
            currentTimerColor = "green";
        }
        else if (((minutes === 0 && seconds >= 40) || (minutes === 1 && seconds < 20)) && currentTimerColor !== "yellow") {
            clockBtn.style.backgroundColor = 'yellow';
            clockBtn.style.boxShadow = "rgba(14, 11, 21, 0.54) 0 10px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#a19e01 0 -15px 0 inset";
            currentTimerColor = "yellow";
        }
        else if (((minutes === 0) && (seconds >= 1 && seconds < 40)) && currentTimerColor !== "red") {
            clockBtn.style.backgroundColor = 'red';
            clockBtn.style.boxShadow = "rgba(14, 11, 21, 0.54) 0 10px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#970404 0 -15px 0 inset";
            currentTimerColor = "red";
        }
        else if (minutes === 0 && seconds === 0) {
            clockBtn.style.backgroundColor = 'black';
            clockBtn.style.boxShadow = "rgba(14, 11, 21, 0.54) 0 10px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#000 0 -15px 0 inset";
        }

    }

    function startTimer() {
        timerInterval = setInterval(function () {
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
        currentTimerColor = "white";
        clockBtn.style.boxShadow = "rgba(14, 11, 21, 0.54) 0 10px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#d9e7d6 0 -15px 0 inset";
        clockBtn.style.backgroundColor = 'white';
        startSound.pause();
        startSound.currentTime = 0;

    }
    clockBtn.addEventListener('click', function () {

        if (timerInterval) {
            stopAndResetTimer();

        } else {
            startTimer();
            startSound.play();

        }
    });

    activeKnightsMovement.addEventListener('click', function () {

        // free slot 

    });

    BarbsCountBtn.addEventListener('click', function () {

        let BarbsCurrentCountBtn = parseInt(BarbsCount.textContent, 10);
        if (BarbsCurrentCountBtn > 0) {
            BarbsCurrentCountBtn--;
            BarbsCount.textContent = BarbsCurrentCountBtn;
            updateKnightShipGlow();
        }

    });

    BarbsBtn.addEventListener('click', function () {

        let BarbsCurrentCount = parseInt(BarbsCount.textContent, 10);
        if (BarbsCurrentCount >= 0) {
            BarbsCurrentCount++;
            BarbsCount.textContent = BarbsCurrentCount;
            updateKnightShipGlow();
        }

    });

    ResetButton.addEventListener('click', function () {
        customDialog.showModal();
    });


    confirmResetButton.addEventListener('click', () => {

        resetBtnClicked = true;
        OrangeButton.textContent = '0';
        RedButton.textContent = '0';
        BlueButton.textContent = '0';
        WhiteButton.textContent = '0';
        KnightCount.textContent = '0';
        updateKnightShipGlow();
        showPirateShipEvent();

        customDialog.close();
    });

    cancelResetButton.addEventListener('click', () => {
        customDialog.close();
    });

    function increaseKnightCount() {

        let KnightCurrentCount = parseInt(KnightCount.textContent, 10);
        KnightCurrentCount++;
        KnightCount.textContent = KnightCurrentCount;

        updateKnightShipGlow();

    }

    function decreaseKnightCount() {

        let KnightCurrentCount = parseInt(KnightCount.textContent, 10);
        KnightCurrentCount--;
        KnightCount.textContent = KnightCurrentCount;

        updateKnightShipGlow();
    }

    OrangeButton.addEventListener('click', function () {

        let OrangeCurrentCount = parseInt(OrangeButton.textContent, 10);
        OrangeCurrentCount++;
        OrangeButton.textContent = OrangeCurrentCount;

        increaseKnightCount();

    });

    RedButton.addEventListener('click', function () {

        let RedCurrentCount = parseInt(RedButton.textContent, 10);
        RedCurrentCount++;
        RedButton.textContent = RedCurrentCount;

        increaseKnightCount();

    });

    BlueButton.addEventListener('click', function () {

        let BlueCurrentCount = parseInt(BlueButton.textContent, 10);
        BlueCurrentCount++;
        BlueButton.textContent = BlueCurrentCount;

        increaseKnightCount();

    });

    WhiteButton.addEventListener('click', function () {

        let WhiteCurrentCount = parseInt(WhiteButton.textContent, 10);
        WhiteCurrentCount++;
        WhiteButton.textContent = WhiteCurrentCount;

        increaseKnightCount();

    });

    MinusOrangeButton.addEventListener('click', function () {

        let OrangeCurrentCount = parseInt(OrangeButton.textContent, 10);
        if (OrangeCurrentCount > 0) {
            OrangeCurrentCount--;
            OrangeButton.textContent = OrangeCurrentCount;

            decreaseKnightCount();
        }
    });

    MinusRedButton.addEventListener('click', function () {

        let RedCurrentCount = parseInt(RedButton.textContent, 10);
        if (RedCurrentCount > 0) {
            RedCurrentCount--;
            RedButton.textContent = RedCurrentCount;

            decreaseKnightCount();

        }
    });

    MinusBlueButton.addEventListener('click', function () {

        let BlueCurrentCount = parseInt(BlueButton.textContent, 10);
        if (BlueCurrentCount > 0) {
            BlueCurrentCount--;
            BlueButton.textContent = BlueCurrentCount;

            decreaseKnightCount();

        }
    });

    MinusWhiteButton.addEventListener('click', function () {

        let WhiteCurrentCount = parseInt(WhiteButton.textContent, 10);
        if (WhiteCurrentCount > 0) {
            WhiteCurrentCount--;
            WhiteButton.textContent = WhiteCurrentCount;

            decreaseKnightCount();

        }
    });


});
