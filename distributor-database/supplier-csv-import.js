// noinspection ES6ConvertVarToLetConst
/**
 * Contains spreadsheet IDs of the sales VPs
 * @type {{"1": Object, "2": Object, "3": Object}}
 */
var salesVPSpreadsheetsIds = {
    1: PARAMETERS_SHEET.sheet.getRange(PARAMETERS_SHEET.salesVP1SpreadsheetId).getValue(),
    2: PARAMETERS_SHEET.sheet.getRange(PARAMETERS_SHEET.salesVP2SpreadsheetId).getValue(),
    3: PARAMETERS_SHEET.sheet.getRange(PARAMETERS_SHEET.salesVP3SpreadsheetId).getValue()
};

// noinspection ES6ConvertVarToLetConst
/**
 * Contains names of the sales VPs
 * @type {{"1": Object, "2": Object, "3": Object}}
 */
var salesVPNames = {
    1: PARAMETERS_SHEET.sheet.getRange(PARAMETERS_SHEET.salesVP1Name).getValue(),
    2: PARAMETERS_SHEET.sheet.getRange(PARAMETERS_SHEET.salesVP2Name).getValue(),
    3: PARAMETERS_SHEET.sheet.getRange(PARAMETERS_SHEET.salesVP3Name).getValue()
};



/**
 * Import giftcards from both input sheets (bitcoin and ethereum)
 */
function importGiftcards() {
    const importedGiftcards = mergeInputSheets();
    shareGiftCardsAmongstSalesVPs(importedGiftcards);
    const giftcardsToInsert = enrichImportedGiftcardsList(importedGiftcards);
    const firstAvailableRow = DATABASE_SHEET.sheet.getLastRow() + 1;
    const insertRange = DATABASE_SHEET.sheet.getRange(firstAvailableRow,
        DATABASE_SHEET.barcodeColumn,
        giftcardsToInsert.length,
        DATABASE_SHEET.salesVPStatusColumn - DATABASE_SHEET.barcodeColumn + 1);
    insertRange.setValues(giftcardsToInsert);
    exportGiftcardsToSalesVPSpreadsheets(giftcardsToInsert);
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
 * @return T[] | array of objects of three elements: barcode, address and currency of the giftcard
 */
function mergeInputSheets() {
    // noinspection ES6ConvertVarToLetConst
    const bitcoinGiftcards = getBitcoinGiftcards().map(function (gc) {
        return {
            barcode: gc[0],
            address: gc[1],
            currency: 'Bitcoin',
        };
    });
    const ethereumGiftcards = getEthereumGiftcards().map(function (gc) {
        return {
            barcode: gc[0],
            address: gc[1],
            currency: 'Ethereum',
        };
    });
    return bitcoinGiftcards.concat(ethereumGiftcards);
}


/**
 * Add peripheral data to each giftcard in the input array
 * @param giftCardsList The input array of objects that have four elements: barcode, address, currency type, and salesVP (its number)
 * @return {Array} An array of arrays (each sub-array represents a giftcard
 */
function enrichImportedGiftcardsList(giftCardsList) {
    updateCurrenciesPrice();
    // noinspection ES6ConvertVarToLetConst
    var retVal = [];
    giftCardsList.forEach(function (giftcard) {
        const salesVP = giftcard.salesVP;
        // noinspection ES6ConvertVarToLetConst
        var pushVal = [];
        pushVal[DATABASE_SHEET.barcodeColumnStart0] = giftcard.barcode;
        pushVal[DATABASE_SHEET.addressColumnStart0] = giftcard.address;
        if(giftcard.currency === 'Bitcoin')
            pushVal[DATABASE_SHEET.valueColumnStart0] = PARAMETERS_SHEET.sheet.getRange(PARAMETERS_SHEET.bitcoinGiftcardsValue).getValue();
        else if(giftcard.currency === 'Ethereum')
            pushVal[DATABASE_SHEET.valueColumnStart0] = PARAMETERS_SHEET.sheet.getRange(PARAMETERS_SHEET.ethereumGiftcardsValue).getValue();
        pushVal[DATABASE_SHEET.currencyColumnStart0] = giftcard.currency;
        pushVal[DATABASE_SHEET.assignedSalesVPColumnStart0] = salesVPNames[salesVP];
        pushVal[DATABASE_SHEET.salesVPStatusColumnStart0] = getSalesVPStatusFormula(salesVP);
        retVal.push(pushVal);
    });
    return retVal;
}

/**
 * Get the formula that will fetch the status of a sale from the Sales VP spreadsheet
 * @param salesVP The number of the Sales VP
 * @return {string} The formula
 * example of output: =VLOOKUP(OFFSET(INDIRECT(SUBSTITUTE(ADDRESS(ROW(),COLUMN()),"$","")),0,-5),IMPORTRANGE("https://docs.google.com/spreadsheets/d/__SHEET_ID__","Sheet1!A1:C900"),3,false)
 */
function getSalesVPStatusFormula(salesVP) {
    const salesVPSSpreadsheetId = salesVPSpreadsheetsIds[salesVP];
    const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/' + salesVPSSpreadsheetId;
    const salesVPSheetName = 'Sheet1';
    const barcodeCellRelativeLocationFormula = 'OFFSET(INDIRECT(SUBSTITUTE(ADDRESS(ROW(),COLUMN()),"$","")),0,-5)';
    return '=VLOOKUP(' + barcodeCellRelativeLocationFormula + ',IMPORTRANGE("' + spreadsheetUrl + '","' + salesVPSheetName + '!A1:C900"),3,false)';
}

function exportGiftcardsToSalesVPSpreadsheets(giftcards) {
    giftcards.forEach(function (giftcard) {
        const salesVPSpreadsheetId = salesVPSpreadsheetsIds[salesVPNameToNumber(giftcard[DATABASE_SHEET.assignedSalesVPColumnStart0])];
        addGiftCardToSalesVPSpreadsheet(salesVPSpreadsheetId, {
            barcode: giftcard[DATABASE_SHEET.barcodeColumnStart0],
            address: giftcard[DATABASE_SHEET.addressColumnStart0]
        })
    });
}

/**
 * Get the sales VP number from its name
 * @param salesVPName The Sales VP name de la forme "SalesVP X" where X is a number
 */
function salesVPNameToNumber(salesVPName) {
    return salesVPName.split(' ')[2];
}