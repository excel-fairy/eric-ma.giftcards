/**
 * Import giftcards from both input sheets (bitcoin and ethereum)
 */
function importGiftcards() {
    const giftcardsToInsert = mergeInputSheetsAndEnrichData();
    shareGiftCardsAmongstSalesVPs(giftcardsToInsert);
    const firstAvailableRow = DATABASE_SHEET.sheet.getLastRow() + 1;
    const insertRange = DATABASE_SHEET.sheet.getRange(firstAvailableRow,
        DATABASE_SHEET.barcodeColumn,
        giftcardsToInsert.length,
        DATABASE_SHEET.assignedSalesVPColumn - DATABASE_SHEET.barcodeColumn + 1);
    insertRange.setValues(giftcardsToInsert);
    clearInputSheets();
}

/**
 * Get all the bitcoin giftcards from the input sheet
 */
function getBitcoinGiftcards() {
    return getGiftcards(CSV_EXPORT_FROM_SUPPLIER_BITCOIN_SHEET);
}

/**
 * Get all the ethereum giftcards from the input sheet
 */
function getEthereumGiftcards() {
    return getGiftcards(CSV_EXPORT_FROM_SUPPLIER_ETHEREUM_SHEET);
}

/**
 * Clear all the input sheets
 */
function clearInputSheets() {
    clearInputSheet(CSV_EXPORT_FROM_SUPPLIER_BITCOIN_SHEET);
    clearInputSheet(CSV_EXPORT_FROM_SUPPLIER_ETHEREUM_SHEET);
}

/**
 * Get all the giftcards from a sheet
 * @param sheet Either CSV_EXPORT_FROM_SUPPLIER_BITCOIN_SHEET or CSV_EXPORT_FROM_SUPPLIER_ETHEREUM_SHEET
 */
function getGiftcards(sheet) {
    return getGiftcardsRange(sheet).getValues();
}

/**
 *Empty the giftcards entries from a sheet
 * @param sheet Either CSV_EXPORT_FROM_SUPPLIER_BITCOIN_SHEET or CSV_EXPORT_FROM_SUPPLIER_ETHEREUM_SHEET
 */
function clearInputSheet(sheet) {
    getGiftcardsRange(sheet).clear();
}

/**
 * Get the giftcards range from a sheet
 * @param sheet Either CSV_EXPORT_FROM_SUPPLIER_BITCOIN_SHEET or CSV_EXPORT_FROM_SUPPLIER_ETHEREUM_SHEET
 */
function getGiftcardsRange(sheet) {
    const lastRow = sheet.sheet.getLastRow();
    return sheet.sheet.getRange(sheet.firstGiftCardRow,
        sheet.barcodeColumn,
        lastRow - 1,
        sheet.addressColumn - sheet.barcodeColumn + 1
    );
}


/**
 * Merge both input sheets (bitcoin and ethereum) and add giftcard value and currency
 */
function mergeInputSheetsAndEnrichData() {
    updateCurrenciesPrice();
    const bitcoinGiftcards = getBitcoinGiftcards();
    const ethereumGiftcards = getEthereumGiftcards();
    // noinspection ES6ConvertVarToLetConst
    var retVal = [];
    const vlookupFormula = '=vlookup(A2,importrange("https://docs.google.com/spreadsheets/d/1dRMKViPnjefmWTGkOzWczWLxCq2mcF3BMZlnyigwDq0","Sheet1!A1:C900"),3,false)';
    bitcoinGiftcards.forEach(function (giftcard) {
        var pushVal = [];
        pushVal[DATABASE_SHEET.barcodeColumnStart0] = giftcard[0];
        pushVal[DATABASE_SHEET.addressColumnStart0] = giftcard[1];
        pushVal[DATABASE_SHEET.valueColumnStart0] = PARAMETERS_SHEET.sheet.getRange(PARAMETERS_SHEET.bitcoinGiftcardsValue).getValue();
        pushVal[DATABASE_SHEET.currencyColumnStart0] = 'Bitcoin';
        pushVal[DATABASE_SHEET.assignedSalesVPColumnStart0] = vlookupFormula;
        retVal.push(pushVal);
    });
    ethereumGiftcards.forEach(function (giftcard) {
        var pushVal = [];
        pushVal[DATABASE_SHEET.barcodeColumnStart0] = giftcard[0];
        pushVal[DATABASE_SHEET.addressColumnStart0] = giftcard[1];
        pushVal[DATABASE_SHEET.valueColumnStart0] = PARAMETERS_SHEET.sheet.getRange(PARAMETERS_SHEET.bitcoinGiftcardsValue).getValue();
        pushVal[DATABASE_SHEET.currencyColumnStart0] = 'Ethereum';
        pushVal[DATABASE_SHEET.assignedSalesVPColumnStart0] = vlookupFormula;
        retVal.push(pushVal);
    });
    return retVal;
}
