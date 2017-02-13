# Sodoku Solver

[Sodoku Solver here](https://sodokusolver.github.io)

A simple sodoku solver that implements the basic rules and a basic backtracking search when the _definite_ options have run out.

When you look at a square then you can eliminate all the numbers appearing in the same row, column or 3x3 box and it might leave only one option, a so-called _definite_. Relying on only these rules will only work for easy sodoku puzzles and the harder ones require trickier logical deductions. 

[This website](https://www.kristanix.com/sudokuepic/sudoku-solving-techniques.php) describes some more advanced techniques to solve the more difficult sodoku puzzles.

With the computer you can try to implement these advanced logical deductions when you run out of moves with the simple rules or you can instead try to just gamble on one choice and search to see if there is a solution if you make that choice; backtracking and trying the other choice when it fails.

This uses the search method, so it will fail and give up when there is no solution although I suppose good published sodoku puzzles are always solveable using the logical deductions alone.

# Nine Letters

[Nine Letters here](https://sodokusolver.github.io/nine-letters.html)

Nine letters is a newspaper word game where you have to think of as many words as possible using the nine letters.
The center letter must always be used and the other letters can only be used once. The found words should be 4 or more letters.

This implementation loads a plain text file of english words and tries to search through efficiently without creating a large index

# Five by Five

[Five by Five here](https://sodokusolver.github.io/five-by-five.html)

Another word game, like a small crossword without clues where you have to find words which will fit in all directions.

This implementation uses a constrained backtracking search which can eliminate invalid words quickly. 
