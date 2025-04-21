// /components/translator.js
const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

// --- Helper Function to create reversed dictionaries ---
function reverseDictionary(obj) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        acc[value] = key;
        return acc;
    }, {});
}

// --- Reversed Dictionaries for British to American ---
const britishToAmericanSpelling = reverseDictionary(americanToBritishSpelling);
const britishToAmericanTitles = reverseDictionary(americanToBritishTitles);
// Combine americanOnly and britishOnly into a single British-to-American map
const britishToAmericanTerms = reverseDictionary(americanOnly);
// Add britishOnly terms (mapping British to American)
Object.assign(britishToAmericanTerms, britishOnly);


class Translator {

    // Helper to wrap matches with highlight span
    highlight(text) {
        return `<span class="highlight">${text}</span>`;
    }

    // Helper to handle capitalization
    matchCase(original, translated) {
        if (original[0] === original[0].toUpperCase()) {
            return translated[0].toUpperCase() + translated.slice(1);
        }
        return translated;
    }

    translate(text, locale) {
        let translation = text;
        let changesMade = false;

        let termsDict, spellingDict, titlesDict, timeRegex, timeReplacement;

        if (locale === 'american-to-british') {
            termsDict = americanOnly;
            spellingDict = americanToBritishSpelling;
            titlesDict = americanToBritishTitles;
            timeRegex = /(\d{1,2}):(\d{2})/g; // Match HH:MM
            timeReplacement = '$1.$2'; // Replace with HH.MM
        } else if (locale === 'british-to-american') {
            // Note: britishToAmericanTerms combines britishOnly and reversed americanOnly
            termsDict = britishToAmericanTerms;
            spellingDict = britishToAmericanSpelling;
            titlesDict = britishToAmericanTitles;
            timeRegex = /(\d{1,2})\.(\d{2})/g; // Match HH.MM
            timeReplacement = '$1:$2'; // Replace with HH:MM
        } else {
            // Should be caught by API validation, but good practice
            return { error: 'Invalid value for locale field' };
        }

        // Combine dictionaries for easier processing
        const combinedDict = { ...termsDict, ...spellingDict };
        const titleKeys = Object.keys(titlesDict).sort((a, b) => b.length - a.length); // Sort by length desc
        const combinedKeys = Object.keys(combinedDict).sort((a, b) => b.length - a.length); // Sort by length desc

        // --- 1. Translate Titles ---
        titleKeys.forEach(key => {
            // Regex to match title (case-insensitive) followed by a space or end of string
            // Need to escape potential '.' in titles like 'Mr.'
            const escapedKey = key.replace('.', '\\.');
            const regex = new RegExp(`\\b${escapedKey}(?=\\s|$)`, 'gi'); // Case insensitive, global
             translation = translation.replace(regex, (match) => {
                changesMade = true;
                // Match case for titles (e.g., Mr. -> Mr, Prof. -> Prof)
                // Titles are usually consistent case, but handle if needed
                let translatedTitle = titlesDict[key.toLowerCase()]; // Lookup lowercase key
                // Preserve original case (mostly for the first letter)
                if (match[0] === match[0].toUpperCase()) {
                     translatedTitle = translatedTitle[0].toUpperCase() + translatedTitle.slice(1);
                } else {
                     translatedTitle = translatedTitle.toLowerCase();
                }
                return this.highlight(translatedTitle);
            });
        });


        // --- 2. Translate Time ---
        translation = translation.replace(timeRegex, (match) => {
            changesMade = true;
            // Replace separator and highlight the whole time string
            return this.highlight(match.replace(timeRegex, timeReplacement));
        });

        // --- 3. Translate Terms and Spelling ---
        // Use a temporary variable to avoid issues with replacing parts of already highlighted sections
        let tempTranslation = translation;

        combinedKeys.forEach(key => {
             // Use regex to match whole words only, case-insensitive
            // Handle potential spaces in keys (multi-word terms)
            const regex = new RegExp(`\\b${key.replace(/\s/g, '\\s')}\\b`, 'gi'); // Match whole words, case-insensitive

            tempTranslation = tempTranslation.replace(regex, (match) => {
                // Avoid re-translating highlighted parts
                if (match.includes('class="highlight"')) {
                    return match;
                }
                changesMade = true;
                let translatedWord = combinedDict[key.toLowerCase()]; // Lookup lowercase key
                return this.highlight(this.matchCase(match, translatedWord));
            });
        });
        translation = tempTranslation; // Update the main translation string


        // --- Final Check ---
        if (!changesMade) {
            return { translation: "Everything looks good to me!" };
        }

        return { translation: translation };
    }
}

module.exports = Translator;