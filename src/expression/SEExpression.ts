//
enum TokenType {
  PLUS,
  MINUS,
  MULT,
  DIV,
  EXPONENT,
  NUMBER,
  IDENTIFIER,
  LEFTPAREN,
  RIGHTPAREN,
  UNKNOWN,
  EOF
}
type Lexicon = {
  kind: TokenType;
  text?: string;
};

type SyntaxTree = {
  node: Lexicon;
  leftChild?: SyntaxTree;
  rightChild?: SyntaxTree;
  // children: SyntaxTree[];
};

class Lexer {
  private input: string;
  private iterator: IterableIterator<string>;
  private nextChar: IteratorResult<string>;
  constructor(input: string) {
    this.input = input;
    this.iterator = input[Symbol.iterator]();
    this.nextChar = this.iterator.next();
  }

  skipWhiteSpaces(): void {
    while (!this.nextChar.done && this.nextChar.value.match(/ /)) {
      this.nextChar = this.iterator.next();
    }
  }

  /** The tokenize() function is a co-routine, it automatically pauses
   * on yield and resumes when the caller invokes its next()
   */
  *tokenize(): IterableIterator<Lexicon> {
    while (!this.nextChar.done) {
      this.skipWhiteSpaces();
      if (this.nextChar.done) break;
      // console.debug("Lexer: next char is ", this.nextChar.value);
      if (this.nextChar.value.match(/[0-9]/)) {
        // console.debug("Got digit");
        let tok = "";
        do {
          tok += this.nextChar.value;
          this.nextChar = this.iterator.next();
        } while (!this.nextChar.done && this.nextChar.value.match(/[0-9]/));
        // TODO: handle decimal numbers
        yield { kind: TokenType.NUMBER, text: tok };
      } else if (this.nextChar.value.match(/[a-zA-Z]/)) {
        let tok = "";
        do {
          tok += this.nextChar.value;
          this.nextChar = this.iterator.next();
        } while (!this.nextChar.done && this.nextChar.value.match(/[a-zA-Z]/));
        yield { kind: TokenType.IDENTIFIER, text: tok };
      } else if (this.nextChar.value === "+") {
        this.nextChar = this.iterator.next();
        yield { kind: TokenType.PLUS };
      } else if (this.nextChar.value === "-") {
        this.nextChar = this.iterator.next();
        yield { kind: TokenType.MINUS };
      } else if (this.nextChar.value === "*") {
        this.nextChar = this.iterator.next();
        yield { kind: TokenType.MULT };
      } else if (this.nextChar.value === "/") {
        this.nextChar = this.iterator.next();
        yield { kind: TokenType.DIV };
      } else if (this.nextChar.value === "^") {
        this.nextChar = this.iterator.next();
        yield { kind: TokenType.EXPONENT };
      } else if (this.nextChar.value === "(") {
        this.nextChar = this.iterator.next();
        yield { kind: TokenType.LEFTPAREN };
      } else if (this.nextChar.value === ")") {
        this.nextChar = this.iterator.next();
        yield { kind: TokenType.RIGHTPAREN };
      } else {
        const unknownChar = this.nextChar.value;
        console.debug("Unknown char", unknownChar);
        this.nextChar = this.iterator.next();
        yield { kind: TokenType.UNKNOWN, text: unknownChar };
      }
    }
    yield { kind: TokenType.EOF };
  }
}

class SEExpression {
  static parse(input: string): SyntaxTree {
    const lexer = new Lexer(input);
    const tokenizer = lexer.tokenize();
    let token = tokenizer.next();

    function factor(): SyntaxTree {
      if (token.value.kind === TokenType.LEFTPAREN) {
        token = tokenizer.next();
        console.debug("Begin group");
        const eTree = expr();
        if (token.value.kind === TokenType.RIGHTPAREN) {
          console.debug("End group");
          token = tokenizer.next();
          return eTree;
        } else {
          throw "Syntax error: expected ')'";
        }
      } else if (token.value.kind === TokenType.IDENTIFIER) {
        console.debug("Var/Measurement", token.value.text);
        const out = token.value;
        token = tokenizer.next();
        return { node: out };
      } else if (token.value.kind === TokenType.NUMBER) {
        const out = token.value;
        console.debug("Number", token.value.text);
        token = tokenizer.next();
        return { node: out };
      } else throw "Syntax error: expected IDENT, NUMBER, or '('";
    }

    function power(): SyntaxTree {
      let factorTree = factor();
      while (token.value.kind == TokenType.EXPONENT) {
        const oper = token.value;
        token = tokenizer.next();
        const f = factor();
        const parent = { node: oper, leftChild: factorTree, rightChild: f };
        factorTree = parent;
      }
      return factorTree;
    }

    function term(): SyntaxTree {
      let powTree = power();
      while (
        token.value.kind == TokenType.MULT ||
        token.value.kind === TokenType.DIV
      ) {
        const oper = token.value;
        token = tokenizer.next();
        const p = power();
        const parent = { node: oper, leftChild: powTree, rightChild: p };
        powTree = parent;
      }
      return powTree;
    }

    function expr(): SyntaxTree {
      let termTree = term();
      while (
        token.value.kind == TokenType.PLUS ||
        token.value.kind === TokenType.MINUS
      ) {
        const oper = token.value;
        token = tokenizer.next();
        const t = term();
        const parent = { node: oper, leftChild: termTree, rightChild: t };
        termTree = parent;
      }
      return termTree;
    }

    return expr();
    // console.debug("Final output is", syntaxTree);
  }
}

function evaluate(t: SyntaxTree): number {
  switch (t.node.kind) {
    case TokenType.NUMBER:
      return Number(t.node.text);
    case TokenType.PLUS:
      return evaluate(t.leftChild!) + evaluate(t.rightChild!);
    case TokenType.MINUS:
      return evaluate(t.leftChild!) - evaluate(t.rightChild!);
    case TokenType.MULT:
      return evaluate(t.leftChild!) * evaluate(t.rightChild!);
    case TokenType.DIV:
      const denom = evaluate(t.rightChild!);
      if (Math.abs(denom) > 1e-4)
        return evaluate(t.leftChild!) / evaluate(t.rightChild!);
      else throw "Attempt to divice by zero";

    default:
      return 0;
  }
}
// const ex = new SEExpression();
const out = SEExpression.parse("8 + 10 * 67");
const outVal = evaluate(out);
console.debug("Arithmetic result", outVal);
