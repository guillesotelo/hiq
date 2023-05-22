const express = require('express')
const { surroundWordOcurrences } = require("../services/text")
const router = express.Router()

//Make new conversion
router.post('/processText', async (req, res, next) => {
    try {
        const { text } = req.body
        const processedText = surroundWordOcurrences(text)
        if (!processedText) return res.status(400).json('Error converting text')

        res.status(200).json(processedText)
    } catch (err) {
        console.error('Something went wrong!', err)
        res.send(500).send('Server Error')
    }
})

module.exports = router