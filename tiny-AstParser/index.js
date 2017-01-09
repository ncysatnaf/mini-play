
class Lexer {

  static tokenize(input) {
    return Array.from(input.replace(/\s/g, "")).map(o => {
      switch(o) {
        case "(": return "parensOpen"
        case ")": return "parensClose"
        case "s": return "s"
        default:
          if(o.match('[0-9]')){
            return parseInt(o)
          }
      }
    })
  }

}

class Parser {

  constructor(tokens){

    this.index = 0
    this.init(tokens)
  }

  init(tokens) {
    this.tokens = tokens
  }

  parse() {
    return this.parseExpression()
  }

  peekToken(){
    return this.tokens[this.index]
  }

  popToken(){
    let token = this.tokens[this.index]
    this.index++

    return token
  }

  parseExpression() {
    if( this.popToken() !== 'parensOpen') {
      throw new Error("unexpectedToken")
    }
    let operator = this.popToken()
    if(!["s"].includes(operator)) {
      throw new Error("unexpectedToken")
    }

    let firstExpression = this.parsePrimaryExpression()
    let secondExpression = this.parsePrimaryExpression()

    if( this.popToken() !== 'parensClose') {
      throw new Error("unexpectedToken")
    }

    return ExpressionNode({operator, firstExpression, secondExpression})
  }

  parsePrimaryExpression() {
    let peek = this.peekToken()
    switch(peek){
      case 'parensOpen':
        return this.parseExpression()
      default:
        if(typeof peek == 'number') {
          return this.popToken()
        }
    }
  }
}

const ExpressionNode = ({operator, ...args}) => {
  return {
    [operator]: args
  }
}


class Interpreter {

  static eval(expression){
  }
}

let input = "(s (s 1 5) 4)"
let tokens = Lexer.tokenize(input)
let parser = new Parser(tokens)
let ast = parser.parse()

console.log(ast)