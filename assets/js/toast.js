//toast
class Toast {
  timeoutId;
  constructor() {
    this.initToast();
  }
  show(status, content) {
    try {
      let icon = null;
      let toastinput = document.getElementById("toast");
      toastinput.className = ``;
      clearTimeout(this.timeoutId);
      setTimeout(() => {
        if (status === "Successful") {
          icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>`;
        } else if (status === "Error") {
          icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>`;
        } else {
          icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>`;
        }
        toastinput.className = `${status.toLowerCase()}`;
        toastinput.querySelector(".toast-icon").innerHTML = icon;
        toastinput.querySelector(".toast-title").innerText = status;
        toastinput.querySelector(".toast-content").innerText = content;
        this.timeoutId = setTimeout(() => {
          toastinput.className = `${status.toLowerCase()} animate`;
        }, 3200);
      }, 8);
    } catch (e) {
      alert("Error: " + e);
    }
  }
  initToast() {
    const toastHTML = `
    <div class="toast-wrapper">
    <div class="toast-icon"></div>
    <div class="toast-body">
    <div class="toast-title"></div>
    <div class="toast-content"></div>
    </div>
    </div>
    `;
    const toastElem = document.createElement("div");
    toastElem.id = "toast";
    toastElem.innerHTML = toastHTML;
    //css
    const toastCSS = `
    :root {
      --toast-bgr: #FFFFFF;
      --toast-color: #333;
    }
    @keyframes toastShow {
      0% {
          transform: translate(-50%, -100%);
      }
      100% {
          transform: translate(-50%, calc(12px);
      }
    }    
    @keyframes toastHide {
      0% {
          transform: translate(-50%, calc(12px);
      }    
      100% {
          transform: translate(-50%, -100%);
      }
    }    
    #toast.successful.animate {
      animation: toastHide .8s ease forwards;
    }    
    #toast.error.animate {
      animation: toastHide .8s ease forwards;
    }    
    #toast.warning.animate {
      animation: toastHide .8s ease forwards;
    }    
    #toast.successful {
      animation: toastShow .8s ease forwards;    
      svg {
          fill: #00BB00;
      }
    }    
    #toast.error {
      animation: toastShow .8s ease forwards;    
      svg {
          fill: #EE0000;
      }
    }    
    #toast.warning {
      animation: toastShow .8s ease forwards;    
      svg {
          fill: #FFA500;
          margin-left: 12px;
      }
    }    
    #toast {
      position: absolute;
      left: 50%;
      top: 0;
      display: flex;
      align-items: center;
      transform: translate(-50%, -100%);
      z-index: 100;
      padding: 16px;
      justify-content: center;
      width: 100%;
    }
    #toast *{
      color: var(--toast-color);
    }  
    .toast-wrapper {
      display: flex;
      align-items: center;
      max-width: 320px;
      width: 100%;
      background-color: var(--toast-bgr);
      backdrop-filter: blur(12px);
      padding: 12px;
      padding-right: 20px;
      border-radius: 20px;
      transition: 0.35s all;
    }    
    .toast-icon {
      display: flex;
      margin-right: 12px;
    }    
    .toast-icon svg {
      width: 28px;
    }    
    .toast-body {
      display: flex;
      flex-direction: column;
    }    
    .toast-body>* {
      user-select: none !important;
    }    
    .toast-title {
      font-weight: 600;
    }
    @media(prefers-color-scheme: dark) {
      :root {
        --toast-bgr: #343746;
        --toast-color: #CCC;
      }
    }
    `;
    const toastStyle = document.createElement("style");
    toastStyle.innerHTML = toastCSS;

    document.head.appendChild(toastStyle);
    console.log('da them css');
    document.body.appendChild(toastElem);
  }
}
export default Toast;
