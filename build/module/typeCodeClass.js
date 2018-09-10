"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class           typeCodeClass
 * @classdesc       状态码基础类
 * @version         1.0.0
 * @author          linruilin <limitlin@outlook.com>
 * @since           1.0.0
 */
var typeCodeClass = function () {
    function typeCodeClass() {
        _classCallCheck(this, typeCodeClass);

        /**
         * @description 错误编码列表
         * @version     1.0.0
         */
        this.typeCodeList = {
            "2000": {
                code: "2000",
                msg: "API Success"
            },
            "3001": {
                code: "3001",
                msg: "ERROR:type of type not string"
            },
            "3002": {
                code: "3002",
                msg: "ERROR:RegExp list does not have such a value"
            },
            "3003": {
                code: "3003",
                msg: "ERROR:E-mail format is wrong"
            },
            "3004": {
                code: "3004",
                msg: "ERROR:type of val not string"
            },
            "3005": {
                code: "3005",
                msg: "ERROR:type of country not string"
            },
            "3006": {
                code: "3006",
                msg: "ERROR:countryCode format is wrong"
            },
            "3007": {
                code: "3007",
                msg: "ERROR:PhoneNumber format is wrong"
            },
            "3008": {
                code: "3008",
                msg: "ERROR:code can not be null"
            },
            "3009": {
                code: "3009",
                msg: "ERROR:Password format is wrong"
            },
            "3010": {
                code: "3010",
                msg: "ERROR:Country code verification does not exist"
            }
        };
    }

    /**
     * @description 错误代码处理
     * @version     1.0.0
     * @param       {String}        code                         返回状态的code值
     * @return      {Objecr}        返回结果对象 code=2000为正确
     */


    typeCodeClass.prototype.getTypeCode = function getTypeCode(code) {
        var errorCode = this.typeCodeList[code];
        return errorCode;
    };

    return typeCodeClass;
}();

exports.default = typeCodeClass;