const screen = document.getElementById("screen");
const btnRider = document.getElementById("btnRider");
const btnDriver = document.getElementById("btnDriver");

function riderUI(){
  screen.innerHTML = `
    <h3 style="margin:0 0 8px">راكب</h3>
    <div>هنا هنبدأ: تحديد مكان القيام + الوجهة</div>
    <button class="action" id="goLocation">التقاط موقعي الحالي</button>
    <div id="loc" style="margin-top:10px;color:#93c5fd"></div>
  `;
  document.getElementById("goLocation").onclick = () => {
    if(!navigator.geolocation){
      document.getElementById("loc").textContent = "المتصفح لا يدعم GPS";
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos)=>{
        const {latitude, longitude} = pos.coords;
        document.getElementById("loc").textContent =
          `موقعي: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
      },
      ()=>{ document.getElementById("loc").textContent = "مقدرتش أجيب الموقع. فعّل GPS واسمح بالموقع."; },
      {enableHighAccuracy:true, timeout:10000}
    );
  };
}

function driverUI(){
  screen.innerHTML = `
    <h3 style="margin:0 0 8px">سائق</h3>
    <div>هنا هنحط: اختيار المحافظة/المركز + استقبال الطلبات</div>
    <input id="gov" placeholder="المحافظة" />
    <input id="center" placeholder="المركز/المدينة" />
    <button class="action" id="save">حفظ</button>
    <div id="saved" style="margin-top:10px;color:#86efac"></div>
  `;
  document.getElementById("save").onclick = ()=>{
    const gov = document.getElementById("gov").value.trim();
    const center = document.getElementById("center").value.trim();
    document.getElementById("saved").textContent = `تم الحفظ: ${gov || "-"} / ${center || "-"}`;
  };
}

btnRider.onclick = riderUI;
btnDriver.onclick = driverUI;
