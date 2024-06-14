import { Validator } from './validator.js'
import { Processor } from './processor.js'

export class Receipt {
    constructor(id, receipt) {
        this.id = id
        this.receipt = receipt
    }

    process() {
        const processor = new Processor(this.receipt)
        return processor.points
    } 

    validate() {
        return new Validator().validate_receipt(this.receipt)
    }
}
    