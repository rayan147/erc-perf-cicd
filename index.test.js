import {region, accessKeyId, secretAccessKey} from './index.js';

// it should be able to read the env variables
test('it should be able to read the env variables', () => {
    expect(region).toBeDefined();
    expect(accessKeyId).toBeDefined();
    expect(secretAccessKey).toBeDefined();
}
);