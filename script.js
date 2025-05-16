const messages = document.getElementById('messages');
const input    = document.getElementById('input');
const send     = document.getElementById('send');

let stage     = 0;
let userName  = '';
let birthDate = null;

function botSay(text) {
  const el = document.createElement('div');
  el.classList.add('msg', 'bot');
  el.textContent = text;
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
}

function userSay(text) {
  const el = document.createElement('div');
  el.classList.add('msg', 'user');
  el.textContent = text;
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
}


botSay('Cześć!');
setTimeout(() => botSay('Jak masz na imię?'), 500);

// Obsługa przycisku i Enter
send.addEventListener('click', () => handle(input.value.trim()));
input.addEventListener('keypress', e => {
  if (e.key === 'Enter') handle(input.value.trim());
});

function handle(text) {
  if (!text) return;
  userSay(text);
  input.value = '';

  if (stage === 0) {
   // 1)
    userName = text;
    botSay(`Miło Cię poznać, ${userName}! Kiedy masz urodziny? (RRRR-MM-DD)`);
    stage = 1;

  } else if (stage === 1) {
    // 2) 
    const d = new Date(text);
    if (isNaN(d)) {
      botSay('Nie rozumiem formatu. Podaj w formacie RRRR-MM-DD.');
      return;
    }
    birthDate = d;
    const today = new Date();
    let nextBday = new Date(today.getFullYear(), d.getMonth(), d.getDate());
    if (nextBday < today) nextBday.setFullYear(nextBday.getFullYear() + 1);
    const diffDays = Math.ceil((nextBday - today) / (1000 * 60 * 60 * 24));
    botSay(`Do Twoich kolejnych urodzin pozostało ${diffDays} dni.`);
    stage = 2;

  } else {
    // 3) Rozpoznawanie intencji (RegEx)
    const lower = text.toLowerCase();

    if (/pogod(a|ę|zie)/.test(lower)) {
      botSay('Sprawdź pogodę tutaj:');
      window.open('https://www.meteo.pl/', '_blank');

    } else if (/godzin(a|ę|y)?|zegark/.test(lower)) {
      botSay('Na eleganckie zegarki zajrzyj tutaj:');
      window.open('https://www.rolex.com/', '_blank');

    } else if (/uczeln(i(a|ę)?|ia)/.test(lower)) {
      botSay('Najlepsza uczelnia to oczywiście Vistula! Zobacz:');
      window.open('https://www.vistula.edu.pl/', '_blank');

    } else {
      botSay('Przepraszam, nie rozumiem. Możesz zapytać o pogodę, godzinę lub najlepszą uczelnię.');
    }
  }
}
