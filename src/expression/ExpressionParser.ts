//
enum TokenType {
  PLUS,
  MINUS,
  // UNARY_MINUS,
  MULT,
  DIV,
  POW,
  NUMBER,
  MEASUREMENT,
  LEFT_PAREN,
  RIGHT_PAREN,
  MATH_BUILTIN,
  COMMA,
  UNKNOWN,
  EOF
}

type Lexicon = {
  kind: TokenType;
  name?: string;
  numericValue?: number;
};

type SyntaxTree = {
  node: Lexicon;

  // left and right for binary operators
  leftChild?: SyntaxTree;
  rightChild?: SyntaxTree;

  // args for multi argument functions
  args?: SyntaxTree[];
};

class Lexer {
  readonly BUILT_IN_MATCH_FNs = [
    "abs",
    "acos",
    "asin",
    "atan",
    "atan2",
    "ceil",
    "cos",
    "exp",
    "floor",
    "ln",
    "max",
    "min",
    "sgn",
    "sin",
    "sqrt",
    "tan"
  ];

  private input: string;
  private iterator: IterableIterator<string>;
  private nextChar: IteratorResult<string>;
  constructor(input: string) {
    this.input = input;

    // JS strings are an iterable object
    // The iterator provides two important properties:
    // .done which is set to true when we reach the end of iteration
    //    (.dose is opposite of hasNext() of Java iterators)
    // .next() which returns the next character in the string

    this.iterator = input[Symbol.iterator]();
    this.nextChar = this.iterator.next();
  }

  skipWhiteSpaces(): void {
    while (!this.nextChar.done && this.nextChar.value === " ") {
      this.nextChar = this.iterator.next();
    }
  }

  /**
   * The tokenize() function is a co-routine, it automatically pauses
   * on yield and resumes when the caller invokes its next()
   */
  *tokenize(): IterableIterator<Lexicon> {
    while (!this.nextChar.done) {
      this.skipWhiteSpaces();
      if (this.nextChar.done) break;
      if (this.nextChar.value.match(/[0-9.]/)) {
        // Numeric value
        let tok = "";
        do {
          tok += this.nextChar.value;
          this.nextChar = this.iterator.next();
        } while (!this.nextChar.done && this.nextChar.value.match(/[0-9.]/));
        const value = Number(tok);
        if (!isNaN(value))
          // Is this a valid numerical value?
          yield { kind: TokenType.NUMBER, numericValue: Number(tok) };
        else
          yield {
            kind: TokenType.UNKNOWN,
            name: `Invalid numeric value ${tok}`
          };
      } else if (this.nextChar.value.match(/[a-zA-Z]/)) {
        // Measurement Identifier or math builtin functions
        let tok = "";
        do {
          tok += this.nextChar.value;
          this.nextChar = this.iterator.next();
        } while (
          !this.nextChar.done &&
          this.nextChar.value.match(/[a-zA-Z0-9]/)
        );

        // Check for special constants (pi, e)
        if (tok.toUpperCase() === "PI")
          yield { kind: TokenType.NUMBER, numericValue: Math.PI };
        else if (tok.toUpperCase() === "E")
          yield { kind: TokenType.NUMBER, numericValue: Math.E };
        else if (
          this.BUILT_IN_MATCH_FNs.findIndex(fn => fn === tok.toLowerCase()) >= 0
        ) {
          // One of the builtin Math functions
          yield { kind: TokenType.MATH_BUILTIN, name: tok };
        } else {
          yield { kind: TokenType.MEASUREMENT, name: tok };
        }
      } else if (this.nextChar.value === "+") {
        // Binary plus (we don't support unary plus)
        this.nextChar = this.iterator.next();
        yield { kind: TokenType.PLUS };
      } else if (this.nextChar.value === "-") {
        // Either a binary minus or a unary minus
        this.nextChar = this.iterator.next();

        // If we hit the end of input stream the token was
        // intended as a binary minus
        // if (this.nextChar.done) yield { kind: TokenType.MINUS };
        // Is the next character the beginning of a number or identifier?
        // else if (this.nextChar.value.match(/[0-9a-zA-Z.]/))
        // yield { kind: TokenType.UNARY_MINUS };
        yield { kind: TokenType.MINUS }; // binary minus
      } else if (this.nextChar.value === "*") {
        // Multiplication or exponentiation
        this.nextChar = this.iterator.next();
        // if we hit the end of input stream the token was
        // intended as a binary multiplication
        if (this.nextChar.done) yield { kind: TokenType.MULT };
        else if (this.nextChar.value === "*") {
          this.nextChar = this.iterator.next();
          yield { kind: TokenType.POW }; // Exponentiation
        } else yield { kind: TokenType.MULT };
      } else if (this.nextChar.value === "/") {
        // Division
        this.nextChar = this.iterator.next();
        yield { kind: TokenType.DIV };
      } else if (this.nextChar.value === "^") {
        // Alternate operator of exponentiation
        this.nextChar = this.iterator.next();
        yield { kind: TokenType.POW };
      } else if (this.nextChar.value === "(") {
        this.nextChar = this.iterator.next();
        yield { kind: TokenType.LEFT_PAREN };
      } else if (this.nextChar.value === ")") {
        this.nextChar = this.iterator.next();
        yield { kind: TokenType.RIGHT_PAREN };
      } else if (this.nextChar.value === ",") {
        this.nextChar = this.iterator.next();
        yield { kind: TokenType.COMMA };
      } else {
        const unknownChar = this.nextChar.value;
        console.debug("Unknown char", unknownChar);
        this.nextChar = this.iterator.next();
        yield { kind: TokenType.UNKNOWN, name: unknownChar };
      }
    }

    // We reach the end of iterator stream!
    yield { kind: TokenType.EOF };
  }
}

