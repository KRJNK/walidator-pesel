// PESEL: suma kontrolna + data urodzenia + płeć. Walidacja formatu, nie istnienia!
(function () {
  'use strict';
  var MIES = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca',
    'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];
  function render() {
    var p = (document.getElementById('pesel').value || '').replace(/\D/g, '');
    var out = document.getElementById('out');
    var det = document.getElementById('detail');
    if (!p) { out.textContent = '—'; det.textContent = 'Wpisz 11 cyfr.'; return; }
    if (!/^\d{11}$/.test(p)) {
      out.textContent = '⛔ Za krótki'; det.textContent = 'PESEL ma dokładnie 11 cyfr (wpisano ' + p.length + ').';
      return;
    }
    var w = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3], s = 0;
    for (var i = 0; i < 10; i++) s += (+p[i]) * w[i];
    var kontrolna = (10 - (s % 10)) % 10;
    if (kontrolna !== +p[10]) {
      out.textContent = '⛔ Niepoprawny'; det.textContent = 'Suma kontrolna się nie zgadza — numer jest błędny.'; return;
    }
    var rr = +p.slice(0, 2), mm = +p.slice(2, 4), dd = +p.slice(4, 6);
    var wiek, rok;
    if (mm >= 81 && mm <= 92) { rok = 1800 + rr; mm -= 80; }
    else if (mm >= 1 && mm <= 12) { rok = 1900 + rr; }
    else if (mm >= 21 && mm <= 32) { rok = 2000 + rr; mm -= 20; }
    else if (mm >= 41 && mm <= 52) { rok = 2100 + rr; mm -= 40; }
    else if (mm >= 61 && mm <= 72) { rok = 2200 + rr; mm -= 60; }
    else { out.textContent = '⛔ Niepoprawny'; det.textContent = 'Miesiąc w numerze jest nieprawidłowy.'; return; }
    if (dd < 1 || dd > 31) { out.textContent = '⛔ Niepoprawny'; det.textContent = 'Dzień w numerze jest nieprawidłowy.'; return; }
    var plec = (+p[9] % 2 === 0) ? 'kobieta' : 'mężczyzna';
    out.textContent = '✓ Poprawny';
    det.textContent = 'Data urodzenia: ' + dd + ' ' + MIES[mm - 1] + ' ' + rok + ' · płeć: ' + plec +
      '. Uwaga: poprawny format ≠ istniejący numer.';
  }
  document.getElementById('pesel').addEventListener('input', render);
  render();
})();
