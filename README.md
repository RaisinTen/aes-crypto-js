# aes-crypto-js

The `@raisinten/aes-crypto-js` library provides a lightweight and convenient AES encryption/decryption API to make it easier to migrate away from the [deprecated `crypto-js` library](https://github.com/brix/crypto-js).

## Usage

```js
const { encryptAES, decryptAES } = require('@raisinten/aes-crypto-js');

const plainText = 'Hello, world!';
const secret = 'umm, shhh ...';

const encrypted = encryptAES(plainText, secret);
console.log(encrypted);
// U2FsdGVkX18T+lGbQ19d5PT205PrfCiti+f8hlKr/9E=

const decrypted = decryptAES(encrypted, secret);
console.log(decrypted);
// Hello, world!
```

## API

### `encryptAES(plainText, secret)`

- `plainText` (**string**) - The string to be encrypted.
- `secret` (**string**) - The string to be used as the secret for the encryption.
- Returns **string** - The encrypted string in `base64` format.

Encrypts the plaintext using the secret.

### `decryptAES(encrypted, secret)`

- `encrypted` (**string**) - The string to be decrypted.
- `secret` (**string**) - The string to be used as the secret for the decryption.
- Returns **string** - The decrypted string.

Decrypts the encrypted string using the secret.

> [!NOTE]
> The only difference from the AES implementation in the `crypto-js` library is that if there is a lone surrogate in a string, the `crypto-js` library crashes whereas this library replaces it with `U+FFFD`.

## License

MIT
