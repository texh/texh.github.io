let laifu = {
  generation: 0,
  animationFrame: null,
  timeout: null,
  cols: 10,
  rows: 10,
  speed: 100, // 500,
  ui: {
    canvas: document.getElementById('canvas'),
    gen: document.getElementById('gen')
  },
}

laifu.world = {
  height: laifu.ui.canvas.clientHeight,
  width: laifu.ui.canvas.clientWidth
}

function setGeneration (gen) {
  laifu.generation = gen
  laifu.ui.gen.innerText = laifu.generation
}

function getGrid (rows, cols) {
  const arr = []
  for (let i = 0; i < rows; i++) {
    arr[i] = []
    for (let j = 0; j < cols; j++) {
      arr[i][j] = 0
    }
  }

  return arr
}

function getRandomGrid (rows, cols) {
  const arr = []
  for (let i = 0; i < rows; i++) {
    arr[i] = []
    for (let j = 0; j < cols; j++) {
      arr[i][j] = Math.random() < 0.1 ? 1 : 0 //Math.floor(Math.random() * 2)
      // arr[i][j] = Math.floor(Math.random() * 2)
    }
  }

  return arr
}

const scale = 3 //0 //50
start()
function start () {
  stop()
  laifu.ui.canvas.height = laifu.world.height
  laifu.ui.canvas.width = laifu.world.width
  laifu.generation = 0

  laifu.cols = Math.floor(laifu.world.width / scale)
  laifu.rows = Math.floor(laifu.world.height / scale)

  laifu.current = getRandomGrid(laifu.rows, laifu.cols)
  laifu.next = getGrid(laifu.rows, laifu.cols) // laifu.current // getRandomGrid(laifu.cols, laifu.rows)
  draw()

  loop()
}

function stop () {
  cancelAnimationFrame(laifu.animationFrame)
  clearTimeout(laifu.timeout)
}

function loop () {
  //laifu.animationFrame = requestAnimationFrame(draw)
  nextGen()
  draw()
  laifu.timeout = setTimeout(loop, laifu.speed)
}

function nextGen () {
  // Update next
  for (let i = 0; i < laifu.current.length; i++) {
    for (let j = 0; j < laifu.current[i].length; j++) {
      const neighbours = countNeighbourinos(laifu.current, j, i)
      if (laifu.current[i][j]) {
        if (neighbours < 2 || neighbours > 3) {
          laifu.next[i][j] = 0
        } else {
          laifu.next[i][j] = 1
        }
      } else {
        if (neighbours === 3) {
          laifu.next[i][j] = 1
        } else {
          laifu.next[i][j] = 0
        }
      }
    }
  }

  // Swap next / current
  const tmp = laifu.current
  laifu.current = laifu.next
  laifu.next = tmp
  laifu.generation++
}

// function countNeighbourinos (grid, x, y) {
  function countNeighbourinos (grid, x, y) {
  let n = 0
  for (const i of [-1, 0, 1]) {
    for (const j of [-1, 0, 1]) {
      if (i === 0 && j === 0) {} else {
        const col = (x + j + laifu.cols) % laifu.cols
        const row = (y + i + laifu.rows) % laifu.rows
        // console.log({i,j, col, row})

        if (grid[row][col]) {
          n++
        }
      }
    }
  }

  return n
}

function clear () {
  const ctx = laifu.ui.canvas.getContext('2d')
  ctx.clearRect(0, 0, laifu.ui.canvas.width, laifu.ui.canvas.height);
}

function draw () {
  laifu.ui.gen.innerText = laifu.generation
  clear()
  const ctx = laifu.ui.canvas.getContext('2d')

  for (let i = 0; i < laifu.current.length; i++) {
    for (let j = 0; j < laifu.current[i].length; j++) {
      if (laifu.current[i][j]) {
        ctx.fillStyle = 'green';
        ctx.fillRect(j * scale, i * scale, scale, scale)
      }
    }
  }
  // laifu.timeout = setTimeout(loop, laifu.speed)
}
