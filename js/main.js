function startObservingRoom() {

    roomID = document.querySelector("#roomID");
    roomID = roomID.textContent;

    observeAdmin(roomID);

    renderCards(roomID);

    updateLeaderBoard(roomID);

    window.setInterval(function() {
        observeRoom(roomID);
    }, 1000);

}

function addScore(el) {
    var pott = parseInt(bet.innerText);
    if (isNaN(pott)) {
        pott = 0;
    }
    bet.innerText = pott + 10;
    updateBetAmount(bet.innerText);
    el.disabled = true;
    setTimeout(function() { el.disabled = false; }, 500);
    counterAnimation('bet');
}
var clicked = 1;

function subScore(el) {
    var pott = parseInt(bet.innerText);
    if (isNaN(pott)) {
        pott = 0;
    }
    if (this.bet.innerText >= 0) {
        bet.innerText = parseInt(pott) - 10;
        updateBetAmount(pott);
    }
    if (clicked == 1) {
        el.click();
    }
    el.disabled = true;
    setTimeout(function() { el.disabled = false; }, 500);
}

function updateBetAmount(betAmount) {
    roomID = document.querySelector("#roomID");
    roomID = roomID.textContent;
    $.ajax('../api/updateBetAmount.php', {
        data: {
            roomID: roomID,
            betAmount: betAmount
        },
        contentType: 'application/json',
        dataType: 'json', // type of response data
        //timeout: 500,     // timeout milliseconds
        success: function(data, status, xhr) { // success callback function
            // console.log(data);
            console.log("Bet Amount Updated.");

        },
        error: function(textStatus, errorMessage) { // error callback 
            console.log(textStatus);
            console.log(errorMessage);
        }
    });

}

function observeAdmin(roomID) {
    // console.log("ObserveAdmin Called");
    username2 = document.querySelector("#username");
    username2 = username2.innerText;
    $.ajax('../api/observeRoom.php', {
        data: { roomID: roomID },
        contentType: 'application/json',
        dataType: 'json', // type of response data
        //timeout: 500,     // timeout milliseconds
        success: function(data, status, xhr) { // success callback function
            if (data.isAdmin == username2) {
                if (localStorage.getItem('initialisePot') === null) {
                    // console.log("calling initialisePotEvent");
                    initialisePotEvent();
                    localStorage.setItem('initialisePot', true);
                } else {
                    // console.log("user is admin but pot already initialised");
                }

            } else {
                // console.log("Yeh user admin nahi hai");
            }
        },
        error: function(textStatus, errorMessage) { // error callback 
            // console.log(jqxhr);
            console.log(textStatus);
            console.log(errorMessage);
        }
    });

}

function observeRoom(roomID) {
    add = document.querySelector("#add");
    sub = document.querySelector("#sub");
    bet = document.querySelector("#bet");
    buttonHolder = document.querySelector("#buttonHolder");
    username2 = document.querySelector("#username");
    username2 = username2.innerText;
    isPlaying2 = document.querySelector("#isPlaying");
    potBalance = document.querySelector("#pot");

    updateCards(roomID);
    $.ajax('../api/observeRoom.php', {
        data: { roomID: roomID },
        contentType: 'application/json',
        dataType: 'json', // type of response data
        //timeout: 500,     // timeout milliseconds
        success: function(data, status, xhr) { // success callback function
            players = JSON.parse(data.players);
            potBalance.innerText = data.potBalance;
            previousPlayer = localStorage.getItem('previousPlayer');
            if (previousPlayer != data.isPlaying) {
                updateLeaderBoard(roomID);
            }
            // if (data.isPlaying != isPlaying2.innerText)
            //     renderCards(roomID);
            isPlaying2.innerText = data.isPlaying;
            localStorage.setItem('previousPlayer', data.isPlaying);
            if (data.action >= 0)
                bet.innerText = data.action;
            else
                bet.innerText = 0;
            if (data.isPlaying == username2) {
                buttonHolder.classList.add("d-flex");
                buttonHolder.classList.remove("d-none");
                add.classList.add("d-block");
                add.classList.remove("d-none");
                sub.classList.add("d-block");
                sub.classList.remove("d-none");
                bet.classList.remove("w-50");
                potBalance.classList.add("w-50");
            } else {
                buttonHolder.classList.add("d-none");
                buttonHolder.classList.remove("d-flex");
                add.classList.remove("d-block");
                add.classList.add("d-none");
                sub.classList.remove("d-block");
                sub.classList.add("d-none");
                bet.classList.add("w-50");
                potBalance.classList.add("w-50");
            }
        },
        error: function(textStatus, errorMessage) { // error callback 
            // console.log(jqxhr);
            console.log(textStatus);
            console.log(errorMessage);
        }
    });
}

