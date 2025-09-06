const setObj = function (key, obj) {
  localStorage.setItem(key, JSON.stringify(obj))
}
const getObj = function (key) {
  return JSON.parse(localStorage.getItem(key))
}

// -------------------- POPUP MODAL WITH STARS --------------------
function spawnStar() {
  const star = document.createElement("div");
  star.className = "star";
  star.style.left = Math.random() * window.innerWidth + "px";
  star.style.animationDuration = (Math.random() * 2 + 2) + "s";
  document.getElementById("customModal").appendChild(star);
  setTimeout(() => star.remove(), 4000);
}
setInterval(spawnStar, 300);

let modalResolve;
function openModal(title = "Enter Details") {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("customModal").style.visibility = "visible";
  document.getElementById("customModal").style.opacity = "1";

  // clear old values
  document.getElementById("modalName").value = "";
  document.getElementById("modalUrl").value = "";
  document.getElementById("modalIcon").value = "";
  document.getElementById("modalDesc").value = "";

  return new Promise((resolve) => {
    modalResolve = resolve;
  });
}
function closeModal() {
  document.getElementById("customModal").style.opacity = "0";
  document.getElementById("customModal").style.visibility = "hidden";
  if (modalResolve) modalResolve(null);
}
document.getElementById("modalSubmit").onclick = () => {
  const result = {
    name: document.getElementById("modalName").value.trim(),
    url: document.getElementById("modalUrl").value.trim(),
    icon: document.getElementById("modalIcon").value.trim(),
    description: document.getElementById("modalDesc").value.trim()
  };
  closeModal();
  modalResolve(result);
};
// ---------------------------------------------------------------

async function loadcustomapp() {
  if (!getObj('customapps')) {
    setObj('customapps', [])
  }

  const result = await openModal("Add Custom App");

  if (!result || !result.name || !result.url) return alert('All required fields must be filled in');
  if (result.name.length > 15) return alert('App name is too long (max 30 characters)');

  fetch('https://www.uuidtools.com/api/generate/v4')
    .then((response) => response.json())
    .then((data) => {
      var customapps = getObj('customapps') || []
      customapps.push({
        title: `${result.name} (Custom app)`,
        url: result.url,
        id: data[0],
        image: result.icon,
        description: result.description
      });
      setObj('customapps', customapps);
      window.location.href = self.location;
    })
}

if (localStorage.getItem('launchblank') && window.self !== window.top) {
  launchab()
}

function launchab() {
  const tab = window.open('about:blank', '_blank')
  const iframe = tab.document.createElement('iframe')
  const stl = iframe.style
  stl.border = stl.outline = 'none'
  stl.width = '100vw'
  stl.height = '100vh'
  stl.position = 'fixed'
  stl.left = stl.right = stl.top = stl.bottom = '0'
  iframe.src = self.location
  tab.document.body.appendChild(iframe)
  window.parent.window.location.replace(localStorage.getItem('panicurl') || 'https://classroom.google.com/h')
}

if (window.self !== window.self) document.querySelector('#launchab').style.display = 'none'

async function loadcustomgame() {
  if (!getObj('customgames')) {
    setObj('customgames', [])
  }

  const result = await openModal("Add Custom Game");

  if (!result || !result.name || !result.url) return alert('All required fields must be filled in');
  if (result.name.length > 15) return alert('Game name is too long (max 30 characters)');

  fetch('https://www.uuidtools.com/api/generate/v4')
    .then((response) => response.json())
    .then((data) => {
      var customgames = getObj('customgames') || []
      customgames.push({
        title: `${result.name} (Custom game)`,
        url: result.url,
        id: data[0],
        image: result.icon,
        description: result.description
      });
      setObj('customgames', customgames);
      console.log(getObj('customgames'))
      //window.location.href = self.location
    })
}

function debug() {
  console.log(getObj('customapps'))
}

function clearcustomapps() {
  setObj('customapps', [])
  console.log('Removed all custom apps!')
  window.location.reload()
}

function clearcustomgames() {
  setObj('customgames', [])
  console.log('Removed all custom games!')
  window.location.reload()
}

// Themes
if (localStorage.getItem('theme')) {
  document.body.setAttribute('theme', localStorage.getItem('theme'))
} else {
  document.body.setAttribute('theme', 'main')
}

// Tab
if (localStorage.getItem('tabIcon')) {
  document.querySelector("link[rel='shortcut icon']").href = localStorage.getItem('tabIcon')
}

if (localStorage.getItem('tabName')) {
  document.title = localStorage.getItem('tabName')
}

if (localStorage.getItem('theme')) {
  document.body.setAttribute('theme', localStorage.getItem('theme'))
}
console.log(localStorage.getItem('theme'))

// Panic
document.addEventListener('keydown', async (e) => {
  if (localStorage.getItem('panickey') && localStorage.getItem('panickey') == e.key) window.parent.window.location.replace(localStorage.getItem('panicurl') || 'https://classroom.google.com/h')
})

// Debug
