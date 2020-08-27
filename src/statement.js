function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;

  const format = formatNumber();

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = getAmountByMatchPlayType(perf.audience, play.type);

    let thisCredit = 0;
    thisCredit += calculateVolumeCredits(perf.audience, play.type);
    

    result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
    volumeCredits += thisCredit;
  }
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
  statement,
  getAmountByMatchPlayType,
};