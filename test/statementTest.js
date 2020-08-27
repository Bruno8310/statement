const test = require('ava');
const {
  statement,
  getAmountByMatchPlayType,
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
  const result = statement(invoice, plays);
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

