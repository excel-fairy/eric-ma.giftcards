function addGiftCard(giftCard) {
    GIFTCARDS_LIST_SHEET.sheet.appendRow([giftCard.barcode, giftCard.address, 'Available']);
}
