function SudokuSolver() {
	let puzzle_table = [];
	console.log(puzzle_table)
  /*
  * Check if the number is a legal candidate
  * for the given cell (by Sudoku rules).
  */
	function check_candidate(num, row, col) {
    
		for (let i = 0; i < 9; i++) {
			let b_index = ((Math.floor(row / 3) * 3) + Math.floor(i / 3)) * 9 + (Math.floor(col / 3) * 3) + (i % 3);
			if (num == puzzle_table[(row * 9) + i] ||
				num == puzzle_table[col + (i * 9)] ||
				num == puzzle_table[b_index]) {
				return false;
			}
		}
		return true;
	}
  /*
  * Recursively test all possible numbers for a given cell until
  * the puzzle is solved.
  */
	function get_candidate(index) {
		if (index >= puzzle_table.length) {
			return true;
		} else if (puzzle_table[index] != 0) {
			return get_candidate(index + 1);
		}

		for (let i = 1; i <= 9; i++) {
			if (check_candidate(i, Math.floor(index / 9), index % 9)) {
				puzzle_table[index] = i;
				if (get_candidate(index + 1)) {
					return true;
				}
			}
		}

		puzzle_table[index] = 0;
		return false;
	}
  /*
  * Split result of puzzle into chunks by 9.
  */
	function chunk_in_groups(arr) {
		let result = [];
		for (let i = 0; i < arr.length; i += 9) {
			result.push(arr.slice(i, i + 9));
		}
        console.log(result)
		return result;
	}
  /*
  * Start solving the game for provided puzzle and options.
  */
	this.solve = function (puzzle, options) {
		options = options || {};
		let result = options.result || 'string';
        
		puzzle_table = puzzle.split('').map(function (v) { return isNaN(v) ? 0 : +v });

		if (puzzle.length !== 81) return 'Puzzle is not valid.'
		return  !get_candidate(0) ? 'No solution found.' : result === 'chunks' ? chunk_in_groups(puzzle_table) : result === 'array' ? puzzle_table : puzzle_table.join('');
	}
}

if (typeof exports !== 'undefined') {
	if (typeof module !== 'undefined' && module.exports) {
		exports = module.exports = SudokuSolver;
	}
	exports.SudokuSolver = SudokuSolver;
} else {
	window.SudokuSolver = SudokuSolver;
}