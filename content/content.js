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
const styleE = `
  color: #F8312F; 
  background-color: #3C3D51; 
  padding: 4px 12px 4px 4px; 
  border-radius: 50px;
`;
let subjectIndex = 0;
let testIndex = 0;

//func interval
function interval() {
  const interval = 1000;
  function checkNav() {
    const intervalId = setInterval(() => {
      nav = document.querySelector(".ictu-page-test__test-panel__single-nav");
      // console.log("check");
      if (nav) {
        // console.log("tim duoc nav");
        removeDisabled();
        clearInterval(intervalId);
      }
    }, interval);
  }
  //check header a
  function checkHeaderA() {
    // console.log("%c🟡 wait check logo ...", styleW);
    const intervalId = setInterval(() => {
      const a = document.querySelector(".m-header a");
      if (a) {
        // console.log("%c🟢 logo exist", styleS);
        //call
        const btnClass = document.querySelector(
          ".nav >:nth-child(2) >:nth-child(3) a"
        );
        if (btnClass) {
          clearInterval(intervalId);
          btnClass.click();
          const intervalId2 = setInterval(() => {
            // console.log("%c🟡 check subject ...", styleW);
            const btnSubject = document.querySelector(
              `.classes-container >:nth-child(${subjectIndex}) a`
            );
            if (btnSubject) {
              // console.log("%c🟢 subject exist", styleS);
              btnSubject.click();
              clearInterval(intervalId2);
              const intervalId3 = setInterval(() => {
                // console.log("%c🟡 check test ...", styleW);
                const btnTest = document.querySelector(
                  `.activity-left >:nth-child(${testIndex}) >div`
                );
                if (btnTest) {
                  // console.log("%c🟢 test exist", styleS);
                  btnTest.click();
                  clearInterval(intervalId3);
                  let find = 10;
                  const intervalId4 = setInterval(() => {
                    // console.log("%c🟡 check, can i do it ...", styleW);
                    const btnTestView = document.querySelector(
                      `.activity-left >:nth-child(${testIndex}) >ul>li:nth-child(3) >div`
                    );
                    if (btnTestView) {
                      // console.log("%c🟢 let's do it", styleS);
                      btnTestView.click();
                      clearInterval(intervalId4);
                    } else {
                      if (find === 0) {
                        // console.log("%c🔴 can not do", styleE);
                        clearInterval(intervalId4);
                        return;
                      }
                      find--;
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
    // console.log("tim duoc 2 nut disabled");
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
    // console.log("tim duoc nut next");
    btnNext.addEventListener("click", () => {
      setTimeout(() => {
        btnNext.classList.remove("ictu-button--disabled");
        btnNext.disabled = false;
      }, 300);
    });
  }
}

//get data from storage
function getFromStorage() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(["check"], function (result) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result.check);
      }
    });
  });
}

//load data
async function loading() {
  const checkObj = await getFromStorage();
  if (checkObj && checkObj.state === true) {
    // console.log("%c🟢 extension on", styleS);
    subjectIndex = checkObj.subject;
    testIndex = checkObj.test + 1;
    interval();
  }
}
//start
loading();
