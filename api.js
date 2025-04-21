// /routes/api.js
'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;

      // --- Input Validation ---

      // Check for missing fields
      if (text === undefined || locale === undefined) {
        return res.json({ error: 'Required field(s) missing' });
      }

      // Check for empty text
      if (text === "") {
         return res.json({ error: 'No text to translate' });
      }

      // Check for invalid locale
      if (locale !== 'american-to-british' && locale !== 'british-to-american') {
        return res.json({ error: 'Invalid value for locale field' });
      }

      // --- Perform Translation ---
      const result = translator.translate(text, locale);

      // --- Send Response ---
      // The translate method already returns the object in the correct format
      // including the "Everything looks good..." message or the translated text
       if (result.error) {
         // This case might occur if translator logic itself has an error check
         // or if we add more validation inside the translator method later.
         return res.json(result);
       } else {
         return res.json({ text: text, translation: result.translation });
       }

    });
};