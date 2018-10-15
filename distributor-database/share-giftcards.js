/**
 * Share giftcards between all three sales VPs. Repartition is weighted on the factor in the parameters sheet
 * This function modifies the elements of the array passed as an argument
 * @param giftcards The giftcards to share
 */
function shareGiftCardsAmongstSalesVPs(giftcards) {
    const nbGC = giftcards.length;
    // noinspection ES6ConvertVarToLetConst
    var SalesVPNbOfGC = {
        1: 0,
        2: 0,
        3: 0
    };
    const nbGiftcardsPerSalesAgent = computeNbGiftcardsPerSalesAgent(nbGC);

    // noinspection ES6ConvertVarToLetConst
    var skippedSalesVP = {
        1: nbGiftcardsPerSalesAgent[1] === 0,
        2: nbGiftcardsPerSalesAgent[2] === 0,
        3: nbGiftcardsPerSalesAgent[3] === 0
    };
    giftcards.forEach(function (giftCard) {

        const salesVP = getRandomSalesVP(skippedSalesVP);
        SalesVPNbOfGC[salesVP]++;
        if(SalesVPNbOfGC[salesVP] === nbGiftcardsPerSalesAgent[salesVP])
            skippedSalesVP[salesVP] = true;
        giftCard.salesVP = salesVP;
    })
}

/**
 * Computes the number of giftcards each sales VP should get
 * @param nbOfGiftcards The total number of giftcards to share
 * @return {{"1": number, "2": number, "3": number}}
 */
function computeNbGiftcardsPerSalesAgent(nbOfGiftcards) {
    const nbGCForSalesVP1 = Math.floor(PARAMETERS_SHEET.sheet.getRange(PARAMETERS_SHEET.salesVP1Share).getValue() * nbOfGiftcards);
    const nbGCForSalesVP2 = Math.floor(PARAMETERS_SHEET.sheet.getRange(PARAMETERS_SHEET.salesVP2Share).getValue() * nbOfGiftcards);
    const nbGCForSalesVP3 = nbOfGiftcards - nbGCForSalesVP2 - nbGCForSalesVP1;
    return {
        1: nbGCForSalesVP1,
        2: nbGCForSalesVP2,
        3: nbGCForSalesVP3
    };
}

/**
 * Get a random sales VP
 * @param skippedSalesVP list of sales VP to exclude from random assignation
 * @return {number} The number of the randomly chosen sales VP
 */
function getRandomSalesVP(skippedSalesVP) {
    const nbOfSalesVP = 3;
    const nbOfSalesVPNotSkipped = nbOfSalesVP - getNbOfSkippedSalesVP(skippedSalesVP);
    // noinspection ES6ConvertVarToLetConst
    var grn = Math.floor((Math.random() * nbOfSalesVPNotSkipped) + 1);

    // noinspection ES6ConvertVarToLetConst
    var index = 1;
    // noinspection ES6ConvertVarToLetConst
    for (var salesVP in skippedSalesVP) {
        if (skippedSalesVP.hasOwnProperty(salesVP)) {
            if(skippedSalesVP[salesVP] !== true)
                grn--;
            if(grn === 0)
                return index;
        }
        index++;
    }
}

/**
 * Get the number of skipped sales VP
 * @param skippedSalesVP The object containing info about skipped sales VP
 * @return {number}
 */
function getNbOfSkippedSalesVP(skippedSalesVP) {
    // noinspection ES6ConvertVarToLetConst
    var retVal = 0;
    // noinspection ES6ConvertVarToLetConst
    for (var isCurrentSalesVPSkipped in skippedSalesVP) {
        if (skippedSalesVP.hasOwnProperty(isCurrentSalesVPSkipped)) {
            if(skippedSalesVP[isCurrentSalesVPSkipped])
                retVal++;
        }
    }
    return retVal;
}
