/**
 * Fetch bitcoin and ethereum prices and insert it in the parameters sheet
 * Called by menu entry and trigger
 */
function updateCurrenciesPrice() {
    const bitcoinPrice = getCurrencyPrice('BTC');
    console.debug({msg: 'Bitcoin price set', data: {value: bitcoinPrice}});
    PARAMETERS_SHEET.sheet.getRange(PARAMETERS_SHEET.bitcoinPriceCell).setValue(bitcoinPrice);

    const ethereumPrice = getCurrencyPrice('ETH');
    PARAMETERS_SHEET.sheet.getRange(PARAMETERS_SHEET.ethereumPriceCell).setValue(ethereumPrice);
    console.debug({msg: 'Ethereum price set', data: {value: ethereumPrice}});

    PARAMETERS_SHEET.sheet.getRange(PARAMETERS_SHEET.currenciesPriceLastUpdateDateCell).setValue(new Date());
    console.debug({msg: 'Last currencies price update date set', data: {value: new Date()}});
}

/**
 * Get the current price of the given cryptocurrency (actually the price of one USD into this currency)
 * @param code The three (or four) characters code of the currency
 */
function getCurrencyPrice(code) {
    var cryptocompareResponse = CryptocompareClient.getCurrentPrice(['USD'], [code]);
    console.debug({msg: 'Cryptocompare client response', data: cryptocompareResponse});
    return CryptocompareClient.getCurrentPrice(['USD'], [code]).USD[code];
}
