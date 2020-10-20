const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;
const targetUrl =
  "http://xn--vk1b79znxd34c61h.kr/sub01/01.asp?NowRequestToDay=202008&ftype=2";

const getHtml = async () => {
  try {
    // window.open(targetUrl, "_self");
    window.location.replace(targetUrl);

    return await axios.get(targetUrl);
  } catch (error) {
    console.error(error);
  }
};

const sendTelegramMessage = () => {
  const botToken = "1036522490:AAEUPb5tbuwBNkIsN8sR5sVDnia-LWz2NUw";
  const chatId = -366771557;

  if (!botToken || !chatId) {
    return;
  }

  const msg = encodeURI("GET A MASK");
  const url = `https://api.telegram.org/bot${botToken}/sendmessage?chat_id=${chatId}&text=${msg}`;

  fetch(url);
};

getHtml()
  .then((html) => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $rows = $(".prd_type3").children(".btn_order").children(".span.buy")
      .children;

    if ($rows[0]) {
      $button = $rows[0];
      if ($button.className != "_stopDefault" && $button.title == "구매하기") {
        buy = true;
        chrome.extension.sendMessage({ type: "successTicketing" });
        $button.closest("a").click();
        sendTelegramMessage();
        log("success");
        return;
      }
    }
  })
  .then((res) => log(res))
  .then(getHtml());
