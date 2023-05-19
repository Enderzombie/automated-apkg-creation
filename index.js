const fs = require('fs');
const AnkiExport = require('anki-apkg-export').default; 
const config = require('./config.json');

function createDeck(dataJson, deckName) {
    if (!dataJson && !deckName) {
        return console.log(`You must store a json file and a deck name in the config.json!`);
    }

    if (!dataJson) {
        return console.log(`You must store a json file in the config.json! (Deck name: ${deckName})`);
    }

    var data;
    try {
        data = require(`./data/${dataJson}`);
    } catch (err) {
        return console.log(`The json file specified in config.json does not exist! (Deck name: ${deckName})`);
    }
    
    const forbiddenCharacters = [
        '\\',
        '/',
        ':',
        '*',
        '?',
        '"',
        '<',
        '>',
        '|'
    ];
    
    const reservedNames = [
        'CON',
        'PRN',
        'AUX',
        'NUL',
        'COM1',
        'COM2',
        'COM3',
        'COM4',
        'COM5',
        'COM6',
        'COM7',
        'COM8',
        'COM9',
        'LPT1',
        'LPT2',
        'LPT3',
        'LPT4',
        'LPT5',
        'LPT6',
        'LPT7',
        'LPT8',
        'LPT9'
    ];
    
    const forbiddenItems = [...forbiddenCharacters, ...reservedNames];

    if (!deckName) {
        return console.log(`You must store a deck name in the config.json! (Json file: ${dataJson})`);
    } else if (forbiddenItems.some(item => deckName.includes(item))) {
        console.log('- Your deck name contains forbidden characters and/or words!');
        console.log(`| Forbidden characters: ${forbiddenCharacters.join(', ')}`);
        console.log(`| Reserved names: ${reservedNames.join(', ')}`);
        console.log(`- Deck name: ${deckName}`);
        return;
    }
    const apkg = new AnkiExport(deckName);
    
    if (!data?.cards || data.cards.length == 0) {
        console.log(`Your ${dataJson} doesn't match the correct structure!`);
        console.log('{');
        console.log('    "cards": [');
        console.log('        {');
        console.log('            "front": "example",');
        console.log('            "back": "example",');
        console.log('            "tags": ["example"]');
        console.log('        }');
        console.log('    ]');
        console.log('}');
        return;
    }

    for (let i=0; i<data.cards?.length; i++) {
        try {
            apkg.addCard(data.cards[i]?.front, data.cards[i]?.back, { tags: data.cards[i]?.tags });
        } catch (err) {
            console.log(`- Something went wrong with one card! (Card number: ${i}, Deck name: ${deckName})`);
            console.log(`| Card number: ${i}`);
            console.log(`- Deck name: ${deckName})`);
        }

        if (!data.cards[i]?.front || !data.cards[i]?.back) {
            console.log('- Following card couldn\'t be added!');
            console.log(`| Front: ${data.cards[i]?.front}`);
            console.log(`| Back: ${data.cards[i]?.back}`);
            console.log(`| Tags: ${data.cards[i]?.tags}`);
            console.log(`| Card number: ${i}`);
            console.log(`- Deck name: ${deckName})`);
        }
    
        if (i == data.cards.length-1) {
            apkg.save().then(zip => {
                fs.writeFileSync(`./apkg/${deckName}.apkg`, zip, 'binary');
                console.log(`${deckName}.apkg was generated!`);
            }).catch(err => console.log(err.stack || err));
        }
    }    
}

function createDecks() {
    if (!config.decks || config.decks.length == 0) {
        console.log('Your config.json doesn\'t match the correct structure!');
        console.log('{');
        console.log('    "decks": [');
        console.log('        {');
        console.log('            "dataJson": "example.json",');
        console.log('            "deckName": "example"');
        console.log('        }');
        console.log('    ]');
        console.log('}');
        return;
    }

    for (let i=0; i<config?.decks.length; i++) {
        createDeck(config.decks[i]?.dataJson, config.decks[i]?.deckName);
    }
}

createDecks();