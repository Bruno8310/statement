const test = require('ava');
const {
  statementInputWithTxt,
  getAmountByMatchPlayType,
  statementInputWithHtml
} = require('../src/statement');

test('statement case 1. Customer BigCo has three performances', t => {
  // given
  const invoice = {
    'customer': 'BigCo',
    'performances': [{
        'playID': 'hamlet',
        'audience': 55,
      },
      {
        'playID': 'as-like',
        'audience': 35,
      },
      {
        'playID': 'othello',
        'audience': 40,
      },
    ],
  };
  const plays = {
    'hamlet': {
      'name': 'Hamlet',
      'type': 'tragedy',
    },
    'as-like': {
      'name': 'As You Like It',
      'type': 'comedy',
    },
    'othello': {
      'name': 'Othello',
      'type': 'tragedy',
    },
  };
  // when
  const result = statementInputWithTxt(invoice, plays);
  // then
  t.is(result, 'Statement for BigCo\n' +
    ' Hamlet: $650.00 (55 seats)\n' +
    ' As You Like It: $580.00 (35 seats)\n' +
    ' Othello: $500.00 (40 seats)\n' +
    'Amount owed is $1,730.00\n' +
    'You earned 47 credits \n');
});

test('statement case 2. Customer BigCo has one performance tragedyand the audience is 31.', t => {
  // given
  const audience = 31;
  const type = 'tragedy';
  // when
  const result = getAmountByMatchPlayType(audience, type);
  // then
  t.is(result, 41000);
});

test('statement case 3. Customer BigCo has one unknown performance.', t => {
  // given
  const audience = 31;
  const type = 'no matching';
  // when
  try {
    getAmountByMatchPlayType(audience, type);
    t.fail();
  } catch (error) {
    // then
    t.is(error.message, "unknown type: no matching")
  }

})

test('statement case 4. input with html', t => {
  // given
  const invoice = {
    'customer': 'BigCo',
    'performances': [{
        'playID': 'hamlet',
        'audience': 55,
      },
      {
        'playID': 'as-like',
        'audience': 35,
      },
      {
        'playID': 'othello',
        'audience': 40,
      },
    ],
  };
  const plays = {
    'hamlet': {
      'name': 'Hamlet',
      'type': 'tragedy',
    },
    'as-like': {
      'name': 'As You Like It',
      'type': 'comedy',
    },
    'othello': {
      'name': 'Othello',
      'type': 'tragedy',
    },
  };
  // when
  const result = statementInputWithHtml(invoice, plays);

  t.is(result, '<h1>Statement for BigCo</h1>\n' +
    '<table>\n' +
    '<tr><th>play</th><th>seats</th><th>cost</th></tr>' +
    ' <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>\n' +
    ' <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>\n' +
    ' <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>\n' +
    '</table>\n' +
    '<p>Amount owed is <em>$1,730.00</em></p>\n' +
    '<p>You earned <em>47</em> credits</p>\n');
})