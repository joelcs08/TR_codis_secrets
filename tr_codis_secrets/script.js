const encryptionSystemButton = document.getElementById('encryption-system-button');
const cesarCypherButton = document.getElementById('cesar-cypher-button');
const vigenereCypherButton = document.getElementById('vigenere-cypher-button');
const atbashCypherButton = document.getElementById('atbash-cypher-button');
const form = document.getElementById('encrypt-form');
const result = document.getElementById('encrypted-message');

let selectedSystem = null;

encryptionSystemButton.addEventListener('click', () => {
    const dropdownContent = document.getElementById('dropdown-content');

    if (dropdownContent.style.visibility === 'visible') {
        dropdownContent.style.visibility = 'collapse';
        dropdownContent.style.position = 'absolute';
    } else {
        dropdownContent.style.visibility = 'visible';
        dropdownContent.style.position = 'relative';
    }
})

cesarCypherButton.addEventListener('click', () => {
    encryptionSystemButton.textContent = 'Xifratge Cesar';

    const dropdownContent = document.getElementById('dropdown-content');
    dropdownContent.style.visibility = 'collapse';
    dropdownContent.style.position = 'absolute';

    const keyInfo = document.getElementById('key-info');
    keyInfo.hidden = false;

    const key = document.getElementById('key');
    key.value = '';
    key.type = 'number';
    key.min = 0;
    key.max = 26;

    selectedSystem = 'cesar';
})

vigenereCypherButton.addEventListener('click', () => {
    encryptionSystemButton.textContent = 'Xifratge Vigenère';

    const dropdownContent = document.getElementById('dropdown-content');
    dropdownContent.style.visibility = 'collapse';
    dropdownContent.style.position = 'absolute';

    const keyInfo = document.getElementById('key-info');
    keyInfo.hidden = false;

    const key = document.getElementById('key');
    key.type = 'text';
    key.removeAttribute('min');
    key.removeAttribute('max');

    selectedSystem = 'vigenere';
})

atbashCypherButton.addEventListener('click', () => {
    encryptionSystemButton.textContent = 'Xifratge Atbash';

    const dropdownContent = document.getElementById('dropdown-content');
    dropdownContent.style.visibility = 'collapse';
    dropdownContent.style.position = 'absolute';

    const keyInfo = document.getElementById('key-info');
    keyInfo.hidden = true;

    selectedSystem = 'atbash';
})

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const messageField = document.getElementById('message');
    const message = messageField.value;
    const keyField = document.getElementById('key');
    const key = keyField.value;

    switch (selectedSystem) {
        case 'cesar':
            result.textContent = encryptCesar(message, key);
            break;
        
        case 'vigenere':
            result.textContent = encryptVigenere(message, key.toLowerCase());
            break;
        
        case 'atbash':
            result.textContent = encryptAtbash(message);
            break;
        
        default:
            result.textContent = 'Si us plau, selecciona un sistema d\'encriptació.';
            break;
    }
})

function encryptCesar(message, key) {
    let encryptedMessage = '';
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let codedAlphabet = alphabet.slice(key) + alphabet.slice(0, key);

    for (let i = 0; i < message.length; i++) {
        const char = message[i];

        if (char === char.toUpperCase()) {
            alphabet = alphabet.toUpperCase();
            codedAlphabet = codedAlphabet.toUpperCase();
        } else if (char === char.toLowerCase()) {
            alphabet = alphabet.toLowerCase();
            codedAlphabet = codedAlphabet.toLowerCase();
        }

        const index = alphabet.indexOf(char);
        encryptedMessage += index !== -1 ? codedAlphabet[index] : char;
    }
    
    return encryptedMessage;
}

function encryptVigenere(message, key) {
    let encryptedMessage = '';
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';

    let spaceCount = 0;
    for (let i = 0; i < message.length; i++) {
        const char = message[i];
        if (char.match(/[^a-z]/i)) {
            encryptedMessage += char;
            spaceCount++;
            continue;
        }

        let permutation = alphabet.toLowerCase().indexOf(key[(i - spaceCount) % key.length]);
        let codedAlphabet = alphabet.slice(permutation) + alphabet.slice(0, permutation);
        
        if (char === char.toUpperCase()) {
            alphabet = alphabet.toUpperCase();
            codedAlphabet = codedAlphabet.toUpperCase();
        } else if (char === char.toLowerCase()) {
            alphabet = alphabet.toLowerCase();
            codedAlphabet = codedAlphabet.toLowerCase();
        }

        const index = alphabet.indexOf(char);
        encryptedMessage += codedAlphabet[index];
    }

    return encryptedMessage;
}

function encryptAtbash(message) {
    let encryptedMessage = '';
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let codedAlphabet = alphabet.split('').reverse().join('');

    for (let i = 0; i < message.length; i++) {
        const char = message[i];

        if (char === char.toUpperCase()) {
            alphabet = alphabet.toUpperCase();
            codedAlphabet = codedAlphabet.toUpperCase();
        } else if (char === char.toLowerCase()) {
            alphabet = alphabet.toLowerCase();
            codedAlphabet = codedAlphabet.toLowerCase();
        }

        const index = alphabet.indexOf(char);
        encryptedMessage += index !== -1 ? codedAlphabet[index] : char;
    }

    return encryptedMessage;
}