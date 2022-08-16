import { reverseInputString } from '../../utils/string';

describe('string algorithm tests', () => {

    it('check reverse-string-fn with an even number of characters', async () => {
        const string = await reverseInputString(['h', 'e', 'l', 'l']);
        expect(string).toEqual(['l', 'l', 'e', 'h'])
    })

    it('check reverse-string-fn with an odd number of characters', async () => {
        const string = await reverseInputString(['h', 'e', 'l', 'l', 'o']);
        expect(string).toEqual(['o', 'l', 'l', 'e', 'h'])
    })

    it('check reverse-string-fn with a single character', async () => {
        const string = await reverseInputString(['h']);
        expect(string).toEqual(['h'])
    })

    it('check reverse-string-fn with empty array', async () => {
        const string = await reverseInputString([]);
        expect(string).toEqual([])
    })
})