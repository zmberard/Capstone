const chai = require('chai');
const expect = chai.expect;
const processApplication = require('/workspaces/Capstone/server/endpoints/apply/show-application');

describe('Test show-application route', () => {
    it('should return "Hello show application"', () => {
        const req = {};
        const res = {
            send: function (message) {
                this.message = message;
            }
        };

        processApplication(req, res);
        const actualResult = res.message;
        const expectedResult = 'Hello show application';
        expect(actualResult).to.equal(expectedResult);
    });
});
