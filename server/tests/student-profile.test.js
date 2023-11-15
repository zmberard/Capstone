const chai = require('chai');
const expect = chai.expect;
const processApplication = require('/workspaces/Capstone/server/endpoints/profile/student-profile');

describe('Test show-application route', () => {
    it('should return "Hello student profile"', () => {
        const req = {};
        const res = {
            send: function (message) {
                this.message = message;
            }
        };

        processApplication(req, res);
        const actualResult = res.message;
        const expectedResult = 'Hello student profile';
        expect(actualResult).to.equal(expectedResult);
    });
});
