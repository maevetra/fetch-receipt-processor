import { Receipt } from './src/receipt.js' 
import express from 'express'
import { v4 as uuidv4 } from 'uuid'
const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

const receipts = new Map() //in-memory receipt storing

app.post('/receipts/process', (req, res) => {
    const id = uuidv4()
    const receipt = new Receipt(id, req.body)

    if (receipt.validate()) {
        const points = receipt.process()
        receipts.set(id, points)
    } else {
        return res.status(400).send('Invalid receipt')
    }

    res.status(200).send({
        "id": id
    })
    
})

app.get('/receipts/:id/points', (req,res) => {
    const id = req.params.id
    
    if(!receipts.has(id)) {
        return res.status(404).send('Receipt not found')
    }

    const points = receipts.get(id);
    
    res.status(200).send({
        "points": points
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})