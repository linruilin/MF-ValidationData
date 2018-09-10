"use strict";

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeCodeClass2 = require("../module/typeCodeClass.js");

var _typeCodeClass3 = _interopRequireDefault(_typeCodeClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class           verificationDataClass
 * @classdesc       验证数据有效性
 * @version         1.0.0
 * @author          linruilin <limitlin@outlook.com>
 * @since           1.0.0
 */
var verificationDataClass = function (_typeCodeClass) {
    _inherits(verificationDataClass, _typeCodeClass);

    function verificationDataClass(RegExplist) {
        _classCallCheck(this, verificationDataClass);

        var _this = _possibleConstructorReturn(this, _typeCodeClass.call(this));

        _this.init(RegExplist);
        return _this;
    }

    /**
     * @description 初始化参数
     * @version     1.0.0
     * @param       {Objecr=}       RegExplist                              添加需要覆盖的正则
     * @param       {RegExp=}       RegExplist.Email                        电子邮箱验证正则
     * @param       {Objecr=}       RegExplist.PhoneNumber                  电话号码正则对象
     * @param       {RegExp=}       RegExplist.PhoneNumber.phone_CN         修改某个国家的电话号码正则  国家代码表详情参考：
     * @param       {RegExp=}       RegExplist.Password                     密码格式验证正则
     */


    verificationDataClass.prototype.init = function init(RegExplist) {
        if (!RegExplist && (typeof RegExplist === "undefined" ? "undefined" : _typeof(RegExplist)) != "object") RegExplist = {};
        var RegExpConfig = {
            Email: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
            Password: /^[a-zA-Z0-9!@#$]{6,14}$/,
            PhoneNumber: {
                phone_CN: /^1[3|4|5|7|8][0-9]\d{4,8}$/
            },
            countryCode: /^[a-zA-Z]{2,3}$/
        };

        this.RegExplist = Object.assign({}, RegExpConfig, RegExplist);
    };

    /**
     * @description 时间字符串验证
     * @version     1.0.0
     * @param       {Objecr}        RegObj                      需要验证的数据对象
     * @param       {String}        RegObj.type                 需要验证的对象类型 例：type:Email
     * @param       {String}        RegObj.val                  需要验证的数据内容
     * @param       {String}        RegObj.[country]            国家编码  国家代码表详情参考：
     * @return      {Objecr}        返回结果对象 code=2000为正确
     */


    verificationDataClass.prototype.run = function run(RegObj) {
        var country = "CN";
        if (typeof RegObj.type != "string") {
            return this.getTypeCode(3001);
        }
        if (typeof RegObj.val != "string") {
            return this.getTypeCode(3004);
        }
        if (RegObj.country) {
            country = RegObj.country;
        };

        var listType = RegObj.type;
        var validation = "is" + RegObj.type;
        if (this.RegExplist[listType]) {
            return this[validation](RegObj.val, country);
        } else {
            return this.getTypeCode(3002);
        }
    };

    /**
     * @description 验证邮箱格式
     * @version     1.0.0
     * @param       {String}        val                         需要验证的数据内容
     * @return      {Objecr}        返回结果对象 code=2000为正确
     */


    verificationDataClass.prototype.isEmail = function isEmail(val) {
        if (this.RegExplist.Email.test(val)) {
            return this.getTypeCode(2000);
        } else {
            return this.getTypeCode(3003);
        }
    };

    /**
     * @description 验证手机号
     * @version     1.0.0
     * @param       {String}        val                         需要验证的数据内容
     * @param       {String}        country                     手机所属国家编码
     * @return      {Objecr}        返回结果对象 code=2000为正确
     */


    verificationDataClass.prototype.isPhoneNumber = function isPhoneNumber(val, country) {
        if (typeof country != "string") {
            return this.getTypeCode(3005);
        }
        if (!this.RegExplist.countryCode.test(country) && this.RegExplist.PhoneNumber["phone_" + country] === undefined) {
            return this.getTypeCode(3006);
        }

        var RegExpCountry = "phone_" + country;
        if (!this.RegExplist.PhoneNumber[RegExpCountry]) {
            return this.getTypeCode(3010);
        } else if (this.RegExplist.PhoneNumber[RegExpCountry].test(val)) {
            return this.getTypeCode(2000);
        } else {
            return this.getTypeCode(3007);
        }
    };

    /**
     * @description 验证密码是否正确
     * @version     1.0.0
     * @param       {String}        val                         需要验证的数据内容
     * @return      {Objecr}        返回结果对象 code=2000为正确
     */


    verificationDataClass.prototype.isPassword = function isPassword(val) {
        if (this.RegExplist.Password.test(val)) {
            return this.getTypeCode(2000);
        } else {
            return this.getTypeCode(3009);
        }
    };

    return verificationDataClass;
}(_typeCodeClass3.default);

exports.default = verificationDataClass;