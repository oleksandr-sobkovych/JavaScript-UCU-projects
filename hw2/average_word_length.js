function avgWordLengthCalc(wordsInText) {
    try {
        let accumulatingSum = 0;
        const matches = wordsInText.match(/[\p{L}\p{N}’'_-]+/gu);
        matches.forEach(word => accumulatingSum += word.length);
        return accumulatingSum / matches.length;
    } catch (e) {
        return 0;
    }
}
