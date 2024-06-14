export class Validator {
    /* Make sure all the fields are present */
    validate_receipt(receipt) {
        const retailer = receipt.retailer
        const purchase_date = receipt.purchaseDate
        const purchase_time = receipt.purchaseTime
        const total = receipt.total
        const items = receipt.items

        if(!retailer || !purchase_date || !purchase_time || !total || !items) {
            console.log("One of the category is not present")
            return false
        }

        return true
    }
}
