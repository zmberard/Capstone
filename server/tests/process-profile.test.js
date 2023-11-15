const chai = require('chai');
const expect = chai.expect;
const processApplication = require('/workspaces/Capstone/server/endpoints/profile/process-profile');

describe('Test show-application route', () => {
    it('should return "Hello process profile"', () => {
        const req = {};
        const res = {
            send: function (message) {
                this.message = message;
            }
        };

        processApplication(req, res);
        const actualResult = res.message;
        const expectedResult = 'Hello process profile';
        expect(actualResult).to.equal(expectedResult);
    });
});
