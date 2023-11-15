const chai = require('chai');
const expect = chai.expect;
const processApplication = require('/workspaces/Capstone/server/endpoints/login/process-login');

describe('Test show-application route', () => {
    it('should return "Hello process login"', () => {
        const req = {};
        const res = {
            send: function (message) {
                this.message = message;
            }
        };

        processApplication(req, res);
        const actualResult = res.message;
        const expectedResult = 'Hello process login';
        expect(actualResult).to.equal(expectedResult);
    });
});
