/* These rules collectively define how many points should be awarded to a receipt.
        - One point for every alphanumeric character in the retailer name.
        - 50 points if the total is a round dollar amount with no cents.
        - 25 points if the total is a multiple of 0.25.
        - 5 points for every two items on the receipt.
        - If the trimmed length of the item description is a multiple of 3 multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
        - 6 points if the day in the purchase date is odd.
        - 10 points if the time of purchase is after 2:00pm and before 4:00pm.
*/
export class Processor {
    constructor(receipt) {
        this.receipt = receipt
    }

    get points() {
        return this.calculate_points()
    }

    calculate_points() {
        return this.get_points_for_retailer_name() 
            + this.get_points_for_dollar_amount()
            + this.get_points_for_total_multiple()
            + this.get_points_for_every_two_items()
            + this.get_points_for_item_description()
            + this.get_points_for_day_is_odd()
            + this.get_points_for_hour_of_purchase()
    } 

    get_points_for_retailer_name() {
        /* One point for every alphanumeric character in the retailer name. */
        const retailer = this.receipt.retailer
        let points = 0

        for(const char of retailer) {
            if (/[a-zA-Z0-9]/.test(char)) {
                points += 1
            }
        }
        
        return points

    }

    get_points_for_dollar_amount() {
        /* 50 points if the total is a round dollar amount with no cents. */
        const total_amount = this.receipt.total
        if(parseInt(total_amount) == total_amount) {
            return 50
        }
        
        return 0

    }

    get_points_for_total_multiple() {
        /* 25 points if the total is a multiple of 0.25. */
        const total_amount = this.receipt.total

        if(parseFloat(total_amount) % 0.25 === 0) {
            return 25
        }

        return 0
    }

    get_points_for_every_two_items() {
        /* 5 points for every two items on the receipt. */
        return Math.floor(this.receipt.items.length / 2) * 5
    }

    get_points_for_item_description() {
        /* If the trimmed length of the item description is a multiple of 3 multiply the price by 0.2 and round up to the nearest integer. 
        The result is the number of points earned.*/
        let points = 0
        const items = this.receipt.items

        items.forEach(item => {
            if(item.shortDescription.trim().length % 3 === 0) {
                points += Math.ceil(parseFloat(item.price) * 0.2)
            }
        })

        return points
    }

    get_points_for_day_is_odd() {
        /* 6 points if the day in the purchase date is odd. */
        const date = parseInt(this.receipt.purchaseDate.split('-')[2])
        if(date % 2 === 1) {
            return 6
        }

        return 0
    }

    get_points_for_hour_of_purchase() {
        /* 10 points if the time of purchase is after 2:00pm and before 4:00pm. */
        const hour = this.receipt.purchaseTime.split(':')[0]
        if ( hour >= 14 && hour < 16 ) {
            return 10
        }

        return 0
    }
}