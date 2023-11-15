const chai = require('chai');
const expect = chai.expect;
const processApplication = require('/workspaces/Capstone/server/endpoints/apply/process-application');

describe('Test process-application route', () => {
    it('should return "Hello process application"', () => {
        const req = {};
        const res = {
            send: function (message) {
                this.message = message;
            }
        };

        processApplication(req, res);
        const actualResult = res.message;
        const expectedResult = 'Hello process application';
        expect(actualResult).to.equal(expectedResult);
    });
});
