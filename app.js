// تسجيل Service Worker (PWA)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(()=>{});
  });
}

function ensureAuth(expectedType){
  const logged = localStorage.getItem("logged_in") === "1";
  const type = localStorage.getItem("account_type") || "rider";

  if(type !== expectedType){
    // لو دخل غلط على صفحة مش بتاعته
    location.href = "/login.html";
    return;
  }
  if(!logged){
    location.href = "/login.html";
  }
}

function logout(){
  localStorage.removeItem("logged_in");
  location.href = "/";
}
