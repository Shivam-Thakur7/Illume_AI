let lastPrompt = "";

async function generate() {
  const prompt = document.getElementById("prompt").value;
  const statusText = document.getElementById("statusText");
  const resultImage = document.getElementById("resultImage");

  if (!prompt) {
    statusText.textContent = "⚠️ Please enter a prompt!";
    return;
  }

  lastPrompt = prompt;
  statusText.classList.remove("fade-out");
  statusText.innerHTML = `
    <div class="magic-loader">
      <div class="magic-text">
        ✨ Illume AI is creating its magic 🧠
        <span class="dots">
          <span>.</span><span>.</span><span>.</span>
        </span>
      </div>
    </div>
  `;

  try {
    const response = await fetch("https://illume-ai.onrender.com/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (data.error) {
      statusText.textContent = "❌ " + data.error;
      return;
    }

    const imageUrl = data.imageUrl;
    const refinedPrompt = data.revisedPrompt || prompt;

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${imageUrl}" alt="Generated image" />
      <div class="prompt-text">
        <span class="short-prompt">${refinedPrompt.slice(0, 100)}...</span>
        <span class="full-prompt" style="display: none;">${refinedPrompt}</span>
        <span class="toggle-link" onclick="togglePrompt(this)">More</span>
      </div>
      <div class="buttons">
        <button onclick="downloadImage('${imageUrl}', '${refinedPrompt}')">⬇️ Download</button>
        <button onclick="copyImage('${refinedPrompt}')">📋 Copy</button>
        <button onclick="regenerate('${refinedPrompt}')">🔁 Regenerate</button>
      </div>
    `;

    resultImage.prepend(card);

    // ✨ Fade out and clear loader
    statusText.classList.add("fade-out");
    setTimeout(() => statusText.innerHTML = "", 500);

  } catch (err) {
    console.error(err);
    statusText.textContent = "❌ Failed to generate image.";
  }
}

async function downloadImage(url, prompt) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    a.download = `AI_Image_${timestamp}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(blobUrl);
  } catch (err) {
    alert("⚠️ Failed to download image.");
    console.error(err);
  }
}

async function copyImage(prompt) {
  try {
    navigator.clipboard.writeText(prompt);
    alert("📋 Prompt copied to clipboard!");
  } catch (err) {
    alert("⚠️ Failed to copy prompt.");
    console.error(err);
  }
}

function regenerate(prompt) {
  document.getElementById("prompt").value = prompt;
  generate();
}

function togglePrompt(link) {
  const shortPrompt = link.previousElementSibling.previousElementSibling;
  const fullPrompt = link.previousElementSibling;
  const isExpanded = fullPrompt.style.display === "inline";

  if (isExpanded) {
    shortPrompt.style.display = "inline";
    fullPrompt.style.display = "none";
    link.textContent = "More →";
  } else {
    shortPrompt.style.display = "none";
    fullPrompt.style.display = "inline";
    link.textContent = "Less ←";
  }
}
