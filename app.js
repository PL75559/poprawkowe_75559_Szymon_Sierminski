// Konfiguracja projektu
// Student: Szymon Siermiński 75559
const STORAGE_KEY = 'sierminski_75559_tasks';

// Inicjalizacja tablicy z Local Storage
let myTasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Referencje do elementów DOM
const domForm = document.getElementById('task-manager-form');
const inputName = document.getElementById('task-name');
const inputCat = document.getElementById('task-category');
const inputDate = document.getElementById('task-date');
const checkStatus = document.getElementById('task-status');
const editIdHolder = document.getElementById('edit-id');
const board = document.getElementById('task-board');
const notifyBox = document.getElementById('notification-area');

// Odświeżanie interfejsu (Renderowanie)
function refreshBoard() {
    board.innerHTML = '';
    document.getElementById('task-counter').textContent = myTasks.length;

    if (myTasks.length === 0) {
        board.innerHTML = '<p style="color: gray; text-align: center;">Brak zaplanowanych zadań. Czas coś dodać!</p>';
        return;
    }

    myTasks.forEach((task, index) => {
        // Tworzenie karty zadania
        const card = document.createElement('div');
        card.className = `task-card ${task.isDone ? 'is-done' : ''}`;

        card.innerHTML = `
            <div class="task-details">
                <h3>${task.name}</h3>
                <div class="tags">
                    <span class="tag-badge">📌 ${task.category}</span>
                    <span class="tag-badge">⏳ ${task.deadline || 'Brak daty'}</span>
                    <span class="tag-badge">🔥 ${task.priority}</span>
                </div>
            </div>
            <div class="task-controls">
                <button onclick="triggerEdit(${index})" class="button btn-sm btn-edit">Opcje</button>
                <button onclick="triggerDelete(${index})" class="button btn-sm btn-delete">X</button>
            </div>
        `;
        board.appendChild(card);
    });
}

// Funkcja pokazująca wiadomości
function showMsg(txt, typeClass) {
    notifyBox.textContent = txt;
    notifyBox.className = `notify-box ${typeClass}`;
    setTimeout(() => { notifyBox.className = "notify-box hidden-element"; }, 3500);
}

// Walidator
function checkInputs(n, c) {
    let valid = true;
    document.getElementById('err-name').textContent = '';
    document.getElementById('err-category').textContent = '';

    if (n.trim() === '') {
        document.getElementById('err-name').textContent = 'Wpisz nazwę zadania.';
        valid = false;
    }
    if (c === '') {
        document.getElementById('err-category').textContent = 'Wybierz kategorię.';
        valid = false;
    }
    return valid;
}

// Obsługa przycisku Zapisz (Dodawanie / Aktualizacja)
domForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameVal = inputName.value;
    const catVal = inputCat.value;
    const dateVal = inputDate.value;
    const prioVal = document.querySelector('input[name="task-priority"]:checked').value;
    const statusVal = checkStatus.checked;
    const currentEditId = editIdHolder.value;

    if (!checkInputs(nameVal, catVal)) {
        showMsg('Popraw błędy w formularzu!', 'notify-err');
        return;
    }

    if (currentEditId === "") {
        // Nowe zadanie
        myTasks.push({ name: nameVal, category: catVal, deadline: dateVal, priority: prioVal, isDone: statusVal });
        showMsg('Dodano nowe zadanie do systemu.', 'notify-ok');
    } else {
        // Edycja istniejącego
        myTasks[currentEditId] = { name: nameVal, category: catVal, deadline: dateVal, priority: prioVal, isDone: statusVal };
        showMsg('Zadanie zaktualizowane.', 'notify-ok');
        clearFormState();
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(myTasks));
    refreshBoard();
    domForm.reset();
});

// Włączenie trybu edycji
window.triggerEdit = (idx) => {
    const item = myTasks[idx];
    inputName.value = item.name;
    inputCat.value = item.category;
    inputDate.value = item.deadline;
    checkStatus.checked = item.isDone;
    document.querySelector(`input[name="task-priority"][value="${item.priority}"]`).checked = true;

    editIdHolder.value = idx;
    document.getElementById('form-heading').textContent = "Edytuj parametry zadania";
    document.getElementById('btn-save').textContent = "Zaktualizuj";
    document.getElementById('btn-cancel').classList.remove('hidden-element');
};

// Kasowanie
window.triggerDelete = (idx) => {
    if(confirm('Na pewno wywalić to zadanie?')) {
        myTasks.splice(idx, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(myTasks));
        refreshBoard();
        showMsg('Usunięto zadanie z bazy.', 'notify-err');
        
        if (editIdHolder.value == idx) {
            clearFormState();
            domForm.reset();
        }
    }
};

// Resetowanie formularza do stanu dodawania
document.getElementById('btn-cancel').addEventListener('click', () => {
    clearFormState();
    domForm.reset();
});

function clearFormState() {
    editIdHolder.value = "";
    document.getElementById('form-heading').textContent = "Dodaj nowe zadanie";
    document.getElementById('btn-save').textContent = "Zapisz zadanie";
    document.getElementById('btn-cancel').classList.add('hidden-element');
}

// Wywołanie na start
refreshBoard();