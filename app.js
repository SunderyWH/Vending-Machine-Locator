let machines = {};
let lang = "EN";

// Load cloud DB
fetch("data.json")
  .then(res => res.json())
  .then(data => machines = data);

// AUTO SEARCH while typing
document.getElementById("machineInput").addEventListener("input", ()=>{
  if(document.getElementById("machineInput").value.length >= 3){
    findLocation();
  }
});

// MAIN SEARCH
function findLocation(){
  const input = document.getElementById("machineInput").value.trim().toUpperCase();
  const result = document.getElementById("result");

  if(!input){
    result.innerHTML="";
    return;
  }

  if(machines[input]){
    const m = machines[input];
    result.className="result success";
    result.innerHTML = `
      <b>${lang==="EN"?"Location":"ទីតាំង"}:</b> ${m.location}<br><br>
      <a href="${m.map}" target="_blank">📍 Google Maps</a>
    `;
  } else {
    result.className="result error";
    result.innerHTML = lang==="EN" ? "Not found" : "រកមិនឃើញ";
  }
}

// DARK MODE
function toggleDark(){
  document.body.classList.toggle("dark");
}

// LANGUAGE TOGGLE
function toggleLang(){
  lang = lang==="EN" ? "KH" : "EN";
  document.getElementById("title").innerHTML = 
    lang==="EN" ? "Vending Machine Locator" : "ស្វែងរកទីតាំងម៉ាស៊ីន";
  findLocation();
}

// QR SCANNER
const qr = new Html5Qrcode("reader");

qr.start(
  { facingMode: "environment" },
  { fps:10, qrbox:200 },
  text=>{
    document.getElementById("machineInput").value = text;
    findLocation();
  }
);
