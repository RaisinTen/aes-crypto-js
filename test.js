const { describe, it } = require('node:test');
const { strictEqual } = require('node:assert');

const { encryptAES, decryptAES } = require('.');
const CryptoJS = require('crypto-js');

describe('crypto-js compatibility', () => {
  const plainText = 'Hello, world!';
  const secret = 'umm, shhh ...';

  it('encrypted using crypto-js and decrypted using @raisinten/aes-crypto-js', () => {
    const encrypted = CryptoJS.AES.encrypt(plainText, secret).toString();
    const decrypted = decryptAES(encrypted.toString(), secret);
    strictEqual(decrypted, plainText);
  });

  it('encrypted using @raisinten/aes-crypto-js and decrypted using crypto-js', () => {
    const encrypted = encryptAES(plainText, secret);
    const decrypted = CryptoJS.AES.decrypt(encrypted, secret).toString(CryptoJS.enc.Utf8);
    strictEqual(decrypted, plainText);
  });
});

describe('weird characters in secret', () => {
  const plainText = 'Hello, world!';
  const secret = 'umm, šhhh ... 😀D◌̇랆탆𝐿 𑒹◌̴◌𑒺';

  it('encrypted using crypto-js and decrypted using @raisinten/aes-crypto-js', () => {
    const encrypted = CryptoJS.AES.encrypt(plainText, secret).toString();
    const decrypted = decryptAES(encrypted.toString(), secret);
    strictEqual(decrypted, plainText);
  });

  it('encrypted using @raisinten/aes-crypto-js and decrypted using crypto-js', () => {
    const encrypted = encryptAES(plainText, secret);
    const decrypted = CryptoJS.AES.decrypt(encrypted, secret).toString(CryptoJS.enc.Utf8);
    strictEqual(decrypted, plainText);
  });
});

describe('bytes corresponding to a single character that are split between two buffers', () => {
  const plainText = '\u{30a8}\u{30b9}\u{30af}\u{30fc}\u{30c8}\u{3099}';
  const secret = 'umm, shhh ...';

  it('encrypted using crypto-js and decrypted using @raisinten/aes-crypto-js', () => {
    const encrypted = CryptoJS.AES.encrypt(plainText, secret).toString();
    const decrypted = decryptAES(encrypted.toString(), secret);
    strictEqual(decrypted, plainText);
  });

  it('encrypted using @raisinten/aes-crypto-js and decrypted using crypto-js', () => {
    const encrypted = encryptAES(plainText, secret);
    const decrypted = CryptoJS.AES.decrypt(encrypted, secret).toString(CryptoJS.enc.Utf8);
    strictEqual(decrypted, plainText);
  });
});
