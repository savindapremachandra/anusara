const screens = [...document.querySelectorAll(".screen")];
const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const noMessage = document.getElementById("no-message");
const dateForm = document.getElementById("date-form");
const whatsappLink = document.getElementById("whatsapp-link");
const confirmationText = document.getElementById("confirmation-text");

// Change this number if you ever want the invitation to go to a different WhatsApp.
const WHATSAPP_NUMBER = "94775491306"; // Sri Lanka country code +94, no leading zero.

function showScreen(id) {
  screens.forEach(screen => screen.classList.toggle("active", screen.id === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

yesButton.addEventListener("click", () => {
  showScreen("screen-yes");
  celebrate();
});

document.getElementById("okay-button").addEventListener("click", () => {
  showScreen("screen-date");
});

// The "No" button dodges both mouse and touch attempts.
function dodgeNoButton(event) {
  if (event) event.preventDefault();
  const parent = document.getElementById("question-actions");
  const maxX = Math.max(90, parent.clientWidth / 2);
  const x = (Math.random() * maxX * 2) - maxX;
  const y = (Math.random() * 90) - 45;
  noButton.style.transform = `translate(${x}px, ${y}px)`;
  noMessage.textContent = [
    "Oops, too slow! 🙈",
    "That button has places to be.",
    "The elephant says… try YES? 🥺",
    "Nope, the No button is shy."
  ][Math.floor(Math.random() * 4)];
}
noButton.addEventListener("pointerenter", dodgeNoButton);
noButton.addEventListener("touchstart", dodgeNoButton, { passive: false });
noButton.addEventListener("click", dodgeNoButton);

// Prevent choosing a date in the past, using the visitor's local date.
const dateInput = document.getElementById("date");
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString().slice(0, 10);
dateInput.min = localToday;

const hourSelect = document.getElementById("time-hour");
const minuteSelect = document.getElementById("time-minute");
const periodSelect = document.getElementById("time-period");

// The hour/minute options live in index.html. This is only a safety net in case
// an old cached copy of the page ever loads without them.
if (hourSelect.options.length <= 1) {
  for (let h = 1; h <= 12; h++) hourSelect.add(new Option(String(h), String(h)));
}
if (minuteSelect.options.length <= 1) {
  for (let m = 0; m < 60; m += 5) {
    const mm = String(m).padStart(2, "0");
    minuteSelect.add(new Option(mm, mm));
  }
}

// What she picked on the date screen, kept until the food screen is answered.
let chosen = { prettyDate: "", prettyTime: "", note: "" };

dateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!dateForm.reportValidity()) return;

  const date = new Date(`${dateInput.value}T00:00:00`);
  chosen.prettyDate = new Intl.DateTimeFormat("en-LK", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  }).format(date);
  let hour = Number(hourSelect.value) % 12;
  if (periodSelect.value === "PM") hour += 12;
  const minute = Number(minuteSelect.value);
  chosen.prettyTime = new Intl.DateTimeFormat("en-LK", {
    hour: "numeric", minute: "2-digit"
  }).format(new Date(2000, 0, 1, hour, minute));
  chosen.note = document.getElementById("note").value.trim();

  showScreen("screen-food");
});

// Food choice: tapping an option finishes the flow.
const foodOptions = [...document.querySelectorAll(".food-option")];
foodOptions.forEach(button => {
  button.addEventListener("click", () => {
    foodOptions.forEach(b => b.classList.toggle("selected", b === button));
    const food = button.dataset.food;
    const foodEmoji = button.querySelector(".food-emoji").textContent;
    const { prettyDate, prettyTime, note } = chosen;

    const message = `Hey! ❤️ It's Anusara. I'd love to go on a date with you on ${prettyDate} at ${prettyTime}.\nMy tummy is asking for ${food} ${foodEmoji}${note ? `\nA little note: ${note}` : ""}\n\nCan't wait! 🥰`;
    whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    confirmationText.textContent = `${prettyDate}, ${food} it is! ${foodEmoji} Be ready by ${prettyTime} and I'll be seeing you soon. 💗 Tap below to send it on WhatsApp.`;
    showScreen("screen-done");
    celebrate();
  });
});

document.getElementById("start-over").addEventListener("click", () => {
  dateForm.reset();
  dateInput.min = localToday;
  foodOptions.forEach(b => b.classList.remove("selected"));
  noButton.style.transform = "";
  noMessage.textContent = "Choose wisely… this elephant is emotionally invested.";
  showScreen("screen-question");
});

function celebrate() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#f08db0", "#ffd1df", "#f6c76e", "#d7b5ed", "#ffffff"];
  for (let i = 0; i < 65; i++) {
    const piece = document.createElement("i");
    piece.textContent = Math.random() > .5 ? "♥" : "✦";
    Object.assign(piece.style, {
      position: "fixed", zIndex: "20", left: `${Math.random() * 100}vw`,
      top: "-25px", color: colors[Math.floor(Math.random() * colors.length)],
      fontSize: `${12 + Math.random() * 15}px`, fontStyle: "normal",
      pointerEvents: "none", transition: `transform ${1.8 + Math.random() * 1.2}s ease-in, opacity 2.5s ease`
    });
    document.body.appendChild(piece);
    requestAnimationFrame(() => {
      piece.style.transform = `translate(${(Math.random() - .5) * 160}px, ${window.innerHeight + 60}px) rotate(${Math.random() * 600}deg)`;
      piece.style.opacity = "0";
    });
    setTimeout(() => piece.remove(), 3300);
  }
}
