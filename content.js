let uid = 1;
const MAIN_URI =
  "http://xn--vk1b79znxd34c61h.kr/sub01/01.asp?NowRequestToDay=202011&ftype=2";

let weekdaysFlag = false;
let weekendsFlag = false;

const setEscapeEvent = () => {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      try {
        macroStopWeekdays();
        macroStopWeekends();
      } catch (err) {}
    }
  });
};

/* 평일 예매 */
const macroStartWeekdays = () => {
  alert("평일 예매 시작");
  sessionStorage.setItem("macro", "weekdays");
  reload();
};
const macroStopWeekdays = () => {
  alert("평일 예매 정지");
  sessionStorage.removeItem("macro");
  reload();
};

/* 주말 예매 */
const macroStartWeekends = () => {
  alert("주말 예매 시작");
  sessionStorage.setItem("macro", "weekends");
  reload();
};

const macroStopWeekends = () => {
  alert("주말 예매 정지");
  sessionStorage.removeItem("macro");
  reload();
};

/* 평일 예매 */
const macroWeekdays = () => {
  try {
    const $rows = document.querySelectorAll(
      "#sub > article > div.content_wrap > div.content > div > div > fieldset > table > tbody > tr > td > p"
    );

    if (!$rows.length) {
      return;
    }
    $rows.forEach(($row) => {
      var arr = Array.prototype.slice.call($rows); // Now it's an Array.
      const idx = arr.indexOf($row);
      console.log(idx + "th 일");
      // 가능 버튼만
      $targets = $row.querySelectorAll("span.poimp.possi");
      let cnt = 0;
      $targets.forEach(($target) => {
        cnt++;
        console.log(cnt + ": " + $targets.legnth);
        if ($target) {
          const after_5pm =
            $target.parentElement.href.search("time=6") > -1 ||
            $target.parentElement.href.search("time=7") > -1;
          if (after_5pm) {
            console.log("가능");
            chrome.extension.sendMessage({
              type: "successTicketing",
              content: $row.querySelector("span.rs") ?? idx + "th 일",
            });
            $target.click();
            sessionStorage.removeItem("macro");
            return;
          }
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
  if (!weekdaysFlag) {
    setTimeout(reload, 2000);
  }
};

/* 주말 예매 */
const macroWeekends = () => {
  try {
    const $weekendsOptions = document.querySelectorAll(
      "#sub > article > div.content_wrap > div.content > div > div > fieldset > table > tbody"
    );
    $c0 = $weekendsOptions[0].querySelector(
      "tr:nth-child(1) > td:nth-child(1)"
    );
    $c1 = $weekendsOptions[0].querySelector(
      "tr:nth-child(1) > td:nth-child(7)"
    );
    $c2 = $weekendsOptions[0].querySelector(
      "tr:nth-child(2) > td:nth-child(1)"
    );
    $c3 = $weekendsOptions[0].querySelector(
      "tr:nth-child(2) > td:nth-child(7)"
    );
    $c4 = $weekendsOptions[0].querySelector(
      "tr:nth-child(3) > td:nth-child(1)"
    );
    $c5 = $weekendsOptions[0].querySelector(
      "tr:nth-child(3) > td:nth-child(7)"
    );
    $c6 = $weekendsOptions[0].querySelector(
      "tr:nth-child(4) > td:nth-child(1)"
    );
    $c7 = $weekendsOptions[0].querySelector(
      "tr:nth-child(4) > td:nth-child(7)"
    );
    $c8 = $weekendsOptions[0].querySelector(
      "tr:nth-child(5) > td:nth-child(1)"
    );
    $c9 = $weekendsOptions[0].querySelector(
      "tr:nth-child(5) > td:nth-child(7)"
    );
    $c10 = $weekendsOptions[0].querySelector(
      "tr:nth-child(6) > td:nth-child(1)"
    );
    $weekends = [$c0, $c1, $c2, $c3, $c4, $c5, $c6, $c7, $c8, $c9, $c10];

    if (!$weekends.length) {
      return;
    }

    $weekends.forEach(($row) => {
      var arr = Array.prototype.slice.call($weekends); // Now it's an Array.
      const idx = arr.indexOf($row);
      console.log(idx + "일");

      try {
        if ($row) {
          $targets = $row.querySelectorAll("p span");
          $targets.forEach(($target) => {
            if ($target.innerText == "가능") {
              console.log("가능");
              weekendsFlag = true;
              chrome.extension.sendMessage({
                type: "successTicketing",
                content: $row.querySelector("span.rs") ?? idx + "일",
              });
              $button.click();
              sessionStorage.removeItem("macro");
              return;
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
  if (!weekendsFlag) {
    setTimeout(reload, 2000);
  }
};
const book = () => {
  try {
    document.querySelector("#GROUPNAME").value = "지오니";
    document.querySelector("#USE_NUM").value = "2";
    document
      .querySelector(
        "#sub > article > div.content_wrap > div.content > form > div > input"
      )
      .click();
    chrome.extension.sendMessage({
      type: "successTicketing",
      content:
        "예약 완료: " +
        document.querySelector(
          "#sub > article > div.content_wrap > div.content > form > table:nth-child(24) > tbody > tr:nth-child(5) > td"
        ).innerText,
    });
  } catch (err) {
    //
  }
};

const reload = () => {
  location.reload();
};

(() => {
  // if (
  //   !document.querySelector(
  //     "#sub > article > div.content_wrap > div.con_tit > h3"
  //   ) ||
  //   !location.href.startsWith(MAIN_URI)
  // ) {
  //   return;
  // }
  console.log("reloaded");
  const isStartedWeekdays = sessionStorage.getItem("macro") === "weekdays"; // 평일
  const isStartedWeekends = sessionStorage.getItem("macro") === "weekends"; // 주말

  if (isStartedWeekdays) {
    console.log("weekdays started");
    macroWeekdays();
    setEscapeEvent();
  }
  if (isStartedWeekends) {
    console.log("weekends started");
    macroWeekends();
    setEscapeEvent();
  }

  const here = document.querySelectorAll(
    "#sub > article > div.content_wrap > div.content > div > table > tbody"
  );
  if (here[0]) {
    here[0].insertAdjacentHTML(
      "beforeend",
      `<button type="button" class="weekdays-button">${
        isStartedWeekdays ? "평일 오후 예매 정지" : "평일 오후 예매 시작"
      }</button>`
    );
    here[0].insertAdjacentHTML(
      "beforeend",
      `<button type="button" class="weekends-button">${
        isStartedWeekends ? "주말 예매 정지" : "주말 예매 시작"
      }</button>`
    );
  }
  if (document.querySelector(".weekdays-button")) {
    document
      .querySelector(".weekdays-button")
      .addEventListener(
        "click",
        isStartedWeekdays ? macroStopWeekdays : macroStartWeekdays
      );
  }
  if (document.querySelector(".weekends-button")) {
    document
      .querySelector(".weekends-button")
      .addEventListener(
        "click",
        isStartedWeekends ? macroStopWeekends : macroStartWeekends
      );
  }
  if (book) {
    setTimeout(book, 2000);
  }
})();
