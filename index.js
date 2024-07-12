const crypto = require('node:crypto');

// Refs: https://github.com/brix/crypto-js/issues/468#issuecomment-2060562277
function encryptAES(plainText, secret) {
  const salt = crypto.randomBytes(8);
  const password = Buffer.concat([Buffer.from(secret), salt]);
  const hash = [];
  let digest = password;
  for (let i = 0; i < 3; i++) {
    hash[i] = crypto.createHash('md5').update(digest).digest();
    digest = Buffer.concat([hash[i], password]);
  }
  const keyDerivation = Buffer.concat(hash);
  const key = keyDerivation.subarray(0, 32);
  const iv = keyDerivation.subarray(32);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  return Buffer.concat([
    Buffer.from('Salted__', 'utf8'),
    salt,
    cipher.update(plainText),
    cipher.final()
  ]).toString('base64');
}

// Refs: https://github.com/brix/crypto-js/issues/468#issuecomment-1783351942
function decryptAES(encryptedText, secret) {
  // From https://gist.github.com/schakko/2628689?permalink_comment_id=3321113#gistcomment-3321113
  // From https://gist.github.com/chengen/450129cb95c7159cb05001cc6bdbf6a1
  const cypher = Buffer.from(encryptedText, 'base64');
  const salt = cypher.slice(8, 16);
  const password = Buffer.concat([Buffer.from(secret), salt]);
  const md5Hashes = [];
  let digest = password;
  for (let i = 0; i < 3; i++) {
    md5Hashes[i] = crypto.createHash('md5').update(digest).digest();
    digest = Buffer.concat([md5Hashes[i], password]);
  }
  const key = Buffer.concat([md5Hashes[0], md5Hashes[1]]);
  const iv = md5Hashes[2];
  const contents = cypher.slice(16);
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

  return Buffer.concat([
    decipher.update(contents),
    decipher.final()
  ]).toString('utf8');
}

module.exports = {
  encryptAES,
  decryptAES,
};
