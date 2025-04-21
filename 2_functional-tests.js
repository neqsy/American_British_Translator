// /tests/2_functional-tests.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js'); // Your server file

chai.use(chaiHttp);

// No need to require Translator here as we are testing the API endpoint

suite('Functional Tests', () => {

    suite('POST /api/translate', () => {
        test('Translation with text and locale fields: POST request to /api/translate', (done) => {
            chai.request(server)
                .post('/api/translate')
                .send({
                    text: 'Mangoes are my favorite fruit.',
                    locale: 'american-to-british'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body, 'Response should be an object');
                    assert.property(res.body, 'text', 'Response should contain original text');
                    assert.property(res.body, 'translation', 'Response should contain translation');
                    assert.equal(res.body.text, 'Mangoes are my favorite fruit.');
                    assert.equal(res.body.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.');
                    done();
                });
        });

        test('Translation with text and invalid locale field: POST request to /api/translate', (done) => {
            chai.request(server)
                .post('/api/translate')
                .send({
                    text: 'Some text',
                    locale: 'invalid-locale'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200); // API handles error gracefully with 200 OK + JSON error
                    assert.isObject(res.body, 'Response should be an object');
                    assert.property(res.body, 'error', 'Response should contain error field');
                    assert.equal(res.body.error, 'Invalid value for locale field');
                    done();
                });
        });

        test('Translation with missing text field: POST request to /api/translate', (done) => {
             chai.request(server)
                .post('/api/translate')
                .send({
                    // text field missing
                    locale: 'american-to-british'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body, 'Response should be an object');
                    assert.property(res.body, 'error', 'Response should contain error field');
                    assert.equal(res.body.error, 'Required field(s) missing');
                    done();
                });
        });

        test('Translation with missing locale field: POST request to /api/translate', (done) => {
            chai.request(server)
                .post('/api/translate')
                .send({
                    text: 'Some text'
                    // locale field missing
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body, 'Response should be an object');
                    assert.property(res.body, 'error', 'Response should contain error field');
                    assert.equal(res.body.error, 'Required field(s) missing');
                    done();
                });
        });

        test('Translation with empty text: POST request to /api/translate', (done) => {
             chai.request(server)
                .post('/api/translate')
                .send({
                    text: '',
                    locale: 'american-to-british'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body, 'Response should be an object');
                    assert.property(res.body, 'error', 'Response should contain error field');
                    assert.equal(res.body.error, 'No text to translate');
                    done();
                });
        });

        test('Translation with text that needs no translation: POST request to /api/translate', (done) => {
            chai.request(server)
                .post('/api/translate')
                .send({
                    text: 'This text requires no translation.',
                    locale: 'american-to-british'
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body, 'Response should be an object');
                     assert.property(res.body, 'text', 'Response should contain original text');
                    assert.property(res.body, 'translation', 'Response should contain translation');
                    assert.equal(res.body.text, 'This text requires no translation.');
                    assert.equal(res.body.translation, 'Everything looks good to me!');
                    done();
                });
        });
    }); // End suite POST /api/translate

}); // End Functional Tests suite