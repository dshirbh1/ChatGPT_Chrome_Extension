const fs = require('fs');
const path = require('path');

// Function to read and process the .dic file
function processDicFile(dicFilePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(dicFilePath, 'utf8', (err, data) => {
            if (err) reject(err);

            // The first line contains the word count, so skip it
            const words = data.split('\n').slice(1).map(line => {
                // Splitting each line by '/' to ignore potential rule markers
                return line.split('/')[0];
            });

            resolve(words);
        });
    });
}

// Example usage
const dicFilePath = path.join(__dirname, 'dict_US/en_US.dic');

processDicFile(dicFilePath)
    .then(words => {
        console.log("Processed words:", words); // Just show a preview of the first 10 words
        // Here you could write the words array to a new file as JSON
        const outputPath = path.join(__dirname, 'dict_US/words.json');
        fs.writeFile(outputPath, JSON.stringify(words), 'utf8', (err) => {
            if (err) {
                console.error("Failed to write dictionary JSON:", err);
                return;
            }
            console.log("Dictionary JSON written successfully to:", outputPath);
        });
    })
    .catch(err => {
        console.error("Error processing dictionary file:", err);
    });
