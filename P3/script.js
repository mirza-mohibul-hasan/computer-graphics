function init() {
    // Get the canvas element
    const canvas = document.getElementById("myCanvas");
  
    // Get the WebGL context
    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("Failed to get WebGL context.");
      return;
    }
  
    // Create vertex shader
    const vsSource = `
      attribute vec3 aPosition;
      varying vec4 vColor;
  
      void main() {
        gl_Position = vec4(aPosition, 1.0);
      }
    `;
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vsSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.error("Vertex shader compilation failed:", gl.getShaderInfoLog(vertexShader));
      return;
    }
  
    // Create fragment shaders
    const fsSource1 = `
      precision mediump float;
      void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Red color
      }
    `;
  
    const fsSource2 = `
      precision mediump float;
      void main() {
        gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0); // Green color
      }
    `;
  
    const fsSource3 = `
      precision mediump float;
      void main() {
        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); // Blue color
      }
    `;
  
    const fragmentShader1 = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader1, fsSource1);
    gl.compileShader(fragmentShader1);
    if (!gl.getShaderParameter(fragmentShader1, gl.COMPILE_STATUS)) {
      console.error("Fragment shader 1 compilation failed:", gl.getShaderInfoLog(fragmentShader1));
      return;
    }
  
    const fragmentShader2 = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader2, fsSource2);
    gl.compileShader(fragmentShader2);
    if (!gl.getShaderParameter(fragmentShader2, gl.COMPILE_STATUS)) {
      console.error("Fragment shader 2 compilation failed:", gl.getShaderInfoLog(fragmentShader2));
      return;
    }
  
    const fragmentShader3 = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader3, fsSource3);
    gl.compileShader(fragmentShader3);
    if (!gl.getShaderParameter(fragmentShader3, gl.COMPILE_STATUS)) {
      console.error("Fragment shader 3 compilation failed:", gl.getShaderInfoLog(fragmentShader3));
      return;
    }
  
    // Create shader program 1 (Red)
    const program1 = gl.createProgram();
    gl.attachShader(program1, vertexShader);
    gl.attachShader(program1, fragmentShader1);
    gl.linkProgram(program1);
    if (!gl.getProgramParameter(program1, gl.LINK_STATUS)) {
      console.error("Program 1 linking failed:", gl.getProgramInfoLog(program1));
      return;
    }
  
    // Create shader program 2 (Green)
    const program2 = gl.createProgram();
    gl.attachShader(program2, vertexShader);
    gl.attachShader(program2, fragmentShader2);
    gl.linkProgram(program2);
    if (!gl.getProgramParameter(program2, gl.LINK_STATUS)) {
      console.error("Program 2 linking failed:", gl.getProgramInfoLog(program2));
      return;
    }
  
    // Create shader program 3 (Blue)
    const program3 = gl.createProgram();
    gl.attachShader(program3, vertexShader);
    gl.attachShader(program3, fragmentShader3);
    gl.linkProgram(program3);
    if (!gl.getProgramParameter(program3, gl.LINK_STATUS)) {
      console.error("Program 3 linking failed:", gl.getProgramInfoLog(program3));
      return;
    }
  
    // Set up vertex data for the big triangle
    const vertices = new Float32Array([
      0.0, 0.8, 0.0, // Top vertex
      -0.8, -0.8, 0.0, // Bottom-left vertex
      0.8, -0.8, 0.0, // Bottom-right vertex
    ]);
  
    // Create vertex buffer object for the big triangle
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  
    // Get attribute location for the big triangle
    const aPosition = gl.getAttribLocation(program1, "aPosition");
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);
  
    // Clear canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0); // Black background
    gl.clear(gl.COLOR_BUFFER_BIT);
  
    // Draw the big triangle using Program 1 (Red)
    gl.useProgram(program1);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  
    // Set up vertex data for the multiple smaller triangles within the big triangle
    const verticesSmall = generateRandomTriangles(5);
  
    // Create vertex buffer object for the multiple smaller triangles
    const vertexBufferSmall = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferSmall);
    gl.bufferData(gl.ARRAY_BUFFER, verticesSmall, gl.STATIC_DRAW);
  
    // Get attribute location for the multiple smaller triangles
    const aPositionSmall = gl.getAttribLocation(program1, "aPosition");
    gl.vertexAttribPointer(aPositionSmall, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPositionSmall);
  
    // Draw the multiple smaller triangles within the big triangle using Programs 2 (Green), 3 (Blue), and 1 (Red)
    for (let i = 0; i < verticesSmall.length / 9; i++) {
      gl.useProgram(i % 3 === 0 ? program1 : (i % 3 === 1 ? program2 : program3));
      gl.drawArrays(gl.TRIANGLES, i * 3, 3);
    }
  }
  
  function generateRandomTriangles(numTriangles) {
    let vertices = [];
    for (let i = 0; i < numTriangles; i++) {
      // Generate random vertices for each triangle
      const x1 = Math.random() * 2 - 1;
      const y1 = Math.random() * 2 - 1;
      const x2 = Math.random() * 2 - 1;
      const y2 = Math.random() * 2 - 1;
      const x3 = Math.random() * 2 - 1;
      const y3 = Math.random() * 2 - 1;
  
      // Append vertices to the array
      vertices.push(x1, y1, 0.0);
      vertices.push(x2, y2, 0.0);
      vertices.push(x3, y3, 0.0);
    }
    return new Float32Array(vertices);
  }
  
  window.onload = init;
  