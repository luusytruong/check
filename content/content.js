let nav = null;
const styleW = `
  color: #FCD53F; 
  background-color: #3C3D51; 
  padding: 4px 12px 4px 4px; 
  border-radius: 50px;
`;
const styleS = `
  color: #00D26A; 
  background-color: #3C3D51; 
  padding: 4px 12px 4px 4px; 
  border-radius: 50px;
`;
//func interval
function interval() {
  const interval = 1000;
  function checkNav() {
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
  //check header a
  function checkHeaderA() {
    console.log("%c🟡 wait check logo ...", styleW);
    const intervalId = setInterval(() => {
      const a = document.querySelector(".m-header a");
      if (a) {
        console.log("%c🟢 logo exist", styleS);
        //call
        const btnClass = document.querySelector(
          ".nav >:nth-child(2) >:nth-child(3) a"
        );
        if (btnClass) {
          clearInterval(intervalId);
          btnClass.click();
          const intervalId2 = setInterval(() => {
            const btnSubject = document.querySelector(
              ".classes-container >:nth-child(3) a"
            );
            if (btnSubject) {
              btnSubject.click();
              clearInterval(intervalId2);
              const intervalId3 = setInterval(() => {
                const btnExample = document.querySelector(
                  ".activity-left >:nth-child(5) >div"
                );
                if (btnExample) {
                  btnExample.click();
                  clearInterval(intervalId3);
                  const intervalId4 = setInterval(() => {
                    const btnExampleView = document.querySelector(
                      ".activity-left >:nth-child(5) >ul>li:nth-child(3) >div"
                    );
                    if (btnExampleView) {
                      btnExampleView.click();
                      clearInterval(intervalId4);
                    }
                  }, interval);
                }
              }, interval);
            }
          }, interval);
        }
      }
    }, interval);
  }
  //call
  checkHeaderA();
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
