# TaskMaster PRO - Menedżer Zadań i Celów

### Autor: Szymon Siermiński (Numer albumu: 75559)

---

 Linki do projektu
* **Wersja Live aplikacji https://pl75559.github.io/poprawkowe_75559_Szymon_Sierminski/
* **Prezentacja Wideo: 
* **Repozytorium https://github.com/PL75559/poprawkowe_75559_Szymon_Sierminski

 Krótki opis aplikacji
TaskMaster PRO to intuicyjna, w pełni responsywna aplikacja webowa służąca do zarządzania codziennymi obowiązkami i planami (To-Do List). Projekt pozwala na precyzyjne kategoryzowanie zadań, przypisywanie im odpowiednich priorytetów oraz śledzenie postępów poprzez zmianę statusu. Aplikacja została zaprojektowana z wykorzystaniem nowoczesnego, ciemnego interfejsu (Dark Mode) i gwarantuje bezpieczeństwo wprowadzonych informacji, dzięki zapisowi w przeglądarce użytkownika.

 Zastosowane technologie
* **HTML5**: Semantyczna i poprawna struktura dokumentu.
* **CSS3**: Autorski arkusz stylów wykorzystujący techniki Flexbox oraz CSS Grid do stworzenia responsywnego układu działającego na urządzeniach mobilnych i desktopowych.
* **JavaScript (Vanilla JS)**: Logika biznesowa aplikacji, dynamiczna modyfikacja elementów interfejsu oraz walidacja danych wejściowych.
* **Local Storage API**: Mechanizm wykorzystany do trwałego zapisu i odczytu bazy zadań w formacie JSON bez użycia zewnętrznego serwera.

 Główne funkcjonalności
* **Zarządzanie listą (CRUD)**: Pełny cykl życia zadania – dodawanie, odczytywanie, edytowanie i usuwanie.
* **EDYCJA ELEMENTÓW**: Aplikacja pozwala na edycję istniejących elementów (wymóg na ocenę 3,5). Użytkownik może zaktualizować nazwę, kategorię, datę, priorytet oraz status ukończenia bez konieczności tworzenia zadania od nowa.
* **Rozbudowana walidacja danych**: Skrypt zabezpiecza przed wysłaniem pustego formularza. Wymagane jest wpisanie nazwy zadania oraz wybranie kategorii. W przypadku błędu wyświetlane są stosowne ostrzeżenia.
* **System powiadomień**: Aplikacja wyposażona jest w mechanizm znikających alertów (sukces, błąd), informujących użytkownika o rezultacie podjętej akcji.
* **Trwałość sesji**: Odświeżenie karty w przeglądarce (F5) lub jej zamknięcie nie powoduje utraty wprowadzonych zadań.

 Gdzie znajduje się kod głównych funkcji?
Cała logika i mechanika projektu została umieszczona w jednym, czytelnym pliku `app.js`. Kluczowe bloki kodu:
* **Dodawanie i Edycja zadań**: Znajdują się wewnątrz nasłuchiwacza zdarzeń formularza `domForm.addEventListener('submit', ...)`. Skrypt rozróżnia akcję (dodawanie vs edycja) na podstawie wartości ukrytego pola tekstowego.
* **Usuwanie zadań**: Realizowane przez funkcję `window.triggerDelete(idx)`, która kasuje obiekt z tablicy i natychmiast odświeża Local Storage.
* **Walidacja danych**: Za weryfikację wejścia odpowiada funkcja `checkInputs(n, c)`.
* **Trwały zapis**: Wykonywany natywnie z użyciem `localStorage.setItem('sierminski_75559_tasks', JSON.stringify(myTasks))`.

 Instrukcja uruchomienia lokalnego
* Pobierz repozytorium w formie pliku ZIP lub sklonuj je na dysk twardy komputera.
* Rozpakuj pliki w wybranym folderze.
* Otwórz główny plik `index.html` za pomocą dowolnej, nowoczesnej przeglądarki internetowej (Google Chrome, Firefox, Microsoft Edge, Opera).
* Nie są wymagane żadne dodatkowe instalacje serwerów lokalnych ani baz danych.