function observeRoomStart(roomID, username) {
    $.ajax('api/observeRoom.php', {
        data: { roomID: roomID },
        contentType: 'application/json',
        dataType: 'json', // type of response data
        //timeout: 500,     // timeout milliseconds
        success: function(data, status, xhr) { // success callback function
            if (data) {
                if (data.isAdmin == username) {
                    console.log("Player is admin, shouldn't see this msg");
                } else {
                    window.location.href = "app/";
                }
            }

        },
        error: function(textStatus, errorMessage) { // error callback 
            // console.log(jqxhr);
            console.log(textStatus);
            console.log(errorMessage);
        }
    });
}

function roomStartEventListener(roomID, username) {
    window.setInterval(function() {
        observeRoomStart(roomID, username);
    }, 1000);
}

function renderCards(roomID, username) {
    $.ajax('../api/observeRoom.php', {
        data: { roomID: roomID },
        contentType: 'application/json',
        dataType: 'json', // type of response data
        //timeout: 500,     // timeout milliseconds
        success: function(data, status, xhr) { // success callback function
            deckIndex = parseInt(data.deckIndex);
            myDeckJSON = JSON.parse(data.deck);
            document.getElementById('stage').innerHTML = '';
            for (var i = 0; i < 2; i++) {
                var card = document.createElement("div");
                var value = document.createElement("div");
                var suit = document.createElement("div");

                card.className = "card1 shadow-lg";
                card.id = "card" + i;
                value.className = "value";
                value.id = "value" + i;

                suit.className = "suit " + myDeckJSON[(deckIndex + i)].substr(2);
                suit.id = "suit" + i;
                value.innerHTML = myDeckJSON[(deckIndex + i)].substr(0, 2);
                card.appendChild(value);
                card.appendChild(suit);

                document.getElementById("stage").appendChild(card);

            }
        },
        error: function(textStatus, errorMessage) { // error callback 
            // console.log(jqxhr);
            console.log(textStatus);
            console.log(errorMessage);
            window.alert("not working");
        }
    });
}

function updateCards(roomID, username) {
    $.ajax('../api/observeRoom.php', {
        data: { roomID: roomID },
        contentType: 'application/json',
        dataType: 'json', // type of response data
        //timeout: 500,     // timeout milliseconds
        success: function(data, status, xhr) { // success callback function
            deckIndex = parseInt(data.deckIndex);
            myDeckJSON = JSON.parse(data.deck);
            // document.getElementById('stage').innerHTML = '';
            for (var i = 0; i < 2; i++) {
                // var card = document.getElementById("card" + i);
                var value = document.getElementById("value" + i);
                var suit = document.getElementById("suit" + i);

                suit.className = "suit " + myDeckJSON[(deckIndex + i)].substr(2);
                value.innerHTML = myDeckJSON[(deckIndex + i)].substr(0, 2);

            }
        },
        error: function(textStatus, errorMessage) { // error callback 
            // console.log(jqxhr);
            console.log(textStatus);
            console.log(errorMessage);
            window.alert("Update card not working");
        }
    });
}

function initialisePotEvent() {
    roomID = document.querySelector('#roomID');
    roomID = roomID.innerText;
    $.ajax('../api/initialisePot.php', {
        data: { roomID: roomID },
        contentType: 'application/json',
        dataType: 'json', // type of response data
        //timeout: 500,     // timeout milliseconds
        success: function(data, status, xhr) { // success callback function
            //players = JSON.parse(data.players);
            console.log("Pot Initialised.");
        },
        error: function(textStatus, errorMessage) { // error callback 
            console.log("Pot Initialise Failed: " + errorMessage);
        }
    });
}

