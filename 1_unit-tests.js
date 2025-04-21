// /tests/1_unit-tests.js
const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator(); // Instantiate Translator

suite('Unit Tests', () => {

    // --- American to British ---
    suite('American to British Translation', () => {
        test('Translate Mangoes are my favorite fruit. to British English', (done) => {
            const input = 'Mangoes are my favorite fruit.';
            const expected = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
            const result = translator.translate(input, 'american-to-british');
            assert.equal(result.translation, expected);
            done();
        });

        test('Translate I ate yogurt for breakfast. to British English', (done) => {
            const input = 'I ate yogurt for breakfast.';
            const expected = 'I ate <span class="highlight">yoghurt</span> for breakfast.';
             const result = translator.translate(input, 'american-to-british');
            assert.equal(result.translation, expected);
            done();
        });

        test("Translate We had a party at my friend's condo. to British English", (done) => {
            const input = "We had a party at my friend's condo.";
            const expected = 'We had a party at my friend\'s <span class="highlight">flat</span>.';
             const result = translator.translate(input, 'american-to-british');
            assert.equal(result.translation, expected);
            done();
        });

        test('Translate Can you toss this in the trashcan for me? to British English', (done) => {
            const input = 'Can you toss this in the trashcan for me?';
            const expected = 'Can you toss this in the <span class="highlight">bin</span> for me?';
             const result = translator.translate(input, 'american-to-british');
            assert.equal(result.translation, expected);
            done();
        });

        test('Translate The parking lot was full. to British English', (done) => {
            const input = 'The parking lot was full.';
            const expected = 'The <span class="highlight">car park</span> was full.';
             const result = translator.translate(input, 'american-to-british');
            assert.equal(result.translation, expected);
            done();
        });

        test('Translate Like a high tech Rube Goldberg machine. to British English', (done) => {
            const input = 'Like a high tech Rube Goldberg machine.';
            const expected = 'Like a high tech <span class="highlight">Heath Robinson device</span>.';
            const result = translator.translate(input, 'american-to-british');
            assert.equal(result.translation, expected);
            done();
        });

        test('Translate To play hooky means to skip class or work. to British English', (done) => {
            const input = 'To play hooky means to skip class or work.';
            const expected = 'To <span class="highlight">bunk off</span> means to skip class or work.';
            const result = translator.translate(input, 'american-to-british');
            assert.equal(result.translation, expected);
            done();
        });

        test('Translate No Mr. Bond, I expect you to die. to British English', (done) => {
            const input = 'No Mr. Bond, I expect you to die.';
            const expected = 'No <span class="highlight">Mr</span> Bond, I expect you to die.';
            const result = translator.translate(input, 'american-to-british');
            assert.equal(result.translation, expected);
            done();
        });

         test('Translate Dr. Grosh will see you now. to British English', (done) => {
            const input = 'Dr. Grosh will see you now.';
            const expected = '<span class="highlight">Dr</span> Grosh will see you now.';
            const result = translator.translate(input, 'american-to-british');
            assert.equal(result.translation, expected);
            done();
        });

        test('Translate Lunch is at 12:15 today. to British English', (done) => {
            const input = 'Lunch is at 12:15 today.';
            const expected = 'Lunch is at <span class="highlight">12.15</span> today.';
            const result = translator.translate(input, 'american-to-british');
            assert.equal(result.translation, expected);
            done();
        });

    });

    // --- British to American ---
     suite('British to American Translation', () => {
        test('Translate We watched the footie match for a while. to American English', (done) => {
            const input = 'We watched the footie match for a while.';
            const expected = 'We watched the <span class="highlight">soccer</span> match for a while.';
            const result = translator.translate(input, 'british-to-american');
            assert.equal(result.translation, expected);
            done();
        });

        test('Translate Paracetamol takes up to an hour to work. to American English', (done) => {
            const input = 'Paracetamol takes up to an hour to work.';
            const expected = '<span class="highlight">Acetaminophen</span> takes up to an hour to work.';
            const result = translator.translate(input, 'british-to-american');
            assert.equal(result.translation, expected);
            done();
        });

        test('Translate First, caramelise the onions. to American English', (done) => {
            const input = 'First, caramelise the onions.';
            const expected = 'First, <span class="highlight">caramelize</span> the onions.';
             const result = translator.translate(input, 'british-to-american');
            assert.equal(result.translation, expected);
            done();
        });

        test('Translate I spent the bank holiday at the funfair. to American English', (done) => {
            const input = 'I spent the bank holiday at the funfair.';
            const expected = 'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.';
             const result = translator.translate(input, 'british-to-american');
            assert.equal(result.translation, expected);
            done();
        });

         test('Translate I had a bicky then went to the chippy. to American English', (done) => {
            const input = 'I had a bicky then went to the chippy.';
            // Note: Multiple potential translations for chippy, using one common one. Adjust if needed.
            const expected = 'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.';
             const result = translator.translate(input, 'british-to-american');
            assert.equal(result.translation, expected);
            done();
        });

        test("Translate I've just got bits and bobs in my bum bag. to American English", (done) => {
            const input = "I've just got bits and bobs in my bum bag.";
            const expected = 'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.';
            const result = translator.translate(input, 'british-to-american');
            assert.equal(result.translation, expected);
            done();
        });

         test('Translate The car boot sale at Boxted Airfield was called off. to American English', (done) => {
            const input = 'The car boot sale at Boxted Airfield was called off.';
            const expected = 'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.';
             const result = translator.translate(input, 'british-to-american');
            assert.equal(result.translation, expected);
            done();
        });

         test('Translate Have you met Mrs Kalyani? to American English', (done) => {
            const input = 'Have you met Mrs Kalyani?';
            const expected = 'Have you met <span class="highlight">Mrs.</span> Kalyani?';
            const result = translator.translate(input, 'british-to-american');
            assert.equal(result.translation, expected);
            done();
        });

         test("Translate Prof Joyner of King's College, London. to American English", (done) => {
            const input = "Prof Joyner of King's College, London.";
            const expected = '<span class="highlight">Prof.</span> Joyner of King\'s College, London.';
            const result = translator.translate(input, 'british-to-american');
            assert.equal(result.translation, expected);
            done();
        });

         test('Translate Tea time is usually around 4 or 4.30. to American English', (done) => {
            const input = 'Tea time is usually around 4 or 4.30.';
            const expected = 'Tea time is usually around 4 or <span class="highlight">4:30</span>.';
            const result = translator.translate(input, 'british-to-american');
            assert.equal(result.translation, expected);
            done();
        });
    });

     // --- Highlight Tests ---
     suite('Highlighting Tests', () => {
        test('Highlight translation in Mangoes are my favorite fruit.', (done) => {
            const input = 'Mangoes are my favorite fruit.';
            const expected = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
            const result = translator.translate(input, 'american-to-british');
            assert.include(result.translation, '<span class="highlight">favourite</span>');
            assert.equal(result.translation, expected); // Also check full string
            done();
        });

        test('Highlight translation in I ate yogurt for breakfast.', (done) => {
            const input = 'I ate yogurt for breakfast.';
            const expected = 'I ate <span class="highlight">yoghurt</span> for breakfast.';
            const result = translator.translate(input, 'american-to-british');
             assert.include(result.translation, '<span class="highlight">yoghurt</span>');
             assert.equal(result.translation, expected);
             done();
        });

         test('Highlight translation in We watched the footie match for a while.', (done) => {
            const input = 'We watched the footie match for a while.';
            const expected = 'We watched the <span class="highlight">soccer</span> match for a while.';
            const result = translator.translate(input, 'british-to-american');
             assert.include(result.translation, '<span class="highlight">soccer</span>');
             assert.equal(result.translation, expected);
             done();
        });

         test('Highlight translation in Paracetamol takes up to an hour to work.', (done) => {
            const input = 'Paracetamol takes up to an hour to work.';
            const expected = '<span class="highlight">Acetaminophen</span> takes up to an hour to work.';
            const result = translator.translate(input, 'british-to-american');
            assert.include(result.translation, '<span class="highlight">Acetaminophen</span>');
            assert.equal(result.translation, expected);
            done();
        });
     });

});