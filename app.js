// app.js (للـ index.html فقط)

const btnRider = document.getElementById("btnRider");
const btnDriver = document.getElementById("btnDriver");

function go(role){
  // ✅ نودي المستخدم لصفحة تسجيل الدخول ومعانا الدور
  // ✅ relative path عشان يشتغل على GitHub Pages والروت العادي
  location.href = `login.html?role=${encodeURIComponent(role)}`;
}

btnRider.addEventListener("click", () => go("passenger"));
btnDriver.addEventListener("click", () => go("driver"));
