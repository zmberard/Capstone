const chai = require('chai');
const expect = chai.expect;
const processApplication = require('/workspaces/Capstone/server/endpoints/email/process-email');

describe('Test show-application route', () => {
    it('should return "Hello process email"', () => {
        const req = {};
        const res = {
            send: function (message) {
                this.message = message;
            }
        };

        processApplication(req, res);
        const actualResult = res.message;
        const expectedResult = 'Hello process email';
        expect(actualResult).to.equal(expectedResult);
    });
});
