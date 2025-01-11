let settings = null;
const changeElems = document.querySelectorAll(".change");
const toggleField = document.getElementById("toggle-state");
const enterTestField = document.getElementById("enter-test-state");
const submitTestField = document.getElementById("submit-test-state");
const subjectElem = document.getElementById("subject");
const testElem = document.getElementById("test");

//get data from storage
function getFromStorage(key) {
  try {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([key], function (result) {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result[key]);
        }
      });
    });
  } catch (e) {
    console.error(e);
  }
}

//save data to storage
function saveToStorage(key, data) {
  if (!chrome || !chrome.storage) {
    return false;
  }
  try {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ [key]: data }, function () {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(true);
        }
      });
    });
  } catch (e) {
    console.error(e);
  }
}

//load data
async function loading() {
  if (chrome && chrome.storage) {
    settings = await getFromStorage("settings");
    if (settings) {
      toggleField.checked = settings.toggle;
      enterTestField.checked = settings.enter;
      submitTestField.checked = settings.submit;
      subjectElem.value = settings.subject || 1;
      testElem.value = settings.test || 1;
    }
  }
}
//start
loading();
chrome.storage.local.get(null, function (data) {
  console.log(data);
});
// chrome.storage.local.clear(function () {
//   console.log("Tất cả dữ liệu đã được xóa khỏi chrome.storage.sync");
// });
changeElems.forEach((elem) => {
  elem.addEventListener("change", () => {
    const settings = {
      toggle: toggleField.checked,
      enter: enterTestField.checked,
      submit: submitTestField.checked,
      subject: parseInt(subjectElem.value),
      test: parseInt(testElem.value),
    };
    if (!saveToStorage("settings", settings)) alert("error save data error");
  });
});
