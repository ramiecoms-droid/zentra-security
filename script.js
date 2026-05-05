const chatbox = document.getElementById("chatbox");
const messages = document.getElementById("messages");
const input = document.getElementById("user-input");
const imageUpload = document.getElementById("image-upload");
const counter = document.getElementById("protected-counter");

let protectedCount = 20000;

setInterval(() => {
  protectedCount += Math.floor(Math.random() * 3) + 1;
  counter.textContent = protectedCount.toLocaleString();
}, 2500);

function openChat() {
  chatbox.style.display = "flex";
}

function closeChat() {
  chatbox.style.display = "none";
}

function fakeScan(text) {
  const msg = text.toLowerCase();
  let score = 0;

  if (msg.includes("click") || msg.includes("link")) score++;
  if (msg.includes("verify") || msg.includes("password")) score++;
  if (msg.includes("won") || msg.includes("prize")) score++;
  if (msg.includes("urgent") || msg.includes("immediately")) score++;
  if (msg.includes("send money") || msg.includes("cashapp")) score++;

  let risk = "Low";
  if (score >= 2) risk = "Medium";
  if (score >= 4) risk = "High";

  return `Risk Level: ${risk} — This may contain scam indicators.`;
}

function handleImage(file) {
  const reader = new FileReader();

  reader.onload = function(e) {
    messages.innerHTML += `
      <p class="user-msg">
        <b>You uploaded:</b><br>
        <img src="${e.target.result}" style="max-width:100%; border-radius:10px;">
      </p>
    `;

    setTimeout(() => {
      messages.innerHTML += `
        <p class="ai-msg">
          <b>Zentra AI:</b><br>
          ⚠️ This screenshot could contain phishing or scam indicators.<br>
          Always verify links and avoid entering personal information.
        </p>
      `;
    }, 800);

    messages.scrollTop = messages.scrollHeight;
  };

  reader.readAsDataURL(file);
}

function sendMessage() {
  const message = input.value.trim();

  if (message) {
    messages.innerHTML += `<p class="user-msg"><b>You:</b> ${message}</p>`;
    const reply = fakeScan(message);

    setTimeout(() => {
      messages.innerHTML += `<p class="ai-msg"><b>Zentra AI:</b> ${reply}</p>`;
      messages.scrollTop = messages.scrollHeight;
    }, 600);
  }

  if (imageUpload.files.length > 0) {
    handleImage(imageUpload.files[0]);
    imageUpload.value = "";
  }

  input.value = "";
}

input.addEventListener("keydown", function(e) {
  if (e.key === "Enter") sendMessage();
});
