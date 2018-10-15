/**
 * Add a giftcard to the list
 * @param giftCard Object that has two fields: barcode and address
 */
function addGiftCard(giftCard) {
    GIFTCARDS_LIST_SHEET.sheet.appendRow([giftCard.barcode, giftCard.address, 'Available']);
}
