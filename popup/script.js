let objCheck = null;
const toggle = document.getElementById("toggle-state");
const subjectElem = document.getElementById("subject");
const testElem = document.getElementById("test");
const notifyElem = document.getElementById("notify");
const btnSave = document.getElementById("save");

//get data from storage
function getFromStorage() {
  try {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(["check"], function (result) {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result.check);
        }
      });
    });
  } catch (e) {
    console.log(e);
  }
}

//save data to storage
function saveToStorage(data) {
  if (!chrome || !chrome.storage) {
    return false;
  }
  try {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set({ check: data }, function () {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(true);
        }
      });
    });
  } catch (e) {
    alert(e);
  }
}

//notify
function notify(state, content) {
  notifyElem.className = state;
  notifyElem.innerText = content;
  setTimeout(() => {
    notifyElem.innerText = "";
  }, 1000);
}

//listener event
btnSave.addEventListener("click", () => {
  const checkObj = {
    state: toggle.checked,
    subject: parseInt(subjectElem.value),
    test: parseInt(testElem.value),
  };
  if (saveToStorage(checkObj)) {
    notify("successful", "Save data successful");
  } else {
    notify("error", "Save data error");
  }
});

//load data
async function loading() {
  if (chrome && chrome.storage) {
    objCheck = await getFromStorage();
    if (objCheck) {
      toggle.checked = objCheck.state;
      subjectElem.value = objCheck.subject || 1;
      testElem.value = objCheck.test || 1;
    }
  }
}
//start
loading();
