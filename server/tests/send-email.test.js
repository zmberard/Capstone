const chai = require('chai');
const expect = chai.expect;
const processApplication = require('/workspaces/Capstone/server/endpoints/email/send-email');

describe('Test show-application route', () => {
    it('should return "Hello send email"', () => {
        const req = {};
        const res = {
            send: function (message) {
                this.message = message;
            }
        };

        processApplication(req, res);
        const actualResult = res.message;
        const expectedResult = 'Hello send email';
        expect(actualResult).to.equal(expectedResult);
    });
});
