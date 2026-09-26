// Python Turtle Fractal Tree Web Application
// Direct Python Parsing & High-Performance Realistic Canvas Turtle Engine

const PRESETS = {
  realistic: {
    name: 'Realistic Oak',
    initialLen: 100,
    angle: 28,
    ratio: 0.75,
    cutoff: 10,
    pensize: 10,
    trunkColor: '#5c3826',
    branchColor: '#8b5a2b',
    leafColor: '#22c55e',
    nodeColor: '#f59e0b',
    leafSize: 7,
    taper: true,
    leaves: true,
    code: `import turtle

# Create turtle object
t = turtle.Turtle()

# Screen settings
screen = turtle.Screen()
screen.bgcolor("black")
t.speed(0)
t.shape("turtle")

# Realistic Recursive Tree with Tapering & Foliage
def tree(i, pen_width):
    if i < 12:
        # Draw lush green leaf at the tip
        t.color("green")
        t.circle(4)
        return
    else:
        # Branch thickness tapers with depth
        t.pensize(max(1, pen_width))
        t.color("brown")
        t.forward(i)

        # Fruit / blossom at branch junction
        t.color("orange")
        t.circle(2)
        t.color("brown")

        # Left branch
        t.left(28)
        tree(3 * i / 4, pen_width * 0.72)

        # Right branch
        t.right(56)
        tree(3 * i / 4, pen_width * 0.72)

        # Return to junction
        t.left(28)
        t.backward(i)

# Position turtle at base of trunk
t.left(90)
t.penup()
t.backward(110)
t.pendown()

# Draw realistic tree (initial trunk length 100, width 10)
tree(100, 10)

turtle.done()`
  },

  classic: {
    name: 'Classic Code',
    initialLen: 100,
    angle: 30,
    ratio: 0.75,
    cutoff: 10,
    pensize: 2,
    trunkColor: '#10b981',
    branchColor: '#8b5a2b',
    leafColor: '#10b981',
    nodeColor: '#f59e0b',
    leafSize: 2,
    taper: false,
    leaves: false,
    code: `import turtle

# Create turtle object
t = turtle.Turtle()

# Screen settings
screen = turtle.Screen()
screen.bgcolor("black")

t.pensize(2)
t.color("green")
t.left(90)
t.backward(100)
t.speed(0)          # Fastest speed
t.shape("turtle")

# Recursive function
def tree(i):
    if i < 10:
        return
    else:
        t.forward(i)
        t.color("orange")
        t.circle(2)
        t.color("brown")

        t.left(30)
        tree(3 * i / 4)

        t.right(60)
        tree(3 * i / 4)

        t.left(30)
        t.backward(i)

# Call function
tree(100)

turtle.done()`
  },

  sakura: {
    name: 'Cherry Blossom',
    initialLen: 105,
    angle: 26,
    ratio: 0.74,
    cutoff: 11,
    pensize: 10,
    trunkColor: '#3d2521',
    branchColor: '#613b35',
    leafColor: '#ff70a6',
    nodeColor: '#ffb4d6',
    leafSize: 8,
    taper: true,
    leaves: true,
    code: `import turtle

# Cherry Blossom (Sakura) Fractal Tree
t = turtle.Turtle()
screen = turtle.Screen()
screen.bgcolor("#08070d")
t.speed(0)
t.shape("turtle")

def tree(i, width):
    if i < 12:
        # Sakura pink blossom petals
        t.color("#ff70a6")
        t.circle(4)
        return
    else:
        t.pensize(max(1, width))
        t.color("#613b35")
        t.forward(i)

        t.color("#ffb4d6")
        t.circle(2)
        t.color("#613b35")

        t.left(26)
        tree(3 * i / 4, width * 0.72)

        t.right(52)
        tree(3 * i / 4, width * 0.72)

        t.left(26)
        t.backward(i)

t.left(90)
t.penup()
t.backward(110)
t.pendown()

tree(105, 10)
turtle.done()`
  },

  autumn: {
    name: 'Autumn Gold',
    initialLen: 100,
    angle: 27,
    ratio: 0.75,
    cutoff: 10,
    pensize: 10,
    trunkColor: '#452618',
    branchColor: '#78350f',
    leafColor: '#f59e0b',
    nodeColor: '#ef4444',
    leafSize: 7,
    taper: true,
    leaves: true,
    code: `import turtle

# Autumn Golden Foliage Tree
t = turtle.Turtle()
screen = turtle.Screen()
screen.bgcolor("black")
t.speed(0)
t.shape("turtle")

def tree(i, width):
    if i < 12:
        # Golden amber autumn leaves
        t.color("#f59e0b")
        t.circle(4)
        return
    else:
        t.pensize(max(1, width))
        t.color("#78350f")
        t.forward(i)

        t.color("#ef4444")
        t.circle(2)
        t.color("#78350f")

        t.left(27)
        tree(3 * i / 4, width * 0.72)

        t.right(54)
        tree(3 * i / 4, width * 0.72)

        t.left(27)
        t.backward(i)

t.left(90)
t.penup()
t.backward(110)
t.pendown()

tree(100, 10)
turtle.done()`
  }
};