export class ExpressionParser {
  readonly EMPTY_MAP = new Map();
  /**
   * Parse the arithmetic expression using a recursive descent parser.
   * Refer to the railroad diagrams and the expr.ebnf
   *
   * @param input a string of arithmetic expression
   */
  static parse(input: string): SyntaxTree {
    const lexer = new Lexer(input); // Lexical analyzer
    const tokenizer = lexer.tokenize();
    let token = tokenizer.next();

    function atom(): SyntaxTree {
      // factpr() is 3-level deep from EXPR (highest precedence)
      if (token.value.kind === TokenType.LEFT_PAREN) {
        // Parenthesized expressions
        token = tokenizer.next();
        const eTree = expr();
        if (token.value.kind === TokenType.RIGHT_PAREN) {
          token = tokenizer.next();
          return eTree;
        } else throw new SyntaxError("expected ')'");
      }
      if (token.value.kind === TokenType.MINUS) {
        // Unary minus
        token = tokenizer.next();
        const atomTree = atom();

        // Convert Unary operator (-EXPR) to binary operator (0 - EXPR)
        return {
          node: { kind: TokenType.MINUS },
          leftChild: { node: { kind: TokenType.NUMBER, numericValue: 0 } },
          rightChild: atomTree
        };
      } else if (token.value.kind === TokenType.MEASUREMENT) {
        // TODO: look up the actual value of measurement
        console.debug("Var/Measurement", token.value.text);
        const out = token.value;
        token = tokenizer.next();
        return { node: out };
      } else if (token.value.kind === TokenType.NUMBER) {
        const out = token.value;
        token = tokenizer.next();
        return { node: out };
      } else if (token.value.kind === TokenType.MATH_BUILTIN) {
        const out = token.value;
        token = tokenizer.next();
        if (token.value.kind !== TokenType.LEFT_PAREN)
          throw new SyntaxError("expected '(' after a builtin function");
        token = tokenizer.next();
        const exprTree = expr();
        const args = [exprTree];

        // Parse comma separate expressions
        while (token.value.kind === TokenType.COMMA) {
          token = tokenizer.next();
          args.push(expr());
        }
        if (token.value.kind === TokenType.RIGHT_PAREN) {
          token = tokenizer.next();
          return { node: out, args };
        } else throw new SyntaxError("expected ')' after function arguments");
      } else throw new SyntaxError("expected IDENT, NUMBER, '+', '-', or '('");
    }

    // Parses: base ^ power1 ^ power2 ^ ...
    function factor(): SyntaxTree {
      // factor() is 2-level deep from EXPR (medium precedence)

      let atomTree = atom();
      while (token.value.kind == TokenType.POW) {
        const oper = token.value;
        token = tokenizer.next();
        const sibling = atom();

        // Combine the LHS subtree with the RHS subtree
        const parent = {
          node: oper,
          leftChild: atomTree,
          rightChild: sibling
        };
        atomTree = parent; // The new node becomes a new parent
      }
      return atomTree;
    }

    // Parses: P (*|/) P (*|/) P ...
    function term(): SyntaxTree {
      // term() is 1-level deep from EXPR (lowest precedence)
      let outTree = factor();
      while (
        token.value.kind == TokenType.MULT ||
        token.value.kind === TokenType.DIV
      ) {
        const oper = token.value;
        token = tokenizer.next();
        const sibling = factor();

        // Combine the LHS subtree with the RHS subtree
        const parent = { node: oper, leftChild: outTree, rightChild: sibling };
        outTree = parent; // The new node becomes a new parent
      }
      return outTree;
    }

    // Parses: term (*|/) term (*|/) term ...
    function expr(): SyntaxTree {
      let outTree = term();
      while (
        token.value.kind == TokenType.PLUS ||
        token.value.kind === TokenType.MINUS
      ) {
        const oper = token.value;
        token = tokenizer.next();
        const sibling = term();

        // Combine the LHS subtree with the RHS subtree
        const parent = { node: oper, leftChild: outTree, rightChild: sibling };
        outTree = parent; // The new node becomes a new parent
      }
      return outTree;
    }

    const out = expr();

    // Be sure there is no leftover character after a valid expression
    if (token.value.kind === TokenType.EOF) return out;
    else throw new SyntaxError("Unexpected token");
  }

