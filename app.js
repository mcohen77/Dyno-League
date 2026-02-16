const APPS_SCRIPT_WEB_APP_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

const roastReplies = [
  "Get the hell out of here with that chaos-tier suggestion.",
  "That is absolute bullshit and you should be fined a draft pick for saying it.",
  "This suggestion is so bad it should be vetoed by common sense.",
  "No chance. That idea belongs straight in the trash with bad trade offers.",
  "That might be the most unserious suggestion in league history.",
  "Respectfully, that suggestion is football terrorism."
];

const form = document.getElementById("suggestionForm");
const responseBox = document.getElementById("responseBox");

function pickRoast() {
  const index = Math.floor(Math.random() * roastReplies.length);
  return roastReplies[index];
}

function renderResponse(roast, ok) {
  const statusLine = ok
    ? "Just kidding, suggestion noted."
    : "Just kidding, suggestion noted locally. Sheet sync failed.";

  responseBox.innerHTML = `
    <div class="roast">${roast}</div>
    <div class="jk">${statusLine}</div>
  `;
}

async function submitToSheet(teamName, suggestion) {
  if (!APPS_SCRIPT_WEB_APP_URL || APPS_SCRIPT_WEB_APP_URL.includes("PASTE_")) {
    return false;
  }

  const payload = {
    teamName,
    suggestion,
    submittedAt: new Date().toISOString()
  };

  await fetch(APPS_SCRIPT_WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  });

  return true;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const teamName = document.getElementById("teamName").value.trim();
  const suggestion = document.getElementById("suggestion").value.trim();

  if (!teamName || !suggestion) {
    return;
  }

  const roast = pickRoast();
  let saved = false;

  try {
    saved = await submitToSheet(teamName, suggestion);
  } catch {
    saved = false;
  }

  renderResponse(roast, saved);
  form.reset();
});
