$(document).ready(function () {

    const symbols = ["🕷️","🦈","🦖","🐊","🐸","🐭","🐙","🦁","🐱‍👤","🐱‍👓"];

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let gameStarted = false;

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function createBoard() {
        $(".game-board").empty();

        const doubled = shuffle([...symbols, ...symbols]);

        $.each(doubled, function (index, symbol) {
            const card = $(`
                <div class="card" data-symbol="${symbol}" style="animation: dealCard 0.3s ease-out ${index * 0.05}s both">
                    <div class="card-inner">
                        <div class="card-face card-front"></div>
                        <div class="card-face card-back">${symbol}</div>
                    </div>
                </div>
            `);

            $(".game-board").append(card);
        });
    }

    function startGame() {
        firstCard = null;
        secondCard = null;
        lockBoard = false;
        gameStarted = true;

        createBoard();

        $("#controlBtn").text("Finish");
    }

    function finishGame() {
        $(".card").each(function(index) {
            $(this).addClass("flipped");
            $(this).css("animation", `finishGame 0.3s ease-out ${index * 0.03}s both`);
        });
        $(".card").off("click");

        gameStarted = false;
        $("#controlBtn").text("Start");
    }

    function resetTurn() {
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    }

    function checkWin() {
        if ($(".matched").length === $(".card").length) {
            setTimeout(function () {
                $(".card").each(function(index) {
                    $(this).css("animation", `winPulse 0.5s ease-out ${index * 0.05}s infinite`);
                });
                
                setTimeout(function() {
                    alert("всё наигрался, иди учи C#!");
                    finishGame();
                }, 1000);
            }, 500);
        }
    }

    $(".game-board").on("click", ".card", function () {
        if (!gameStarted) return;
        if (lockBoard) return;
        if ($(this).hasClass("flipped") || $(this).hasClass("matched")) return;

        $(this).addClass("flipped").css("animation", "flipIn 0.3s ease-out");

        if (!firstCard) {
            firstCard = $(this);
            return;
        }

        secondCard = $(this);
        lockBoard = true;

        if (firstCard.data("symbol") === secondCard.data("symbol")) {
            firstCard.addClass("matched").css("animation", "matchSuccess 0.5s ease-out");
            secondCard.addClass("matched").css("animation", "matchSuccess 0.5s ease-out");

            resetTurn();
            checkWin();
        } else {
            setTimeout(function () {
                firstCard.removeClass("flipped").css("animation", "flipOut 0.3s ease-in");
                secondCard.removeClass("flipped").css("animation", "flipOut 0.3s ease-in");
                resetTurn();
            }, 1000);
        }
    });

    $("#controlBtn").click(function () {
        if (!gameStarted) {
            startGame();
        } else {
            finishGame();
        }
    });


});
