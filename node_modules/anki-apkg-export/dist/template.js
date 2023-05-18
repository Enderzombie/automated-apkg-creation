"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createTemplate;

function createTemplate() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$questionFormat = _ref.questionFormat,
      questionFormat = _ref$questionFormat === void 0 ? '{{Front}}' : _ref$questionFormat,
      _ref$answerFormat = _ref.answerFormat,
      answerFormat = _ref$answerFormat === void 0 ? '{{FrontSide}}\n\n<hr id="answer">\n\n{{Back}}' : _ref$answerFormat,
      _ref$css = _ref.css,
      css = _ref$css === void 0 ? '.card {\n font-family: arial;\n font-size: 20px;\n text-align: center;\n color: black;\nbackground-color: white;\n}\n' : _ref$css;

  var conf = {
    nextPos: 1,
    estTimes: true,
    activeDecks: [1],
    sortType: 'noteFld',
    timeLim: 0,
    sortBackwards: false,
    addToCur: true,
    curDeck: 1,
    newBury: true,
    newSpread: 0,
    dueCounts: true,
    curModel: '1435645724216',
    collapseTime: 1200
  };
  var models = {
    1388596687391: {
      veArs: [],
      name: 'Basic-f15d2',
      tags: ['Tag'],
      did: 1435588830424,
      usn: -1,
      req: [[0, 'all', [0]]],
      flds: [{
        name: 'Front',
        media: [],
        sticky: false,
        rtl: false,
        ord: 0,
        font: 'Arial',
        size: 20
      }, {
        name: 'Back',
        media: [],
        sticky: false,
        rtl: false,
        ord: 1,
        font: 'Arial',
        size: 20
      }],
      sortf: 0,
      latexPre: "\\documentclass[12pt]{article}\n\\special{papersize=3in,5in}\n\\usepackage[utf8]{inputenc}\n\\usepackage{amssymb,amsmath}\n\\pagestyle{empty}\n\\setlength{\\parindent}{0in}\n\\begin{document}\n",
      tmpls: [{
        name: 'Card 1',
        qfmt: questionFormat,
        did: null,
        bafmt: '',
        afmt: answerFormat,
        ord: 0,
        bqfmt: ''
      }],
      latexPost: '\\end{document}',
      type: 0,
      id: 1388596687391,
      css: css,
      mod: 1435645658
    }
  };
  var decks = {
    1: {
      desc: '',
      name: 'Default',
      extendRev: 50,
      usn: 0,
      collapsed: false,
      newToday: [0, 0],
      timeToday: [0, 0],
      dyn: 0,
      extendNew: 10,
      conf: 1,
      revToday: [0, 0],
      lrnToday: [0, 0],
      id: 1,
      mod: 1435645724
    },
    1435588830424: {
      desc: '',
      name: 'Template',
      extendRev: 50,
      usn: -1,
      collapsed: false,
      newToday: [545, 0],
      timeToday: [545, 0],
      dyn: 0,
      extendNew: 10,
      conf: 1,
      revToday: [545, 0],
      lrnToday: [545, 0],
      id: 1435588830424,
      mod: 1435588830
    }
  };
  var dconf = {
    1: {
      name: 'Default',
      replayq: true,
      lapse: {
        leechFails: 8,
        minInt: 1,
        delays: [10],
        leechAction: 0,
        mult: 0
      },
      rev: {
        perDay: 100,
        fuzz: 0.05,
        ivlFct: 1,
        maxIvl: 36500,
        ease4: 1.3,
        bury: true,
        minSpace: 1
      },
      timer: 0,
      maxTaken: 60,
      usn: 0,
      "new": {
        perDay: 20,
        delays: [1, 10],
        separate: true,
        ints: [1, 4, 7],
        initialFactor: 2500,
        bury: true,
        order: 1
      },
      mod: 0,
      id: 1,
      autoplay: true
    }
  };
  return "\n    PRAGMA foreign_keys=OFF;\n    BEGIN TRANSACTION;\n    CREATE TABLE col (\n        id              integer primary key,\n        crt             integer not null,\n        mod             integer not null,\n        scm             integer not null,\n        ver             integer not null,\n        dty             integer not null,\n        usn             integer not null,\n        ls              integer not null,\n        conf            text not null,\n        models          text not null,\n        decks           text not null,\n        dconf           text not null,\n        tags            text not null\n    );\n    INSERT INTO \"col\" VALUES(\n      1,\n      1388548800,\n      1435645724219,\n      1435645724215,\n      11,\n      0,\n      0,\n      0,\n      '".concat(JSON.stringify(conf), "',\n      '").concat(JSON.stringify(models), "',\n      '").concat(JSON.stringify(decks), "',\n      '").concat(JSON.stringify(dconf), "',\n      '{}'\n    );\n    CREATE TABLE notes (\n        id              integer primary key,   /* 0 */\n        guid            text not null,         /* 1 */\n        mid             integer not null,      /* 2 */\n        mod             integer not null,      /* 3 */\n        usn             integer not null,      /* 4 */\n        tags            text not null,         /* 5 */\n        flds            text not null,         /* 6 */\n        sfld            integer not null,      /* 7 */\n        csum            integer not null,      /* 8 */\n        flags           integer not null,      /* 9 */\n        data            text not null          /* 10 */\n    );\n    CREATE TABLE cards (\n        id              integer primary key,   /* 0 */\n        nid             integer not null,      /* 1 */\n        did             integer not null,      /* 2 */\n        ord             integer not null,      /* 3 */\n        mod             integer not null,      /* 4 */\n        usn             integer not null,      /* 5 */\n        type            integer not null,      /* 6 */\n        queue           integer not null,      /* 7 */\n        due             integer not null,      /* 8 */\n        ivl             integer not null,      /* 9 */\n        factor          integer not null,      /* 10 */\n        reps            integer not null,      /* 11 */\n        lapses          integer not null,      /* 12 */\n        left            integer not null,      /* 13 */\n        odue            integer not null,      /* 14 */\n        odid            integer not null,      /* 15 */\n        flags           integer not null,      /* 16 */\n        data            text not null          /* 17 */\n    );\n    CREATE TABLE revlog (\n        id              integer primary key,\n        cid             integer not null,\n        usn             integer not null,\n        ease            integer not null,\n        ivl             integer not null,\n        lastIvl         integer not null,\n        factor          integer not null,\n        time            integer not null,\n        type            integer not null\n    );\n    CREATE TABLE graves (\n        usn             integer not null,\n        oid             integer not null,\n        type            integer not null\n    );\n    ANALYZE sqlite_master;\n    INSERT INTO \"sqlite_stat1\" VALUES('col',NULL,'1');\n    CREATE INDEX ix_notes_usn on notes (usn);\n    CREATE INDEX ix_cards_usn on cards (usn);\n    CREATE INDEX ix_revlog_usn on revlog (usn);\n    CREATE INDEX ix_cards_nid on cards (nid);\n    CREATE INDEX ix_cards_sched on cards (did, queue, due);\n    CREATE INDEX ix_revlog_cid on revlog (cid);\n    CREATE INDEX ix_notes_csum on notes (csum);\n    COMMIT;\n  ");
}