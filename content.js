// Function to inject the Summarize button into Gmail's UI
function injectButton() {
  const button = document.createElement("button");
  button.innerText = "Summarize Email";
  button.className = "btn waves-effect waves-light";
  button.style.position = "absolute";
  button.style.top = "10px";
  button.style.right = "10px";
  document.body.appendChild(button);

  button.addEventListener("click", () => {
    const emailContent = document.querySelector(
      ".email-body-selector"
    ).innerText; // Update selector as needed
    chrome.runtime.sendMessage(
      { action: "summarize", content: emailContent },
      (response) => {
        if (response && response.summary) {
          chrome.runtime.sendMessage({
            action: "displaySummary",
            summary: response.summary,
          });
        }
      }
    );
  });
}

// Inject the button when Gmail's DOM is fully loaded
document.addEventListener("DOMContentLoaded", injectButton);
