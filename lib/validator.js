
export class Validator {
    constructor(name, ...rules) {
        this.name = name;
        this.rules = [...rules];
    }

    // Returns true if input passes rules, false otherwise
    validate(input){
        return this.rules.filter((rule) => {
            return !rule.check(input)
        }).length == 0
    }

    addRule(rule){
        this.rules.push(rule)
        return this;
    }

    clone(){
        return new Validator(this.name, ...this.rules);
    }
}

export class Rule {
    constructor(desc, fn) {
        this.desc = desc;
        this.fn = fn;
    }

    // fn must be a f(x): bool func
    check(input){
        return this.fn(input);
    }
}

/* 
module.exports = {
    Validator: Validator,
    Rule: Rule,
} */