// DOM elements
const canvas = document.getElementById('tree-canvas');
const ctx = canvas.getContext('2d');
const codeEditor = document.getElementById('code-editor');
const consoleBox = document.getElementById('console-output');
const runBtn = document.getElementById('run-btn');
const pauseBtn = document.getElementById('pause-btn');
const speedSlowBtn = document.getElementById('speed-slow');
const speedMedBtn = document.getElementById('speed-medium');
const speedFastBtn = document.getElementById('speed-fast');
const resetBtn = document.getElementById('reset-btn');
const downloadBtn = document.getElementById('download-btn');
const zoomInBtn = document.getElementById('zoom-in');
const zoomOutBtn = document.getElementById('zoom-out');
const zoomResetBtn = document.getElementById('zoom-reset');

// Parameter inputs
const paramLen = document.getElementById('param-len');
const paramAngle = document.getElementById('param-angle');
const paramRatio = document.getElementById('param-ratio');
const paramCutoff = document.getElementById('param-cutoff');
const paramSpeed = document.getElementById('param-speed');
const paramPensize = document.getElementById('param-pensize');
const colorTrunk = document.getElementById('color-trunk');
const colorBranch = document.getElementById('color-branch');
const colorLeaf = document.getElementById('color-leaf');
const colorNode = document.getElementById('color-node');
const checkTaper = document.getElementById('check-taper');
const checkLeaves = document.getElementById('check-leaves');
const paramLeafSize = document.getElementById('param-leaf-size');

// Stats elements
const statBranches = document.getElementById('stat-branches');
const statDepth = document.getElementById('stat-depth');
const statTime = document.getElementById('stat-time');
const turtleStatus = document.getElementById('turtle-status');

// Canvas Viewport Transformation
let viewScale = 1.0;
let viewPanX = 0;
let viewPanY = 0;
let isPanning = false;
let startPanX = 0;
let startPanY = 0;

// Animation & Execution State
let animationFrameId = null;
let commandQueue = [];
let queueIndex = 0;
let isRunning = false;
let isPaused = false;
let totalBranchesDrawn = 0;
let maxDepthReached = 0;
let startTime = 0;
let bgColor = '#000000';
let currentPresetKey = 'realistic';

// Resize Canvas to fit container with high DPI
function resizeCanvas() {
  const container = canvas.parentElement;
  if (!container) return;
  const rect = container.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  
  const w = rect.width > 0 ? rect.width : 800;
  const h = rect.height > 0 ? rect.height : 600;

  canvas.width = Math.floor(w * dpr);
  canvas.height = Math.floor(h * dpr);
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  
  redrawCurrentState();
}

// Color normalizer helper
function normalizeColor(c, defaultColor) {
  if (!c) return defaultColor;
  c = c.trim().toLowerCase();
  const map = {
    'green': '#22c55e',
    'lightgreen': '#86efac',
    'darkgreen': '#15803d',
    'brown': '#8b5a2b',
    'orange': '#f59e0b',
    'black': '#000000',
    'white': '#ffffff',
    'red': '#ef4444',
    'blue': '#3b82f6',
    'yellow': '#eab308',
    'pink': '#ff70a6'
  };
  return map[c] || c;
}

