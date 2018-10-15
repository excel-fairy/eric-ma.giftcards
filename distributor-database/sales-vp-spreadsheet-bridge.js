var SALES_VP_SPREADSHEETS = {
    giftcardsListSheet: {
        name: 'Sheet1',
        barcodeColumn: ColumnNames.letterToColumnStart0('A'),
        addressColumn: ColumnNames.letterToColumnStart0('B'),
        statusColumn: ColumnNames.letterToColumnStart0('C')
    }
};

/**
 * Add a giftcard to the list
 * @param salesVPSpreadsheetId ID of the spreadsheet of the sales VP
 * @param giftCard Object that has two fields: barcode and address
 */
function addGiftCardToSalesVPSpreadsheet(salesVPSpreadsheetId, giftCard) {
    const salesVPSpreadsheet = SpreadsheetApp.openById(salesVPSpreadsheetId);
    const giftcardsListSpreadsheet = salesVPSpreadsheet.getSheetByName(SALES_VP_SPREADSHEETS.giftcardsListSheet.name);
    giftcardsListSpreadsheet.appendRow([giftCard.barcode, giftCard.address, 'Available']);
}

