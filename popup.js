chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "displaySummary") {
    document.getElementById("summary").innerText = request.summary;
  }
});
