#
The idea comes from https://github.com/marciok/Mu#lexer, the feeling is quite interesting.So want to use js to give it a try.

## Example

```js
let input = "(s (s 1 5) 4)"
let tokens = Lexer.tokenize(input)
let parser = new Parser(tokens)
let ast = parser.parse()
console.log(ast)
// >> { op: 's', left: { op: 's', left: 1, right: 5 }, right: 4 }

let result = Interpreter.eval(ast)
console.log(result)
// >> 10

```