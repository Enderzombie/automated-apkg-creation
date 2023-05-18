"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLastItem = exports["default"] = void 0;

var _sha = _interopRequireDefault(require("sha1"));

var _jszip = _interopRequireDefault(require("jszip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _default =
/*#__PURE__*/
function () {
  function _default(deckName, _ref) {
    var template = _ref.template,
        sql = _ref.sql;

    _classCallCheck(this, _default);

    this.db = new sql.Database();
    this.db.run(template);
    var now = Date.now();

    var topDeckId = this._getId('cards', 'did', now);

    var topModelId = this._getId('notes', 'mid', now);

    this.deckName = deckName;
    this.zip = new _jszip["default"]();
    this.media = [];
    this.topDeckId = topDeckId;
    this.topModelId = topModelId;
    this.separator = "\x1F";

    var decks = this._getInitialRowValue('col', 'decks');

    var deck = getLastItem(decks);
    deck.name = this.deckName;
    deck.id = topDeckId;
    decks[topDeckId + ''] = deck;

    this._update('update col set decks=:decks where id=1', {
      ':decks': JSON.stringify(decks)
    });

    var models = this._getInitialRowValue('col', 'models');

    var model = getLastItem(models);
    model.name = this.deckName;
    model.did = this.topDeckId;
    model.id = topModelId;
    models["".concat(topModelId)] = model;

    this._update('update col set models=:models where id=1', {
      ':models': JSON.stringify(models)
    });
  }

  _createClass(_default, [{
    key: "save",
    value: function save(options) {
      var zip = this.zip,
          db = this.db,
          media = this.media;
      var binaryArray = db["export"]();
      var mediaObj = media.reduce(function (prev, curr, idx) {
        prev[idx] = curr.filename;
        return prev;
      }, {});
      zip.file('collection.anki2', new Buffer(binaryArray));
      zip.file('media', JSON.stringify(mediaObj));
      media.forEach(function (item, i) {
        return zip.file(i, item.data);
      });

      if (process.env.APP_ENV === 'browser' || typeof window !== 'undefined') {
        return zip.generateAsync(Object.assign({}, {
          type: 'blob'
        }, options));
      } else {
        return zip.generateAsync(Object.assign({}, {
          type: 'nodebuffer',
          base64: false,
          compression: 'DEFLATE'
        }, options));
      }
    }
  }, {
    key: "addMedia",
    value: function addMedia(filename, data) {
      this.media.push({
        filename: filename,
        data: data
      });
    }
  }, {
    key: "addCard",
    value: function addCard(front, back) {
      var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          tags = _ref2.tags;

      var topDeckId = this.topDeckId,
          topModelId = this.topModelId,
          separator = this.separator;
      var now = Date.now();

      var note_guid = this._getNoteGuid(topDeckId, front, back);

      var note_id = this._getNoteId(note_guid, now);

      var strTags = '';

      if (typeof tags === 'string') {
        strTags = tags;
      } else if (Array.isArray(tags)) {
        strTags = this._tagsToStr(tags);
      }

      this._update('insert or replace into notes values(:id,:guid,:mid,:mod,:usn,:tags,:flds,:sfld,:csum,:flags,:data)', {
        ':id': note_id,
        // integer primary key,
        ':guid': note_guid,
        // text not null,
        ':mid': topModelId,
        // integer not null,
        ':mod': this._getId('notes', 'mod', now),
        // integer not null,
        ':usn': -1,
        // integer not null,
        ':tags': strTags,
        // text not null,
        ':flds': front + separator + back,
        // text not null,
        ':sfld': front,
        // integer not null,
        ':csum': this._checksum(front + separator + back),
        //integer not null,
        ':flags': 0,
        // integer not null,
        ':data': '' // text not null,

      });

      return this._update('insert or replace into cards values(:id,:nid,:did,:ord,:mod,:usn,:type,:queue,:due,:ivl,:factor,:reps,:lapses,:left,:odue,:odid,:flags,:data)', {
        ':id': this._getCardId(note_id, now),
        // integer primary key,
        ':nid': note_id,
        // integer not null,
        ':did': topDeckId,
        // integer not null,
        ':ord': 0,
        // integer not null,
        ':mod': this._getId('cards', 'mod', now),
        // integer not null,
        ':usn': -1,
        // integer not null,
        ':type': 0,
        // integer not null,
        ':queue': 0,
        // integer not null,
        ':due': 179,
        // integer not null,
        ':ivl': 0,
        // integer not null,
        ':factor': 0,
        // integer not null,
        ':reps': 0,
        // integer not null,
        ':lapses': 0,
        // integer not null,
        ':left': 0,
        // integer not null,
        ':odue': 0,
        // integer not null,
        ':odid': 0,
        // integer not null,
        ':flags': 0,
        // integer not null,
        ':data': '' // text not null

      });
    }
  }, {
    key: "_update",
    value: function _update(query, obj) {
      this.db.prepare(query).getAsObject(obj);
    }
  }, {
    key: "_getInitialRowValue",
    value: function _getInitialRowValue(table) {
      var column = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
      var query = "select ".concat(column, " from ").concat(table);
      return this._getFirstVal(query);
    }
  }, {
    key: "_checksum",
    value: function _checksum(str) {
      return parseInt((0, _sha["default"])(str).substr(0, 8), 16);
    }
  }, {
    key: "_getFirstVal",
    value: function _getFirstVal(query) {
      return JSON.parse(this.db.exec(query)[0].values[0]);
    }
  }, {
    key: "_tagsToStr",
    value: function _tagsToStr() {
      var tags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return ' ' + tags.map(function (tag) {
        return tag.replace(/ /g, '_');
      }).join(' ') + ' ';
    }
  }, {
    key: "_getId",
    value: function _getId(table, col, ts) {
      var query = "SELECT ".concat(col, " from ").concat(table, " WHERE ").concat(col, " >= :ts ORDER BY ").concat(col, " DESC LIMIT 1");
      var rowObj = this.db.prepare(query).getAsObject({
        ':ts': ts
      });
      return rowObj[col] ? +rowObj[col] + 1 : ts;
    }
  }, {
    key: "_getNoteId",
    value: function _getNoteId(guid, ts) {
      var query = "SELECT id from notes WHERE guid = :guid ORDER BY id DESC LIMIT 1";
      var rowObj = this.db.prepare(query).getAsObject({
        ':guid': guid
      });
      return rowObj.id || this._getId('notes', 'id', ts);
    }
  }, {
    key: "_getNoteGuid",
    value: function _getNoteGuid(topDeckId, front, back) {
      return (0, _sha["default"])("".concat(topDeckId).concat(front).concat(back));
    }
  }, {
    key: "_getCardId",
    value: function _getCardId(note_id, ts) {
      var query = "SELECT id from cards WHERE nid = :note_id ORDER BY id DESC LIMIT 1";
      var rowObj = this.db.prepare(query).getAsObject({
        ':note_id': note_id
      });
      return rowObj.id || this._getId('cards', 'id', ts);
    }
  }]);

  return _default;
}();

exports["default"] = _default;

var getLastItem = function getLastItem(obj) {
  var keys = Object.keys(obj);
  var lastKey = keys[keys.length - 1];
  var item = obj[lastKey];
  delete obj[lastKey];
  return item;
};

exports.getLastItem = getLastItem;