  /** Recursive evaluation of the syntax tree
   * The post order traversal of the syntax tree makes the leaves
   * the highest precedence expressions
   */
  static evaluate(tree: SyntaxTree, varMap: Map<string, number>): number {
    function valueOf(t: SyntaxTree | null): number {
      let numValue: number;
      const measureName = t?.node.name ?? "n/a";
      let args: SyntaxTree[];
      switch (t?.node.kind) {
        case TokenType.NUMBER:
          return t.node.numericValue ?? 0;
        case TokenType.MEASUREMENT:
          if (varMap.has(measureName)) return varMap.get(measureName) ?? 0;
          else throw new Error(`Undefined variable ${measureName}`);
        case TokenType.PLUS:
          return valueOf(t.leftChild ?? null) + valueOf(t.rightChild ?? null);
        case TokenType.MINUS:
          return valueOf(t.leftChild ?? null) - valueOf(t.rightChild ?? null);
        case TokenType.MULT:
          return valueOf(t.leftChild ?? null) * valueOf(t.rightChild ?? null);
        case TokenType.DIV:
          numValue = valueOf(t.rightChild ?? null);
          if (Math.abs(numValue) > 1e-4)
            return valueOf(t.leftChild ?? null) / valueOf(t.rightChild ?? null);
          else throw new RangeError("Attempt to divide by zero");
        case TokenType.POW:
          return Math.pow(
            valueOf(t.leftChild ?? null),
            valueOf(t.rightChild ?? null)
          );
        case TokenType.MATH_BUILTIN:
          args = t.args!;
          switch (t.node.name) {
            // Multi-arg functions
            // Apply "evaluate()" to each element
            case "max":
              return Math.max(...args.map(a => valueOf(a)));
            case "min":
              return Math.min(...args.map(a => valueOf(a)));

            // Binary functions
            case "atan2":
              return Math.atan2(valueOf(args[0]), valueOf(args[1]));

            // Unary functions
            case "abs":
              return Math.abs(valueOf(args[0]));
            case "acos":
              return Math.acosh(valueOf(args[0]));
            case "asin":
              return Math.asin(valueOf(args[0]));
            case "atan":
              return Math.atan(valueOf(args[0]));

            case "ceil":
              return Math.ceil(valueOf(args[0]));
            case "cos":
              return Math.cos(valueOf(args[0]));
            case "exp":
              return Math.exp(valueOf(args[0]));
            case "floor":
              return Math.floor(valueOf(args[0]));
            case "ln":
              return Math.log(valueOf(args[0]));
            case "sgn":
              return Math.sign(valueOf(args[0]));
            case "sin":
              return Math.sin(valueOf(args[0]));
            case "sqrt":
              return Math.sqrt(valueOf(args[0]));
            case "tan":
              return Math.tan(valueOf(args[0]));
            default:
              throw new SyntaxError(`Unknown math builtin ${t.node.name}`);
          }

        default:
          return 0;
      }
    }

    return valueOf(tree);
  }

  evaluateWithVars = (input: string, varMap: Map<string, number>): number =>
    ExpressionParser.evaluate(ExpressionParser.parse(input), varMap);

  evaluate = (input: string): number =>
    ExpressionParser.evaluate(ExpressionParser.parse(input), this.EMPTY_MAP);
}