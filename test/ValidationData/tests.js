import chai from "chai";
import MFValidationDataClass from "../../src/index.js";

const expect = chai.expect;
let MFValidationData = new MFValidationDataClass({});
let MFValidationDatas = new MFValidationDataClass().init("sss");

describe('test module src/validationData', function () {

    // 类型错误
    describe('verification MFValidationData params error', function () {
        it('Error type error', function () {
            expect(MFValidationData.run({ type: 1111, val: "a_1@aa.com" }).code).to.have.string("3001");
        });
        it('Error type error', function () {
            expect(MFValidationData.run({ type: "Emails", val: "a_1@aa.com" }).code).to.have.string("3002");
        });
        it('Error 1111 number', function () {
            expect(MFValidationData.run({ type: "Email", val: 1111 }).code).to.have.string("3004");
        });
        it('Error country error', function () {
            expect(MFValidationData.run({ type: "PhoneNumber", country: 1111, val: "13812345678" }).code).to.have.string("3005");
        });
    });

    // 验证邮箱
    describe('verification MFValidationData.run({type:Email})', function () {
        it('abc-123@gmail.com', function () {
            expect(MFValidationData.run({ type: "Email", val: "abc-123@gmail.com" }).code).to.have.string("2000");
        });
        it('a\-_.a@gmail.com', function () {
            expect(MFValidationData.run({ type: "Email", val: "a\-_.a@gmail.com" }).code).to.have.string("2000");
        });
        it('a_1@aa.com', function () {
            expect(MFValidationData.run({ type: "Email", val: "a_1@aa.com" }).code).to.have.string("2000");
        });
        it('Error a_@com', function () {
            expect(MFValidationData.run({ type: "Email", val: "a_@com" }).code).to.have.string("3003");
        });
        it('Error a_@.com', function () {
            expect(MFValidationData.run({ type: "Email", val: "a_@.com" }).code).to.have.string("3003");
        });
        it('Error a_1@a.com', function () {
            expect(MFValidationData.run({ type: "Email", val: "a_1@a.com" }).code).to.have.string("3003");
        });
    });

    // 验证密码
    describe('verification MFValidationData.run({type:Password})', function () {
        it('123456', function () {
            expect(MFValidationData.run({ type: "Password", val: "123456" }).code).to.have.string("2000");
        });
        it('asdfgh', function () {
            expect(MFValidationData.run({ type: "Password", val: "asdfgh" }).code).to.have.string("2000");
        });
        it('ASDFGH', function () {
            expect(MFValidationData.run({ type: "Password", val: "ASDFGH" }).code).to.have.string("2000");
        });
        it('!@#$ASDFGH', function () {
            expect(MFValidationData.run({ type: "Password", val: "!@#$ASDFGH" }).code).to.have.string("2000");
        });
        it('!@#$aA1', function () {
            expect(MFValidationData.run({ type: "Password", val: "!@#$aA1" }).code).to.have.string("2000");
        });
        it('Error !@#$', function () {
            expect(MFValidationData.run({ type: "Password", val: "!@#$" }).code).to.have.string("3009");
        });
        it('Error 12345', function () {
            expect(MFValidationData.run({ type: "Password", val: "12345" }).code).to.have.string("3009");
        });
        it('Error asdfg', function () {
            expect(MFValidationData.run({ type: "Password", val: "asdfg" }).code).to.have.string("3009");
        });
        it('Error asdfghjklqwerty', function () {
            expect(MFValidationData.run({ type: "Password", val: "asdfghjklqwerty" }).code).to.have.string("3009");
        });
    });

    // 验证手机
    describe('verification MFValidationData.run({type:PhoneNumber})', function () {
        it('13812345678', function () {
            expect(MFValidationData.run({ type: "PhoneNumber", val: "13812345678" }).code).to.have.string("2000");
        });
        it('13812345678', function () {
            expect(MFValidationData.run({ type: "PhoneNumber", country: "CN", val: "13812345678" }).code).to.have.string("2000");
        });
        it('13812345678', function () {
            expect(MFValidationData.run({ type: "PhoneNumber", country: "xb", val: "13812345678" }).code).to.have.string("3010");
        });
        it('Error 1234567890', function () {
            expect(MFValidationData.run({ type: "PhoneNumber", country: "CN", val: "1234567890" }).code).to.have.string("3007");
        });
        it('Error country', function () {
            expect(MFValidationData.run({ type: "PhoneNumber", country: "CNnnnn", val: "1234567890" }).code).to.have.string("3006");
        });
        it('Error 123456789012323', function () {
            expect(MFValidationData.run({ type: "PhoneNumber", country: "CN", val: "123456789012323" }).code).to.have.string("3007");
        });
    });
});