"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
Object.defineProperty(exports, "Exporter", {
  enumerable: true,
  get: function get() {
    return _exporter["default"];
  }
});

var _exporter = _interopRequireDefault(require("./exporter"));

var _template = _interopRequireDefault(require("./template"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sql;

if (process.env.APP_ENV === 'browser' || typeof window !== 'undefined') {
  require('script-loader!sql.js');

  sql = window.SQL;
} else {
  sql = require('sql.js');
}

function _default(deckName, template) {
  return new _exporter["default"](deckName, {
    template: (0, _template["default"])(template),
    sql: sql
  });
}