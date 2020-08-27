function statementInputWithHtml(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let orderContent = '';

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisCredit = 0;
    let thisAmount = getAmountByMatchPlayType(perf.audience, play.type);

    thisCredit += calculateVolumeCredits(perf.audience, play.type);
    orderContent += inputResultFormatWithOnetHtml(perf.audience, play.name, thisAmount);

    totalAmount += thisAmount;
    volumeCredits += thisCredit;

  }
  let result = '';
  result = inputResultFormatWithAllHtml(invoice, totalAmount, volumeCredits, orderContent);
  return result;
}

function statementInputWithTxt(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let orderContent = '';

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisCredit = 0;
    let thisAmount = getAmountByMatchPlayType(perf.audience, play.type);

    thisCredit += calculateVolumeCredits(perf.audience, play.type);
    orderContent += inputResultFormatWithOneTxt(perf.audience, play.name, thisAmount);

    totalAmount += thisAmount;
    volumeCredits += thisCredit;

  }
  let result = '';
  result = inputResultFormatWithAllTxt(invoice, totalAmount, volumeCredits, orderContent);
  return result;
}

function inputResultFormatWithAllHtml(invoice, totalAmount, volumeCredits, orderContent) {
  const format = formatNumber();
  let result = `<h1>Statement for ${invoice.customer}</h1>\n`;
  result += '<table>\n' +
    '<tr><th>play</th><th>seats</th><th>cost</th></tr>';
  result += orderContent;
  result += '</table>\n' + `<p>Amount owed is <em>${format(totalAmount / 100)}</em></p>\n`;
  result += `<p>You earned <em>${volumeCredits}</em> credits</p>\n`;
  return result;

}

function inputResultFormatWithOnetHtml(audience, name, thisAmount) {
  const format = formatNumber();
  return ` <tr><td>${name}</td><td>${audience}</td><td>${format(thisAmount / 100)}</td></tr>\n`;
}

function inputResultFormatWithOneTxt(audience, name, thisAmount) {
  const format = formatNumber();
  return ` ${name}: ${format(thisAmount / 100)} (${audience} seats)\n`;
}

function inputResultFormatWithAllTxt(invoice, totalAmount, volumeCredits, orderContent) {
  const format = formatNumber();
  let result = `Statement for ${invoice.customer}\n`;
  result += orderContent;
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits \n`;
  return result;
}

function calculateVolumeCredits(audience, type) {
  let volumeCredits = 0;
  volumeCredits += Math.max(audience - 30, 0);
  if ('comedy' === type) volumeCredits += Math.floor(audience / 5);
  return volumeCredits
}

function formatNumber() {
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;
  return format;
}

function getAmountByMatchPlayType(audience, type) {
  switch (type) {
    case 'tragedy':
      thisAmount = 40000;
      if (audience > 30) {
        thisAmount += 1000 * (audience - 30);
      }
      break;
    case 'comedy':
      thisAmount = 30000;
      if (audience > 20) {
        thisAmount += 10000 + 500 * (audience - 20);
      }
      thisAmount += 300 * audience;
      break;
    default:
      throw new Error(`unknown type: ${type}`);
  }
  return thisAmount;

}

module.exports = {
  statementInputWithTxt,
  getAmountByMatchPlayType,
  statementInputWithHtml
};