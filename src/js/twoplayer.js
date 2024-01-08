// cчетчик кол-во шагов
let counter = 0;

// ячейки в таблице
let cells = document.querySelectorAll('.cell');

// заголовок
let title = document.getElementById('title');

const combos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function isWinner() {
    for(let combo of combos) {
        if(cells[combo[0]].innerHTML == cells[combo[1]].innerHTML && cells[combo[1]].innerHTML == cells[combo[2]].innerHTML && cells[combo[0]].innerHTML != '') {
            return true;
        }
    }

    return false;
}

// confetti 
function showConfetti(answer) {
    let confetti = document.getElementById('confetti-container');
    if(answer) {
        confetti.style.display = 'block';
    } else {
        confetti.style.display = 'none';
    }
}

function clickCell(e) {
    // первые идут крестики 
    // проверяем четное ли кол-во шагов
    if(counter%2 == 0){
        // ставим крестик
        e.target.innerHTML = '<img class="cell__img" id="cross-img" src="./assets/img/cross.svg">';
        // кто идет след
        document.getElementById('subtitle-move').textContent = 'нолики';
    } else {
        // ставим нолик
        e.target.innerHTML = '<img class="cell__img" id="circle-img" src="./assets/img/circle.svg">';
        // кто идет след
        document.getElementById('subtitle-move').textContent = 'крестики';
    }

    // проверяем, есть ли победитель 
    if(isWinner()) {
        for(let cell of cells) {
            // убираем возможность ходить дальше
            cell.removeEventListener('click', clickCell);
        }
        if(counter%2 == 0) {
            showConfetti(true);
            document.getElementById('subtitle').textContent = 'победили КРЕСТИКИ!';
        } else {
            showConfetti(true);
            document.getElementById('subtitle').textContent = 'победили НОЛИКИ!';
        }
    } else if(counter == 8) {
        document.getElementById('subtitle').textContent = 'НИЧЬЯ!';
    }
    // добавляем новый шаг
    counter++;
    // избегаем возможность повторного нажатия на клетку
    e.target.removeEventListener('click', clickCell);
}

let startBtn = document.getElementById('btn-start');

function startGame() {
    counter = 0;

    document.getElementById('subtitle').innerHTML = 'ход делает&nbsp;<span id="subtitle-move">крестики</span>';

    startBtn.addEventListener('click', startGame);

    showConfetti(false);

    for(let cell of cells) {
        // убираем все с клетов и присваиваем им функцию
        cell.innerHTML = '';
        cell.addEventListener('click', clickCell);
    }
}


let beginBtn = document.getElementById('btn-begin');
let compBtn = document.getElementById('btn-play-computer');

let quantity;

beginBtn.addEventListener('click', () => {
    // убираем кнопку начало
    beginBtn.remove();
    compBtn.remove();
    // контейнер и заголовок делаем видимыми
    document.getElementById('subtitle').style.display = 'flex';
    document.getElementById('container').style.display = 'flex';
    // запускаем игру
    document.getElementById('subtitle').innerHTML = 'ход делает&nbsp;<span id="subtitle-move">крестики</span>';
    quantity = 2;
    startGame();
});

document.getElementById('btn-back').addEventListener('click', () => {
    title.insertAdjacentElement('afterend', beginBtn);
    beginBtn.insertAdjacentElement('afterend', compBtn);
    document.getElementById('subtitle').style.display = 'none';
    document.getElementById('container').style.display = 'none';
    showConfetti(false);
    // убираем функции с элемента
    if(quantity == 2) {
        startBtn.removeEventListener('click', startGame);
        for(let cell of cells) {
            cell.removeEventListener('click', clickCell);
        }
    } else if(quantity == 1) {
        startBtn.removeEventListener('click', startAIGame);
        for(let cell of cells) {
            cell.removeEventListener('click', clickAICell);
        }
    }
});