function revealCard() {
    cardRevealOverlay = document.querySelector(".cardRevealOverlay");
    cardRevealOverlay.style.display = "flex";
    setTimeout(function() { cardRevealOverlay.style.display = "none"; }, 5000);
}

function actionBet() {
    revealCard();
    roomID = document.querySelector("#roomID");
    roomID = roomID.textContent;
    $.ajax('../api/actionBet.php', {
        data: {
            roomID: roomID,
            action: "doBet"
        },
        contentType: 'application/json',
        dataType: 'json', // type of response data
        //timeout: 500,     // timeout milliseconds
        success: function(data, status, xhr) { // success callback function
            // console.log("Bet Action Completed:");
            // console.log(data.betResult);
            betCard = data.betResult.betCardName;
            firstCard = data.betResult.firstCardName;
            secondCard = data.betResult.secondCardName;

            document.getElementById("firstCardValue").innerText = firstCard.substr(0, 2);
            document.getElementById("secondCardValue").innerText = secondCard.substr(0, 2);
            document.getElementById("betCardValue").innerText = betCard.substr(0, 2);

            document.getElementById("firstCardSuit").classList.add(firstCard.substr(2).split(" ").join(""));
            document.getElementById("secondCardSuit").classList.add(secondCard.substr(2).split(" ").join(""));
            document.getElementById("betCardSuit").classList.add(betCard.substr(2).split(" ").join(""));

        },
        error: function(textStatus, errorMessage) { // error callback 
            console.log("Bet Action Failed: " + errorMessage);
        }
    });
    renderCards(roomID);
    updateLeaderBoard(roomID);
    counterAnimation('bet');
    counterAnimation('pot');
}

function actionPass() {
    roomID = document.querySelector("#roomID");
    roomID = roomID.textContent;
    $.ajax('../api/actionBet.php', {
        data: {
            roomID: roomID,
            action: "doPass"
        },
        contentType: 'application/json',
        dataType: 'json', // type of response data
        //timeout: 500,     // timeout milliseconds
        success: function(data, status, xhr) { // success callback function
            // console.log("Pass Action Completed: " + data);
        },
        error: function(textStatus, errorMessage) { // error callback 
            console.log("Bet Action Failed: " + errorMessage);
        }
    });
    renderCards(roomID);
    updateLeaderBoard(roomID);
}

function actionBanko() {
    roomID = document.querySelector("#roomID");
    roomID = roomID.textContent;
    $.ajax('../api/actionBet.php', {
        data: {
            roomID: roomID,
            action: "doBanko"
        },
        contentType: 'application/json',
        dataType: 'json', // type of response data
        //timeout: 500,     // timeout milliseconds
        success: function(data, status, xhr) { // success callback function
            // console.log("Banko Action Completed: "+ data);
        },
        error: function(textStatus, errorMessage) { // error callback 
            console.log("Banko Action Failed: " + errorMessage);
        }
    });
    renderCards(roomID);
    updateLeaderBoard(roomID);
}

function updateLeaderBoard(roomID) {
    leaderboard = document.getElementById("leaderboard");
    $.ajax('../api/leaderboard.php', {
        data: {
            roomID: roomID
        },
        contentType: 'application/json',
        dataType: 'json', // type of response data
        //timeout: 500,     // timeout milliseconds
        success: function(data, status, xhr) { // success callback function
            // console.log("Fetched Leaderboard.");
            insertedData = ' ';
            data.forEach(player => {
                insertedData += '<tr><td>' + player.username + '</td><td>' + player.amount + '</td ></tr>';
            });
            leaderboard.innerHTML = insertedData;
        },
        error: function(textStatus, errorMessage) { // error callback 
            console.log("Banko Action Failed: " + errorMessage);
        }
    });

}

function counterAnimation(animate) {
    $('#' + animate).each(function() {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 500,
            easing: 'swing',
            step: function(now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
}