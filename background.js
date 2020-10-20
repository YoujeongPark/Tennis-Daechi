const playSound = () => {
  if (typeof audio != "undefined" && audio) {
    audio.pause();
    document.body.removeChild(audio);
    audio = null;
  }
  audio = document.createElement("audio");
  document.body.appendChild(audio);
  audio.autoplay = true;
  audio.src = chrome.extension.getURL("tada.mp3");
  audio.play();
};

const sendTelegramMessage = (message) => {
  const botToken = "1036522490:AAEUPb5tbuwBNkIsN8sR5sVDnia-LWz2NUw";
  const chatId = -366771557;

  if (!botToken || !chatId) {
    return;
  }

  const msg = encodeURI(message);
  const url = `https://api.telegram.org/bot${botToken}/sendmessage?chat_id=${chatId}&text=${msg}`;

  fetch(url);
};

chrome.extension.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.type == "successTicketing") {
    // playSound();
    sendTelegramMessage(message.content);
    sendResponse(true);
  }
});
