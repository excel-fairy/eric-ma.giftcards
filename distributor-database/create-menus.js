// noinspection JSUnusedGlobalSymbols
function onOpen() {
    SpreadsheetApp.getUi()
        .createMenu('Run scripts')
        .addItem('Share giftcards', 'shareGiftCards')
        .addItem('Update cryptocurrencies price', 'updateCurrenciesPrice')
        .addToUi();
}