const solver = new SudokuSolver();

var time = 0;
var array = [];
var stepCounter;

function solve() {
  let s = '';
  for (let i = 0; i < 81; ++i) {
    let y = document.getElementById('C' + i).value;
    if (y >= 1 && y <= 9) {
      s += '' + y;
    } else {
      s += '.';
    }
  }

  let time_beg = new Date().getTime();
  let x = solver.solve(s);
  let t = (new Date().getTime() - time_beg) / 1000.0;

  document.getElementById('runtime').innerHTML = 'Solved puzzle in ' + t + ' seconds ( ' + t * 1000.0 + ' ms ).';
  s = '';

  for (let z = 0; z < 81; ++z) {
    document.getElementById('C' + z).value = x[z];
  }
}

function set_9x9(str) {
  displayChangesInArray(str)
  if (str != null && str.length >= 81) {
    for (let i = 0; i < 81; ++i) {
      document.getElementById('C' + i).value = '';
    }
    for (let j = 0; j < 81; ++j) {
      if (str.substr(j, 1) >= 1 && str.substr(j, 1) <= 9) {
        document.getElementById('C' + j).value = str.substr(j, 1);
      }
    }
  }
}

function displayChangesInArray(str) {
let nums = +str;
console.log(nums)

}

function draw_9x9() {
  
  let s = '<table class="table">\n';

  for (let i = 0; i < 9; ++i) {
    s += '<tr>';
    for (let j = 0; j < 9; ++j) {
      let c = 'cell';
      if ((i + 1) % 3 == 0 && j % 3 == 0) {
        c = 'cell3';
      } else if ((i + 1) % 3 == 0) {
        c = 'cell1';
      } else if (j % 3 == 0) {
        c = 'cell2';
      }
      s += '<td class="' + c + '"><input class="input" type="text" size="1" maxlength="1" id="C' + (i * 9 + j) + '"></td>';
    }
    s += '</tr>\n';
  }


  s += '</table>';
  document.getElementById('9x9').innerHTML = s;
  // let inp = document.URL;
  // let set = false;

  // if (inp.indexOf('?') >= 0) {
  //   let match = /[?&]puzzle=([^\s&]+)/.exec(inp);
  //   if (match.length == 2 && match[1].length >= 81) {
  //     set_9x9(match[1]);
  //     set = true;
  //   }
  // }

  // if (!set) {
  //   set_9x9('001700509573024106800501002700295018009400305652800007465080071000159004908007053');
  // }

 setListeners()

}

function setListeners() {
   let initialArray = Array.from(document.querySelectorAll('td'))
  initialArray.forEach(cell => {
    cell.removeEventListener('keyup', listenSteps, false);
    cell.addEventListener('keyup', listenSteps, false);
  })
}

function listenSteps(e){
 stepCounter += 1;
  array.push(e.key)
  let stepstats = document.getElementById('log').innerHTML = array.join('\n')
  
}

function clear_input() {
  for (let i = 0; i < 81; ++i) {
    document.getElementById('C' + i).value = '';
  }
}

function setPredefined() {
    
      set_9x9('032054900090001004080700031005600027800070000270140005000210300018907652603000000');
      this.time = new Date().getTime();
      console.log(this.time);
      array = [];
      stepCounter = 0
      
}

function timeCounter() {
    let amount = (new Date().getTime() - this.time) / 1000.0;
    document.getElementById('solvetime').innerHTML = 'Solved puzzle in ' + amount + ' seconds ( ' + amount * 1000.0 + ' ms ).';
  s = '';
    
}

// fs.writeFile('./stats.json', JSON.stringify(stepstats), err => {
  // if (err) console.log(err);
  // console.log(`${stepstats} stored.`)})