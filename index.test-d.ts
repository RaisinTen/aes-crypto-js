import { expectType } from 'tsd';
import { encryptAES, decryptAES } from '.';

expectType<string>(encryptAES('foo', 'bar'));
expectType<string>(decryptAES('foo', 'bar'));