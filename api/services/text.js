const surroundWordOcurrences = (text) => {
    let textArray = text.split(/\s+|\n+/)
    let occurrences = {}
    let mostUsed = {
        timesUsed: 0
    }

    textArray.forEach(item => {
        let word = item.toLowerCase()
        if (occurrences[word] && word.trim() !== '') occurrences[word]++
        else occurrences[word] = 1
    })

    Object.keys(occurrences).forEach(word => {
        if (occurrences[word] > mostUsed.timesUsed) {
            mostUsed.timesUsed = occurrences[word]
            mostUsed.word = word
        }
    })

    textArray = textArray.map(word => {
        if (word.toLowerCase() === mostUsed.word) return `foo${word}bar`
        return word
    })

    return textArray.join(' ')
}

module.exports = {
    surroundWordOcurrences
}