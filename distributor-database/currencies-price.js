/**
 * Fetch bitcoin and ethereum prices and insert it in the parameters sheet
 * Called by menu entry and trigger
 */
function updateCurrenciesPrice() {
    const bitcoinPrice = getCurrencyPrice('BTC');
    PARAMETERS_SHEET.sheet.getRange(PARAMETERS_SHEET.bitcoinPriceCell).setValue(bitcoinPrice);
    const ethereumPrice = getCurrencyPrice('ETH');
    PARAMETERS_SHEET.sheet.getRange(PARAMETERS_SHEET.ethereumPriceCell).setValue(ethereumPrice);
    PARAMETERS_SHEET.sheet.getRange(PARAMETERS_SHEET.currenciesPriceLastUpdateDateCell).setValue(new Date());
}

/**
 * Get the current price of the given cryptocurrency (actually the price of one USD into this currency)
 * @param code The three (or four) characters code of the currency
 */
function getCurrencyPrice(code) {
    return CryptocompareClient.getCurrentPrice(['USD'], [code]).USD[code];
}
