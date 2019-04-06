const utils = require('../../../util/utils')

describe('utility function test', () => {
    it('hashPassword should never return same string as input', async () => {
        let input = "123456789"
        let result = await utils.hashPassword(input);

        expect(result).toEqual(expect.not.stringContaining(input))
    })
})