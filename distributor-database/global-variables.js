// noinspection ES6ConvertVarToLetConst
var CSV_EXPORT_FROM_SUPPLIER_BITCOIN_SHEET = {
    sheet: SpreadsheetApp.getActiveSpreadsheet().getSheetByName('CSV export from supplier - Bitcoin'),
    firstGiftCardRow: 2,
    barcodeColumn: ColumnNames.letterToColumn('A'),
    addressColumn: ColumnNames.letterToColumn('B')
};

// noinspection ES6ConvertVarToLetConst
var CSV_EXPORT_FROM_SUPPLIER_ETHEREUM_SHEET = {
    sheet: SpreadsheetApp.getActiveSpreadsheet().getSheetByName('CSV export from supplier - Ethereum'),
    firstGiftCardRow: 2,
    barcodeColumn: ColumnNames.letterToColumn('A'),
    addressColumn: ColumnNames.letterToColumn('B')
};

// noinspection ES6ConvertVarToLetConst
var DATABASE_SHEET = {
    sheet: SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Database'),
    barcodeColumn: ColumnNames.letterToColumn('A'),
    barcodeColumnStart0: ColumnNames.letterToColumnStart0('A'),
    addressColumn: ColumnNames.letterToColumn('B'),
    addressColumnStart0: ColumnNames.letterToColumnStart0('B'),
    valueColumn: ColumnNames.letterToColumn('C'),
    valueColumnStart0: ColumnNames.letterToColumnStart0('C'),
    currencyColumn: ColumnNames.letterToColumn('D'),
    currencyColumnStart0: ColumnNames.letterToColumnStart0('D'),
    assignedSalesVPColumn: ColumnNames.letterToColumn('E'),
    assignedSalesVPColumnStart0: ColumnNames.letterToColumnStart0('E'),
    salesVPStatusColumn: ColumnNames.letterToColumn('F'),
    salesVPStatusColumnStart0: ColumnNames.letterToColumnStart0('F'),
    salesAgentStatusColumn: ColumnNames.letterToColumn('G'),
    saleDateColumn: ColumnNames.letterToColumn('H'),
    convertedColumn: ColumnNames.letterToColumn('I'),
    soldPriceColumn: ColumnNames.letterToColumn('J'),
    marginColumn: ColumnNames.letterToColumn('K'),
    distributorMarginColumn: ColumnNames.letterToColumn('L'),
    salesVPMarginColumn: ColumnNames.letterToColumn('M'),
    salesAgentMarginColumn: ColumnNames.letterToColumn('N')
};

// noinspection ES6ConvertVarToLetConst
var PARAMETERS_SHEET = {
    sheet: SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Parameters'),
    marginCell: 'F5',
    bitcoinGiftcardsValue: 'J5',
    ethereumGiftcardsValue: 'J6',
    salesVP1Name: 'A7',
    salesVP1Share: 'B7',
    salesVP1SpreadsheetId: 'B14',
    salesVP2Name: 'A8',
    salesVP2Share: 'B8',
    salesVP2SpreadsheetId: 'B15',
    salesVP3Name: 'A9',
    salesVP3Share: 'B9',
    salesVP3SpreadsheetId: 'B16',
    currenciesPriceLastUpdateDateCell: 'M7',
    bitcoinPriceCell: 'M8',
    ethereumPriceCell: 'M9',
};