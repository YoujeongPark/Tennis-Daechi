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
  if (!process.env.botToken || !process.env.chatId) {
    return;
  }

  const msg = encodeURI(message);
  // 개인 botToken, chatId를 .env 파일에 작성해야함.
  const url = `https://api.telegram.org/bot${process.env.botToken}/sendmessage?chat_id=${process.env.chatId}&text=${msg}`;

  fetch(url);
};

chrome.extension.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.type == "successTicketing") {
    // playSound();
    sendTelegramMessage(message.content);
    sendResponse(true);
  }
});
