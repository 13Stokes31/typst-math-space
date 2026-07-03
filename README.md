# Typst Math Space

VSCodium/VS Code extension for writing math blocks in [Typst](https://typst.app) more comfortably.

## What it does

In Typst, `$expression$` is inline math, and adding spaces inside the dollar signs — `$ expression $` — displays it as a math block.

When you type `$`, tinymist auto-closes it to `$$`. This extension handles the next step: as soon as you type a space inside `$$`, it expands to `$ | $` with the cursor positioned between the two spaces, ready to type the expression.

**Before:** `$$` → type space → `$ $` (cursor in wrong place)  
**After:** `$$` → type space → `$ | $` (cursor centered, ready to write)

## Usage

1. Open a `.typ` file.
2. Type `$` — tinymist closes it to `$$`.
3. Type a space — the extension places the cursor between two spaces: `$ | $`.
4. Write your expression, e.g. `$ x^2 + 1 $`.

## Requirements

- [Tinymist](https://open-vsx.org/extension/myriad-dreamin/tinymist) for Typst language support and auto-closing of `$`.

## License

MIT
