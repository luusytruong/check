let nav = null;
//func interval
function interval() {
  const interval = 1000;
  const intervalId = setInterval(() => {
    nav = document.querySelector(".ictu-page-test__test-panel__single-nav");
    console.log("check");
    if (nav) {
      console.log("tim duoc nav");
      removeDisabled();
      clearInterval(intervalId);
    }
  }, interval);
}
//remove disabled
function removeDisabled() {
  const btnSubmits = document.querySelectorAll(".ictu-button--disabled");
  if (btnSubmits.length) {
    console.log("tim duoc 2 nut disabled");
    btnSubmits.forEach((btnSubmit) => {
      if (btnSubmit.classList.contains("ictu-button--disabled")) {
        btnSubmit.classList.remove("ictu-button--disabled");
        btnSubmit.disabled = false;
        addEventBtnNext();
      }
    });
  }
}
//add event listener
function addEventBtnNext() {
  const btnNext = nav.querySelector("button");
  if (btnNext) {
    console.log("tim duoc nut next");
    btnNext.addEventListener("click", () => {
      setTimeout(() => {
        btnNext.classList.remove("ictu-button--disabled");
        btnNext.disabled = false;
      }, 300);
    });
  }
}
//start
interval();
