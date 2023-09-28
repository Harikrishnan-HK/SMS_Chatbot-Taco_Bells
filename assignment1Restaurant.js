const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    MENU: Symbol('menu'),
    COUNT: Symbol("count"),
    SAUCE1: Symbol("sauce1"),
    TYPE: Symbol('type'),
    SAUCE2: Symbol('sauce2'),
    DRINKS1: Symbol("drinks1"),
    DRINKS2: Symbol("drinks2"),
    TIP: Symbol("tip"),
    ITEM1: Symbol('item1'),
    ITEM2: Symbol('item2')
});

const tacosCost = 10;
const burritoCost = 8;
const drinkCost = 5;

module.exports = class RestaurantOrder extends Order {
    constructor() {
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sCount ="";
        this.sSauce1 = "";
        this.sDrinks1 = "";
        this.sType = "";
        this.sSauce2 = "";
        this.sDrinks2 = "";
        this.sItem1 = "";
        this.sItem2 = "";
        this.orderTotal = 0;
    }
    handleInput(sInput) {
        let aReturn = [];
        switch (this.stateCur) {
            case OrderState.WELCOMING:
                aReturn.push("!!! Welcome to Taco Bells !!!");
                aReturn.push("What would you like to order? Tacos or Burrito");
                this.stateCur = OrderState.ITEM1;
                break;

            case OrderState.ITEM1:
            case OrderState.MENU:
                if (sInput.toLowerCase() == 'tacos') {
                    this.stateCur = OrderState.COUNT;
                    this.sItem1 = 'Tacos';
                    this.orderTotal += tacosCost;
                    aReturn.push("Which taco pack you want: value or group?  ");
                    break;
                }
                this.stateCur = OrderState.TYPE;
                this.sItem2 = 'Burrito';
                this.orderTotal += burritoCost;
                aReturn.push("What burrito would you like? Chicken or Steak or Veggie");
                break;

            case OrderState.COUNT:
                this.stateCur = OrderState.SAUCE1;
                this.sCount = sInput;
                aReturn.push("What sauce would you like for your tacos?");
                break;
                
            case OrderState.TYPE:
                this.stateCur = OrderState.SAUCE2;
                this.sType = sInput;
                aReturn.push("What sauce would you like for your burrito?");
                break;
            
            case OrderState.SAUCE1:
                this.stateCur = OrderState.DRINKS1;
                this.sSauce1 = sInput;
                aReturn.push("Would you like a drink with that? If yes, please specify the drink, otherwise enter 'no'.");
                break;
        
            case OrderState.SAUCE2:
                this.stateCur = OrderState.DRINKS2;
                this.sSauce2 = sInput;
                aReturn.push("Would you like a drink with that? If yes, please specify the drink, otherwise enter 'no'.");
                break;
        
            case OrderState.DRINKS1:
                if (sInput.toLowerCase() != "no") {
                    this.orderTotal += drinkCost;
                    this.sDrinks1 = sInput;
                }
                aReturn.push("Would you like to order another item? Please enter yes or no.");
                this.stateCur = OrderState.ITEM2;
                break;
        
            case OrderState.DRINKS2:
                if (sInput.toLowerCase() != "no") {
                    this.orderTotal += drinkCost;
                    this.sDrinks2 = sInput;
                }
                aReturn.push("Would you like to order another item? Please enter yes or no.");
                this.stateCur = OrderState.ITEM2;
                break;
                        
            case OrderState.ITEM2:
                if (sInput.toLowerCase() != "no") {
                    aReturn.push("What would you like to order? Tacos,Burrito");
                    this.stateCur = OrderState.MENU;
                    break;
                }
                this.stateCur = OrderState.TIP;
                aReturn.push("Would you like to add a tip? Enter 'skip' or '10%'.");
                break;
                
            case OrderState.TIP:
                if (sInput.toLowerCase() === "10%") {
                    this.orderTotal += this.orderTotal * 0.10;  
                }
                this.isDone(true);
                aReturn.push("Thank you for your order of");  

            if (this.sItem1 != '') {
                aReturn.push(`${this.sCount} pack ${this.sItem1} with ${this.sSauce1} sauce${this.sDrinks1 != '' ? ` and a ${this.sDrinks1}` : ''}.`);
            }
                
            if (this.sItem2 != '') {
                aReturn.push(`${this.sType} ${this.sItem2} with ${this.sSauce2} sauce${this.sDrinks2 != '' ? ` and a ${this.sDrinks2}` : ''}.`);
            }                
            aReturn.push(`Your total bill amount plus tax : $${(this.orderTotal * 1.13).toFixed(2)}`);

            let date = new Date();
            date.setMinutes(date.getMinutes() + 15);
            aReturn.push(`Please pick your order at ${date.toTimeString()}`);
            break;
        }
        return aReturn;
    }
}