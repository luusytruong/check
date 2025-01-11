let settings;
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

//func interval
function interval() {
  const interval = 1000;
  function checkNav() {
    const intervalId = setInterval(() => {
      nav = document.querySelector(".ictu-page-test__test-panel__single-nav");
      // console.log("check");
      if (nav) {
        clearInterval(intervalId);
        // console.log("tim duoc nav");
        removeDisabled();
      }
    }, interval);
  }
  //check header a
  function checkHeaderA() {
    // console.log("%c🟡 wait check logo ...", styleW);
    let intervalId = setInterval(() => {
      const a = document.querySelector(".m-header a");
      if (a) {
        // console.log("%c🟢 logo exist", styleS);
        const btnClass = document.querySelector(
          ".nav >:nth-child(2) >:nth-child(3) a"
        );
        if (btnClass) {
          clearInterval(intervalId);
          btnClass.click();
          intervalId = setInterval(() => {
            // console.log("%c🟡 check subject ...", styleW);
            const btnSubject = document.querySelector(
              `.classes-container >:nth-child(${settings.subject}) a`
            );
            if (btnSubject) {
              clearInterval(intervalId);
              // console.log("%c🟢 subject exist", styleS);
              btnSubject.click();
              intervalId = setInterval(() => {
                // console.log("%c🟡 check test ...", styleW);
                const btnTest = document.querySelector(
                  `.activity-left >:nth-child(${settings.test + 1}) >div`
                );
                if (btnTest) {
                  clearInterval(intervalId);
                  // console.log("%c🟢 test exist", styleS);
                  btnTest.click();
                  let find = 10;
                  intervalId = setInterval(() => {
                    // console.log("%c🟡 check, can i do it ...", styleW);
                    const btnTestView = document.querySelector(
                      `.activity-left >:nth-child(${
                        settings.test + 1
                      }) >ul>li:nth-child(3) >div`
                    );
                    if (btnTestView) {
                      clearInterval(intervalId);
                      // console.log("%c🟢 let's do it", styleS);
                      btnTestView.click();
                      if (settings.enter) {
                        intervalId = setInterval(() => {
                          const btnTestDo =
                            document.querySelector(".theme-button");
                          if (btnTestDo) {
                            clearInterval(intervalId);
                            btnTestDo.click();
                            intervalId = setInterval(() => {
                              const accept = document.querySelector("label");
                              if (accept) {
                                clearInterval(intervalId);
                                accept.click();
                              }
                            }, interval);
                          }
                        }, interval);
                      }
                    } else {
                      if (find === 0) {
                        clearInterval(intervalId4);
                        // console.log("%c🔴 can not do", styleE);
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
  if (settings.submit) checkNav();
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
function getFromStorage(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], function (result) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result[key]);
      }
    });
  });
}

//load data
async function loading() {
  settings = await getFromStorage("settings");
  console.log(settings);
  if (settings && settings.toggle === true) {
    // console.log("%c🟢 extension on", styleS);
    interval();
  }
}
//start
const url = window.location.href;
if (url.includes("lms.ictu.edu.vn")) {
  // console.log("lms");
  loading();
}
