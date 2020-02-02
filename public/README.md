Start URL: 웹 앱이 시작되는 지점
Launch Image: 웹 앱 시작 화면
Display Type: 웹 앱의 화면 형태
Display Type: 웹 앱의 화면 형태
Display Orientation: 웹 앱 화면 방향
App Icon: 앱 아이콘 이미지와 크기

display => 1. standalone : 일반적인 앱형식 2. fullscreen: 상태바까지 덮어버림 3. browser: 해당 OS 브라우저에서 실행

"orientation": "landscape" 수평방향

Service Worker => 브라우저와 서버 사이의 미들웨어 역할을 하는 스크립트 파일
PWA에서 가장 중요한 역할을 하고, Offline Experience와 Mobile & Web Push의 기반 기술

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
console.log("before installprompt Event fired")
e.preventDefault();
deferredPrompt = e;
})

btn.addEventListener("click", e => {
deferredPrompt.prompt();
deferredPrompt.userChoice.then((res) => {
if (res === "accepted") {
console.log("The app has benn installed");
}

    deferredPrompt = null

})
})
