var GIFTCARDS_LIST_SHEET = {
    sheet: SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1"),
    barcodeColumn: ColumnNames.letterToColumnStart0('A'),
    addressColumn: ColumnNames.letterToColumnStart0('B'),
    statusColumn: ColumnNames.letterToColumnStart0('C')
};