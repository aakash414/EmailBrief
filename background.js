const HUGGING_FACE_API_KEY = "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";

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === "summarize") {
    const summarizedContent = await summarizeEmail(request.content);
    sendResponse({ summary: summarizedContent });
  }
  // Return true to indicate that the response will be sent asynchronously
  return true;
});

async function summarizeEmail(content) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: content }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const summary = data[0].summary_text;
    return summary;
  } catch (error) {
    console.error("Error summarizing email:", error);
    return "Failed to summarize the email.";
  }
}
