if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker registered!', reg))
      .catch(err => console.log('Service Worker registration failed:', err));
  });
}



const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if (inputBox.value ==='') {
        alert("bruh you wrote nothing");
    
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}


listContainer.addEventListener("click", function(e){
    if (e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData()
        
    } else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData()
        
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();






// Some AI bullshit im testing

let deferredPrompt; // To store the event for later
const instBtn = document.getElementById('instBtn');

// 1. Listen for the browser's "installable" event
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  
  // Stash the event so we can trigger it later.
  deferredPrompt = e;
  
  // Update UI notify the user they can install the PWA
  instBtn.style.display = 'block';
});

// 2. Handle the button click
instBtn.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    
    // We've used the prompt, so clear it
    deferredPrompt = null;
    
    // Optionally hide the button again
    instBtn.style.display = 'none';
  }
});

// 3. (Optional) Hide button if app is already installed
window.addEventListener('appinstalled', () => {
  instBtn.style.display = 'none';
  console.log('PWA was installed');
});