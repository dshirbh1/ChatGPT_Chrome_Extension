let lastPTexts = "";

var utilityDict = new Typo();
var affData = utilityDict._readFile(chrome.extension.getURL('typo/dictionaries/en_US/en_US.aff'));
var wordData = utilityDict._readFile(chrome.extension.getURL('typo/dictionaries/en_US/en_US.dic'));

var dictionary = new Typo('en_US', affData, wordData);

// Function to initialize Typo.js with the English dictionary
// function initializeTypo() {
//   const dictionaryPath = chrome.runtime.getURL("typo/dictionaries/");
//   console.log(dictionaryPath);
//   dictionary = new Typo("en_US", null, null, { dictionaryPath: dictionaryPath });
//   console.log("Dictionary is initialized.");
// }

// // Dynamically inject typo.js into the document
// function injectTypoScript() {
//     return new Promise((resolve, reject) => {
//         const script = document.createElement('script');
//         script.src = chrome.runtime.getURL('typo/typo.js');
//         script.onload = resolve;
//         script.onerror = reject;
//         console.log("I am here inside injectTypeScript.");
//         (document.head || document.documentElement).appendChild(script);
//     });
// }


// Function to check the spelling of text
function checkSpelling(text) {
    if (!dictionary) {
      console.error("Dictionary not initialized.");
      return;
    }
    const words = text.split(/\s+/);
    const misspelledWords = words.filter(word => !dictionary.check(word.toLowerCase()));
    if (misspelledWords.length > 0) {
        console.log("Misspelled words:", misspelledWords.join(", "));
        // chrome.runtime.sendMessage({ misspelledWords: misspelledWords });
    } else {
        console.log("No misspelled words found.");
    }
  }


// Function to attach input event listener to the textarea
function attachSpellCheckListener(textarea) {
    textarea.addEventListener('input', () => {
        const text = textarea.value;
        if (lastPTexts !== text){
            // Implement spell check logic here
            // console.log("Spell checking text:", text);
            checkSpelling(text);
            // Example: Display misspelled words or corrections
        }
        lastPTexts = text;
    });
}

// Function to initialize spell check when textarea becomes available
function initializeSpellCheck() {
    console.log("Spell check is launched");
    initializeTypo();
    const textarea = document.getElementById('prompt-textarea');
    if (textarea) {
        attachSpellCheckListener(textarea);
    } else {
        // Use MutationObserver as a fallback if the textarea might be added dynamically
        const observer = new MutationObserver((mutations, obs) => {
            const textarea = document.getElementById('prompt-textarea');
            if (textarea) {
                attachSpellCheckListener(textarea);
                obs.disconnect(); // Stop observing once the textarea is found and handled
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }
}

// Then initialize Typo DataType
// injectTypoScript().then(() => {
//     initializeTypo();
//     console.log("Typo is initialized.");
// }).catch(error => {
//     console.error("Failed to load Typo.js:", error);
// });


// Immediately try to initialize the spell check
initializeSpellCheck();