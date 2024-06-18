function injectButton() {
  const button = document.createElement("button");
  button.innerText = "Summarize Email";
  button.className = "btn waves-effect waves-light";
  button.style.position = "absolute";
  button.style.top = "10px";
  button.style.right = "10px";
  console.log("Button created");

  // Ensure the script is running in the right context
  const emailBody = document.querySelector(".email-body-selector"); // Update selector as needed
  if (emailBody) {
    console.log("Email body found");
    emailBody.appendChild(button);
  } else {
    console.log("Email body not found");
  }

  button.addEventListener("click", () => {
    const emailContent = emailBody ? emailBody.innerText : "";
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

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  injectButton();
});
