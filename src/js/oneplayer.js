// человек играет первым, то есть крестиками
const human = '<img class="cell__img" id="cross-img" src="./assets/img/cross.svg">';
const computer = '<img class="cell__img" id="circle-img" src="./assets/img/circle.svg">';

function isEmpty() {
    let arr = [];

    for(const [id, cell] of cells.entries()) {
        if(cell.innerHTML == '') {
            arr.push(id);
        }
    }

    return arr;
}

function clickAICell(e) {
    if(counter%2 == 0){
        // ставим крестик
        e.target.innerHTML = human;
        // кто идет след
        document.getElementById('subtitle').textContent = 'ход вашего соперника';

        if(isWinner()) {
            for(let cell of cells) {
                // убираем возможность ходить дальше
                cell.removeEventListener('click', clickAICell);
            }
            if(counter%2 == 0) {
                showConfetti(true);
                document.getElementById('subtitle').textContent = 'ВЫ ПОБЕДИЛИ!';
            } else {
                document.getElementById('subtitle').textContent = 'ВЫ ПРОИГРАЛИ!';
            }
        } else if(counter == 8) {
            document.getElementById('subtitle').textContent = 'НИЧЬЯ!';
        } else {
            setTimeout(() => {
                // массив с индексами свободных мест
                let available = isEmpty();
                // рандомное число
                let randomNum = Math.ceil(Math.random() * available.length) - 1;
                // подставляем к массиву со свободными местами 
                let step = available[randomNum];
                // ставим нолик
                cells[step].innerHTML = computer;
                // убираем функцию
                cells[step].removeEventListener('click', clickAICell);
                // меняем тайтл
                document.getElementById('subtitle').innerHTML = 'ваш ход';
                 // добавляем новый шаг
                counter++;
                // избегаем возможность повторного нажатия на клетку
                e.target.removeEventListener('click', clickAICell);
            }, 3000);
        }
    }

    // добавляем новый шаг
    counter++;
    // избегаем возможность повторного нажатия на клетку
    e.target.removeEventListener('click', clickAICell);
}

function startAIGame() {
    counter = 0;

    document.getElementById('subtitle').innerHTML = 'ваш ход';
    startBtn.addEventListener('click', startAIGame);

    showConfetti(false);

    for(let cell of cells) {
        // убираем все с клетов и присваиваем им функцию
        cell.innerHTML = '';
        cell.addEventListener('click', clickAICell);
    }
}

compBtn.addEventListener('click', () => {
    // убираем кнопку начало
    beginBtn.remove();
    compBtn.remove();
    // контейнер и заголовок делаем видимыми
    document.getElementById('subtitle').style.display = 'flex';
    document.getElementById('subtitle').innerHTML = 'ваш ход';
    document.getElementById('container').style.display = 'flex';

    quantity = 1;
    startAIGame();
});