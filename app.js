// ✏️ ĐỔI THÀNH URL WEB APP APPS SCRIPT CỦA M
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyERTRYlDIJcxJfsgPElR9_NBwBYUwfDKLWAk2NJsO1-Yq19jRKEt-rwV9QD5fLqMyuAg/exec";

const logEl = document.getElementById("log");
const msgEl = document.getElementById("msg");
const sendBtn = document.getElementById("sendBtn");

function appendBubble(text, type) {
  const div = document.createElement("div");
  div.className = "bubble " + type;
  div.textContent = text;
  logEl.appendChild(div);
  logEl.scrollTop = logEl.scrollHeight;
}

async function sendMessage() {
  const msg = msgEl.value.trim();
  if (!msg) return;

  msgEl.value = "";
  appendBubble(msg, "bubble-me");

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: msg,
    });

    let data;
    try {
      data = await res.json();
    } catch (e) {
      appendBubble("Lỗi đọc phản hồi từ server.", "bubble-ai bubble-error");
      return;
    }

    if (!data.ok) {
      appendBubble("Lỗi: " + (data.error || "Không rõ lỗi"), "bubble-ai bubble-error");
    } else {
      appendBubble(data.reply, "bubble-ai");
    }
  } catch (err) {
    appendBubble("Lỗi mạng: " + err.message, "bubble-ai bubble-error");
  }
}

sendBtn.addEventListener("click", sendMessage);

msgEl.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
