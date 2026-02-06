let machines = {};
let lang = "EN";

// Load cloud database
fetch("data.json")
  .then(res => res.json())
  .then(data => machines = data);

// Auto search while typing
document.getElementById("machineInput").addEventListener("input", ()=>{
  if(document.getElementById("machineInput").value.length >= 2){
    findLocation();
  }
});

// Search function
function findLocation(){
  const input = document.getElementById("machineInput").value.trim().toUpperCase();
  const result = document.getElementById("result");

  if(!input){
    result.innerHTML="";
    return;
  }

  if(machines[input]){
    const m = machines[input];
    result.className = "result success";
    result.innerHTML = `
      <b>${lang==="EN"?"Location":"ទីតាំង"}:</b> ${m.location}<br><br>
      <a href="${m.map}" target="_blank">📍 Google Maps</a>
    `;
  } else {
    result.className = "result error";
    result.innerHTML = lang==="EN" ? "Machine not found" : "រកមិនឃើញម៉ាស៊ីន";
  }
}

// Dark mode
function toggleDark(){
  document.body.classList.toggle("dark");
}

// Language toggle
function toggleLang(){
  lang = lang === "EN" ? "KH" : "EN";
  document.getElementById("title").innerText =
    lang === "EN" ? "Vending Machine Locator" : "ស្វែងរកទីតាំងម៉ាស៊ីន";
  findLocation();
}