// Load a preset
function applyPreset(key) {
  const p = PRESETS[key];
  if (!p) return;
  currentPresetKey = key;

  document.querySelectorAll('.preset-chip').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.preset === key);
  });

  codeEditor.value = p.code;
  paramLen.value = p.initialLen;
  document.getElementById('val-len').textContent = p.initialLen + 'px';

  paramAngle.value = p.angle;
  document.getElementById('val-angle').textContent = p.angle + '°';

  paramRatio.value = p.ratio;
  document.getElementById('val-ratio').textContent = p.ratio;

  paramCutoff.value = p.cutoff;
  document.getElementById('val-cutoff').textContent = p.cutoff;

  paramPensize.value = p.pensize;
  document.getElementById('val-pensize').textContent = p.pensize + 'px';

  paramLeafSize.value = p.leafSize;
  document.getElementById('val-leaf-size').textContent = p.leafSize + 'px';

  colorTrunk.value = p.trunkColor;
  colorBranch.value = p.branchColor;
  colorLeaf.value = p.leafColor;
  colorNode.value = p.nodeColor;

  checkTaper.checked = p.taper;
  checkLeaves.checked = p.leaves;

  logConsole(`Applied preset: ${p.name}`);
  startTreeExecution(p);
}

// Parse Python Turtle Code directly
function parsePythonCode(code) {
  const params = {
    initialLen: parseFloat(paramLen.value) || 100,
    angle: parseFloat(paramAngle.value) || 28,
    ratio: parseFloat(paramRatio.value) || 0.75,
    cutoff: parseFloat(paramCutoff.value) || 10,
    speed: parseInt(paramSpeed.value) || 100,
    pensize: parseFloat(paramPensize.value) || 10,
    trunkColor: colorTrunk.value || '#5c3826',
    branchColor: colorBranch.value || '#8b5a2b',
    leafColor: colorLeaf.value || '#22c55e',
    nodeColor: colorNode.value || '#f59e0b',
    leafSize: parseFloat(paramLeafSize.value) || 7,
    taper: checkTaper.checked,
    leaves: checkLeaves.checked,
    bgColor: '#000000'
  };

  try {
    // Isolate def tree(...) function body so setup commands like t.left(90) are not confused with branch angles!
    const defTreeMatch = code.match(/def\s+tree\s*\([^)]*\):([\s\S]*?)(?=\n[^\s#]|\Z)/i);
    const treeBody = defTreeMatch ? defTreeMatch[1] : code;

    // 1. screen.bgcolor(...)
    const bgMatch = code.match(/bgcolor\s*\(\s*["']([^"']+)["']\s*\)/i);
    if (bgMatch) params.bgColor = normalizeColor(bgMatch[1], '#000000');

    // 2. pensize(...)
    const penMatch = code.match(/pensize\s*\(\s*([0-9.]+)\s*\)/i);
    if (penMatch) {
      params.pensize = parseFloat(penMatch[1]);
      paramPensize.value = params.pensize;
      document.getElementById('val-pensize').textContent = params.pensize + 'px';
    }

    // 3. colors
    const colorMatches = [...code.matchAll(/color\s*\(\s*["']([^"']+)["']\s*\)/gi)].map(m => m[1]);
    if (colorMatches.length >= 1) params.trunkColor = normalizeColor(colorMatches[0], params.trunkColor);
    if (colorMatches.length >= 2) params.nodeColor = normalizeColor(colorMatches[1], params.nodeColor);
    if (colorMatches.length >= 3) params.branchColor = normalizeColor(colorMatches[2], params.branchColor);

    // 4. cutoff condition: if i < ...: inside treeBody
    const cutoffMatch = treeBody.match(/if\s+i\s*<\s*([0-9.]+)\s*:/i);
    if (cutoffMatch) {
      params.cutoff = parseFloat(cutoffMatch[1]);
      paramCutoff.value = params.cutoff;
      document.getElementById('val-cutoff').textContent = params.cutoff;
    }

    // 5. branch angle: find left(...) STRICTLY inside treeBody (NOT global t.left(90)!)
    const angleMatch = treeBody.match(/(?:t\.)?left\s*\(\s*([0-9.]+)\s*\)/i);
    if (angleMatch) {
      const parsedAngle = parseFloat(angleMatch[1]);
      if (parsedAngle > 0 && parsedAngle <= 75) {
        params.angle = parsedAngle;
        paramAngle.value = params.angle;
        document.getElementById('val-angle').textContent = params.angle + '°';
      }
    }

    // 6. branch scaling inside treeBody: 3 * i / 4 or 0.75 * i
    const ratioMatch1 = treeBody.match(/([0-9.]+)\s*\*\s*i\s*\/\s*([0-9.]+)/i);
    const ratioMatch2 = treeBody.match(/([0-9.]+)\s*\*\s*i/i);
    if (ratioMatch1) {
      params.ratio = parseFloat(ratioMatch1[1]) / parseFloat(ratioMatch1[2]);
      paramRatio.value = params.ratio.toFixed(2);
      document.getElementById('val-ratio').textContent = params.ratio.toFixed(2);
    } else if (ratioMatch2) {
      params.ratio = parseFloat(ratioMatch2[1]);
      paramRatio.value = params.ratio.toFixed(2);
      document.getElementById('val-ratio').textContent = params.ratio.toFixed(2);
    }

    // 7. initial call outside the function definition: tree(100)
    const codeOutsideDef = code.replace(/def\s+tree[\s\S]*?(?=\n[^\s#]|\Z)/i, '');
    const callMatch = codeOutsideDef.match(/(?:^|\n)\s*tree\s*\(\s*([0-9.]+)/i) || code.match(/(?:^|\n)\s*tree\s*\(\s*([0-9.]+)/i);
    if (callMatch) {
      params.initialLen = parseFloat(callMatch[1]);
      paramLen.value = params.initialLen;
      document.getElementById('val-len').textContent = params.initialLen + 'px';
    }
  } catch (err) {
    logConsole('Parse notice: ' + err.message);
  }

  return params;
}

// Generate the fractal turtle commands
function generateTreeCommands(params) {
  const commands = [];
  totalBranchesDrawn = 0;
  maxDepthReached = 0;

  let x = 0;
  let y = 0;
  let angle = 0; // East = 0, North = 90

  function left(deg) { angle += deg; }
  function right(deg) { angle -= deg; }

  function forward(dist, color, width) {
    const rad = (angle * Math.PI) / 180;
    const nx = x + dist * Math.cos(rad);
    const ny = y + dist * Math.sin(rad);
    commands.push({
      type: 'line',
      x1: x, y1: y,
      x2: nx, y2: ny,
      color: color,
      size: width,
      heading: angle
    });
    x = nx;
    y = ny;
  }

  function backward(dist, color, width) {
    const rad = (angle * Math.PI) / 180;
    const nx = x - dist * Math.cos(rad);
    const ny = y - dist * Math.sin(rad);
    commands.push({
      type: 'line',
      x1: x, y1: y,
      x2: nx, y2: ny,
      color: color,
      size: width,
      heading: angle
    });
    x = nx;
    y = ny;
  }

  function circle(radius, color, isLeaf = false) {
    commands.push({
      type: isLeaf ? 'leaf' : 'circle',
      x: x, y: y,
      radius: radius,
      color: color
    });
  }

  // Initial code steps:
  // Face North (90 degrees)
  left(90);

  // Position at trunk base:
  const baseTrunkWidth = params.taper ? params.pensize : params.pensize;
  backward(params.initialLen, params.trunkColor, baseTrunkWidth);

  // Recursive tree function
  function recursiveTree(i, depth, currentWidth) {
    if (depth > maxDepthReached) maxDepthReached = depth;

    // Base case: at the end of the twig
    if (i < params.cutoff) {
      if (params.leaves) {
        // Draw lush natural leaf clusters at the tips
        circle(params.leafSize, params.leafColor, true);
      }
      return;
    } else {
      totalBranchesDrawn++;
      
      // Calculate tapered branch width
      const branchWidth = params.taper 
        ? Math.max(1.2, currentWidth * 0.74) 
        : params.pensize;

      const branchColor = (depth === 1) ? params.trunkColor : params.branchColor;

      // Draw branch
      forward(i, branchColor, branchWidth);

      // Blossom / node fruit circle at junction
      circle(params.leaves ? 2.5 : 2, params.nodeColor, false);

      // Left branch
      left(params.angle);
      recursiveTree(params.ratio * i, depth + 1, branchWidth);

      // Right branch
      right(params.angle * 2);
      recursiveTree(params.ratio * i, depth + 1, branchWidth);

      // Return to junction
      left(params.angle);
      backward(i, branchColor, branchWidth);
    }
  }

  recursiveTree(params.initialLen, 1, baseTrunkWidth);
  return commands;
}

// Convert turtle coordinates (origin at trunk base, Y pointing Up) to canvas pixels
function toCanvasCoords(tx, ty, dpr) {
  const cssWidth = canvas.width / dpr;
  const cssHeight = canvas.height / dpr;

  // Center horizontally
  const cx = (cssWidth / 2) + viewPanX;
  // Position base of trunk (at ty = -100) comfortably near bottom of canvas
  const baseY = cssHeight - 65 + viewPanY;
  const cy = baseY - (100 * viewScale);

  return {
    x: (cx + tx * viewScale) * dpr,
    y: (cy - ty * viewScale) * dpr
  };
}

// Draw animated turtle cursor icon
function drawTurtleCursor(ctx, x, y, headingDeg, dpr) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((-headingDeg + 90) * Math.PI / 180);
  
  const s = Math.max(1.1, viewScale * dpr) * 1.2;

  // Glowing pen point
  ctx.beginPath();
  ctx.arc(0, 0, 4.5 * s, 0, Math.PI * 2);
  ctx.fillStyle = '#f59e0b';
  ctx.shadowColor = '#f59e0b';
  ctx.shadowBlur = 12;
  ctx.fill();
  ctx.shadowBlur = 0;

  // Turtle shell
  ctx.fillStyle = '#22c55e';
  ctx.strokeStyle = '#15803d';
  ctx.lineWidth = Math.max(1.5, 2 * s);

  ctx.beginPath();
  ctx.ellipse(0, 3 * s, 8 * s, 10 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Turtle head
  ctx.beginPath();
  ctx.arc(0, -9 * s, 4 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Flippers
  const flippers = [[-7, -5], [7, -5], [-7, 9], [7, 9]];
  for (const [fx, fy] of flippers) {
    ctx.beginPath();
    ctx.arc(fx * s, fy * s, 2.5 * s, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

// Render Command on Canvas
function executeCommand(cmd, dpr) {
  if (cmd.type === 'line') {
    const p1 = toCanvasCoords(cmd.x1, cmd.y1, dpr);
    const p2 = toCanvasCoords(cmd.x2, cmd.y2, dpr);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = cmd.color;
    ctx.lineWidth = Math.max(1, cmd.size * viewScale * dpr);
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();
  } else if (cmd.type === 'circle') {
    const pos = toCanvasCoords(cmd.x, cmd.y, dpr);
    ctx.save();
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, Math.max(1, cmd.radius * viewScale * dpr), 0, Math.PI * 2);
    ctx.fillStyle = cmd.color;
    ctx.fill();
    ctx.restore();
  } else if (cmd.type === 'leaf') {
    // Beautiful organic foliage cluster
    const pos = toCanvasCoords(cmd.x, cmd.y, dpr);
    const r = Math.max(2, cmd.radius * viewScale * dpr);
    
    ctx.save();
    // Soft outer glow / translucent leaf aura
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, r * 1.3, 0, Math.PI * 2);
    ctx.fillStyle = cmd.color + '44'; // Translucent glow
    ctx.fill();

    // Solid inner leaf
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
    ctx.fillStyle = cmd.color;
    ctx.fill();
    ctx.restore();
  }
}

function clearCanvas() {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

function renderAllCommands() {
  const dpr = window.devicePixelRatio || 1;
  for (const cmd of commandQueue) {
    executeCommand(cmd, dpr);
  }
}

function redrawCurrentState() {
  clearCanvas();
  if (commandQueue.length > 0) {
    const dpr = window.devicePixelRatio || 1;
    const limit = isRunning ? queueIndex : commandQueue.length;
    for (let i = 0; i < limit; i++) {
      executeCommand(commandQueue[i], dpr);
    }
  }
}

// Animation step loop
function animateStep() {
  if (!isRunning || isPaused) return;

  const speedVal = parseInt(paramSpeed.value) || 10;
  
  // Speed mapping:
  // Slow (<=10): 1 command per frame (takes ~8-10 seconds, beautifully visible!)
  // Medium (<=40): 3 commands per frame (~3 seconds)
  // Fast (<=75): 8 commands per frame (~1.2 seconds)
  // Very Fast (>75): 20 commands per frame (~0.5 seconds)
  let batchSize = 1;
  if (speedVal > 75) batchSize = 20;
  else if (speedVal > 40) batchSize = 8;
  else if (speedVal > 10) batchSize = 3;
  else batchSize = 1; // 1 command per frame for clear slow visibility!

  const dpr = window.devicePixelRatio || 1;
  queueIndex = Math.min(commandQueue.length, queueIndex + batchSize);

  // Redraw canvas up to current progress
  clearCanvas();
  for (let i = 0; i < queueIndex; i++) {
    executeCommand(commandQueue[i], dpr);
  }

  // Draw moving turtle cursor at the active branch tip
  if (queueIndex < commandQueue.length) {
    const lastCmd = commandQueue[queueIndex - 1] || commandQueue[0];
    const currX = lastCmd.x2 !== undefined ? lastCmd.x2 : (lastCmd.x || 0);
    const currY = lastCmd.y2 !== undefined ? lastCmd.y2 : (lastCmd.y || 0);
    const heading = lastCmd.heading !== undefined ? lastCmd.heading : 90;
    
    const cPos = toCanvasCoords(currX, currY, dpr);
    drawTurtleCursor(ctx, cPos.x, cPos.y, heading, dpr);

    const pct = Math.round((queueIndex / commandQueue.length) * 100);
    turtleStatus.textContent = `Drawing tree... step ${queueIndex}/${commandQueue.length} (${pct}%)`;
    animationFrameId = requestAnimationFrame(animateStep);
  } else {
    // Finished drawing: clean redraw of the completed tree
    clearCanvas();
    for (let i = 0; i < commandQueue.length; i++) {
      executeCommand(commandQueue[i], dpr);
    }
    isRunning = false;
    isPaused = false;
    const duration = (performance.now() - startTime).toFixed(0);
    statTime.textContent = duration + 'ms';
    turtleStatus.textContent = `Complete! (${totalBranchesDrawn} branches)`;
    logConsole(`Tree drawing completed in ${duration}ms.`);
    runBtn.innerHTML = '<span>▶ Run Code</span>';
    if (pauseBtn) pauseBtn.innerHTML = '<span>⏸ Pause</span>';
  }
}

// Main Run Function
function startTreeExecution(explicitParams) {
  stopAnimation();

  // Use explicit parameters if provided (from preset) or parse Python code from editor
  const params = explicitParams ? Object.assign({
    speed: parseInt(paramSpeed.value) || 10,
    bgColor: '#000000'
  }, explicitParams) : parsePythonCode(codeEditor.value);
  bgColor = params.bgColor || '#000000';

  logConsole(`Starting tree drawing from trunk base slowly and visibly...\nLength: ${params.initialLen}px, Angle: ${params.angle}°, Ratio: ${params.ratio.toFixed(2)}`);
  startTime = performance.now();

  commandQueue = generateTreeCommands(params);
  queueIndex = 0;
  isRunning = true;
  isPaused = false;

  statBranches.textContent = totalBranchesDrawn;
  statDepth.textContent = maxDepthReached;

  // Clear canvas completely to start drawing from the ground up
  clearCanvas();

  runBtn.innerHTML = '<span>▶ Run Code</span>';
  if (pauseBtn) pauseBtn.innerHTML = '<span>⏸ Pause</span>';
  animateStep();
}

function stopAnimation() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  isRunning = false;
  isPaused = false;
  runBtn.innerHTML = '<span>▶ Run Code</span>';
  if (pauseBtn) pauseBtn.innerHTML = '<span>⏸ Pause</span>';
}

function logConsole(msg) {
  const timestamp = new Date().toLocaleTimeString();
  consoleBox.textContent += `[${timestamp}] ${msg}\n`;
  consoleBox.scrollTop = consoleBox.scrollHeight;
}

// Speed Mode Helper
function setSpeedMode(mode) {
  [speedSlowBtn, speedMedBtn, speedFastBtn].forEach(b => b?.classList.remove('active'));
  if (mode === 'slow') {
    speedSlowBtn?.classList.add('active');
    paramSpeed.value = 10;
    const disp = document.getElementById('val-speed');
    if (disp) disp.textContent = 'Slow (1 step/frame)';
  } else if (mode === 'medium') {
    speedMedBtn?.classList.add('active');
    paramSpeed.value = 35;
    const disp = document.getElementById('val-speed');
    if (disp) disp.textContent = 'Medium (3 steps/frame)';
  } else if (mode === 'fast') {
    speedFastBtn?.classList.add('active');
    paramSpeed.value = 80;
    const disp = document.getElementById('val-speed');
    if (disp) disp.textContent = 'Fast (8 steps/frame)';
  }
}

speedSlowBtn?.addEventListener('click', () => setSpeedMode('slow'));
speedMedBtn?.addEventListener('click', () => setSpeedMode('medium'));
speedFastBtn?.addEventListener('click', () => setSpeedMode('fast'));

// Event Listeners
runBtn.addEventListener('click', () => {
  // Always starts fresh drawing from the trunk base!
  startTreeExecution();
});

if (pauseBtn) {
  pauseBtn.addEventListener('click', () => {
    if (!isRunning) return;
    if (isPaused) {
      isPaused = false;
      pauseBtn.innerHTML = '<span>⏸ Pause</span>';
      turtleStatus.textContent = 'Resumed drawing...';
      animateStep();
    } else {
      isPaused = true;
      pauseBtn.innerHTML = '<span>▶ Resume</span>';
      turtleStatus.textContent = 'Drawing paused';
    }
  });
}

resetBtn.addEventListener('click', () => {
  stopAnimation();
  commandQueue = [];
  queueIndex = 0;
  clearCanvas();
  viewScale = 1.0;
  viewPanX = 0;
  viewPanY = 0;
  statBranches.textContent = '0';
  statDepth.textContent = '0';
  statTime.textContent = '0ms';
  turtleStatus.textContent = 'Canvas cleared';
  logConsole('Canvas cleared.');
});

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'python_turtle_tree.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
  logConsole('Saved tree image as python_turtle_tree.png');
});

// Preset switcher
document.querySelectorAll('.preset-chip').forEach(btn => {
  btn.addEventListener('click', () => {
    applyPreset(btn.dataset.preset);
  });
});

// Zoom & Pan controls
zoomInBtn.addEventListener('click', () => {
  viewScale *= 1.25;
  redrawCurrentState();
});

zoomOutBtn.addEventListener('click', () => {
  viewScale = Math.max(0.2, viewScale / 1.25);
  redrawCurrentState();
});

zoomResetBtn.addEventListener('click', () => {
  viewScale = 1.0;
  viewPanX = 0;
  viewPanY = 0;
  redrawCurrentState();
});

// Mouse Pan Dragging
canvas.addEventListener('mousedown', (e) => {
  isPanning = true;
  startPanX = e.clientX - viewPanX;
  startPanY = e.clientY - viewPanY;
  canvas.style.cursor = 'grabbing';
});

window.addEventListener('mousemove', (e) => {
  if (!isPanning) return;
  viewPanX = e.clientX - startPanX;
  viewPanY = e.clientY - startPanY;
  redrawCurrentState();
});

window.addEventListener('mouseup', () => {
  if (isPanning) {
    isPanning = false;
    canvas.style.cursor = 'grab';
  }
});

// Wheel zoom
canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
  viewScale = Math.min(Math.max(viewScale * zoomFactor, 0.2), 5.0);
  redrawCurrentState();
}, { passive: false });

// Tab Switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab + '-panel').classList.add('active');
  });
});

// Sync Slider Value Displays
function bindSlider(slider, displayId, unit = '', callback) {
  const display = document.getElementById(displayId);
  slider.addEventListener('input', () => {
    display.textContent = slider.value + unit;
    if (callback) callback(slider.value);
  });
}

bindSlider(paramLen, 'val-len', 'px', () => autoUpdateIfStatic());
bindSlider(paramAngle, 'val-angle', '°', () => autoUpdateIfStatic());
bindSlider(paramRatio, 'val-ratio', '', () => autoUpdateIfStatic());
bindSlider(paramCutoff, 'val-cutoff', '', () => autoUpdateIfStatic());
bindSlider(paramSpeed, 'val-speed', '', () => {});
bindSlider(paramPensize, 'val-pensize', 'px', () => autoUpdateIfStatic());
bindSlider(paramLeafSize, 'val-leaf-size', 'px', () => autoUpdateIfStatic());

[colorTrunk, colorBranch, colorLeaf, colorNode, checkTaper, checkLeaves].forEach(input => {
  input.addEventListener('input', () => autoUpdateIfStatic());
});

function autoUpdateIfStatic() {
  if (!isRunning) {
    startTreeExecution();
  }
}

// Resize Observer for robust automatic canvas sizing
if (window.ResizeObserver && canvas.parentElement) {
  const ro = new ResizeObserver(() => {
    resizeCanvas();
  });
  ro.observe(canvas.parentElement);
}

// Initial Auto-Start on load
window.addEventListener('resize', resizeCanvas);

function initApp() {
  setSpeedMode('slow');
  applyPreset('realistic');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
