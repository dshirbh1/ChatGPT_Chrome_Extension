function displayMisspelledWords(misspelledWords) {
  let feedbackDiv = document.getElementById('spellcheck-feedback');
  if (!feedbackDiv) {
      feedbackDiv = document.createElement('div');
      feedbackDiv.id = 'spellcheck-feedback';
      document.body.appendChild(feedbackDiv);
  }

  feedbackDiv.innerHTML = misspelledWords.join(', ');
}

// console.log("I am in the popup");
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.misspelledWords) {
      displayMisspelledWords(message.misspelledWords);
  }
});


// document.addEventListener('DOMContentLoaded', () => {
//   // Request misspelled words from background.js
//   chrome.runtime.sendMessage({ request: "misspelledWords" }, (response) => {
//     if (response.misspelledWords) {
//       displayMisspelledWords(response.misspelledWords);
//     }
//   });
// });

// Don't forget to modify background.js to handle this request and respond with the stored words.
