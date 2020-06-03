/**
 * Amaya López Dulce Fernanda | 314195856
 * Lechuga Martinez Jose Eduardo | 314325749
 * Proyecto final - Graficación por computadora 2020-2
 */

import Matrix4 from "./Matrix4.js";
import ImageLoader from "./ImageLoader.js";

export default class Skybox {
  /**
   * @param {WebGLRenderingContext} gl
   * @param {Matrix4} initial_transform
   */
  constructor(gl, initial_transform) {
    this.initial_transform = initial_transform || new Matrix4().identity();
    this.activarAnimacion = true;

    // el skybox tiene su propio programa
    this.program = this.createProgram(
      gl,
      this.createShader(
        gl,
        gl.VERTEX_SHADER,
        `attribute vec4 a_position;
        attribute vec2 a_texcoord;
        uniform mat4 u_PVM_matrix;
        varying vec2 v_texcoord;
        void main() {
          gl_Position = u_PVM_matrix * a_position;
          v_texcoord = a_texcoord;
        }`
      ),
      this.createShader(
        gl,
        gl.FRAGMENT_SHADER,
        `precision mediump float;
        varying vec2 v_texcoord;
        uniform sampler2D u_texture;
        void main() {
          gl_FragColor = texture2D(u_texture, v_texcoord);
        }`
      )
    );

    // el skybox tiene su propias referencias a las variables de los shaders
    this.shader_locations = {
      positionAttribute: gl.getAttribLocation(this.program, "a_position"),
      texcoordAttribute: gl.getAttribLocation(this.program, "a_texcoord"),
      PVM_matrix: gl.getUniformLocation(this.program, "u_PVM_matrix")
    }


    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, ImageLoader.getImage("skybox.png"));
    gl.generateMipmap(gl.TEXTURE_2D);

    // se construye el buffer de vértices
    this.vertices = this.getVertices();
    this.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

    // se construye el buffer de coordenadas uv
    this.uv = this.getUV();
    this.UVBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.UVBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.uv), gl.STATIC_DRAW);

    this.num_elements = this.vertices.length / 3;
  }

  /**
   * 
   */
  draw(gl, projectionMatrix) {
    gl.useProgram(this.program);

    // se activa la textura con la que se va a dibujar
    gl.bindTexture(gl.TEXTURE_2D, this.texture);

    // se envía la información de la posición de los vértices
    gl.enableVertexAttribArray(this.shader_locations.positionAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.vertexAttribPointer(this.shader_locations.positionAttribute, 3, gl.FLOAT, false, 0, 0);

    // se envía la información de las coordenadas de textura
    gl.enableVertexAttribArray(this.shader_locations.texcoordAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.UVBuffer);
    gl.vertexAttribPointer(this.shader_locations.texcoordAttribute, 2, gl.FLOAT, false, 0, 0);

    // se envía la matriz de transformación modelo, vista, proyección
    let projectionViewModelMatrix = Matrix4.multiply(projectionMatrix, this.initial_transform);
    gl.uniformMatrix4fv(this.shader_locations.PVM_matrix, false, projectionViewModelMatrix.toArray());

    // se dibuja la geometría
    gl.drawArrays(gl.TRIANGLES, 0, this.num_elements);
  }

  /**
   * Asigna la nueva transformacion
   * @param {Matrix4} transform 
   */
  setTransform(transform) {
    this.initial_transform = transform;
  }

  /**
   * Obtiene la transformacion 
   */
  getTransform() {
    return this.initial_transform;
  }

  getVertices() {
    return [
      // frente
      1, -1, 1,
      -1, 1, 1,
      1, 1, 1,
      1, -1, 1,
      -1, -1, 1,
      -1, 1, 1,

      // derecha
      1, -1, -1,
      1, 1, 1,
      1, 1, -1,
      1, -1, -1,
      1, -1, 1,
      1, 1, 1,

      // atrás
      -1, -1, -1,
      1, 1, -1,
      -1, 1, -1,
      -1, -1, -1,
      1, -1, -1,
      1, 1, -1,

      // izquierda
      -1, -1, 1,
      -1, 1, -1,
      -1, 1, 1,
      -1, -1, 1,
      -1, -1, -1,
      -1, 1, -1,

      // arriba
      1, 1, 1,
      -1, 1, -1,
      1, 1, -1,
      1, 1, 1,
      -1, 1, 1,
      -1, 1, -1,

      // abajo
      1, -1, -1,
      -1, -1, 1,
      1, -1, 1,
      1, -1, -1,
      -1, -1, -1,
      -1, -1, 1
    ];
  }

  getUV() {
    return [
      // frente
      0.5, 0.625,
      0.25, 0.375,
      0.5, 0.375,
      0.5, 0.625,
      0.25, 0.625,
      0.25, 0.375,

      // derecha
      0.75, 0.625,
      0.5, 0.375,
      0.75, 0.375,
      0.75, 0.625,
      0.5, 0.625,
      0.5, 0.375,

      // atrás
      1, 0.625,
      0.75, 0.375,
      1, 0.375,
      1, 0.625,
      0.75, 0.625,
      0.75, 0.375,

      // izquierda
      0.25, 0.625,
      0, 0.375,
      0.25, 0.375,
      0.25, 0.625,
      0, 0.625,
      0, 0.375,

      // arriba
      0.5, 0.375,
      0.25, 0.125,
      0.5, 0.125,
      0.5, 0.375,
      0.25, 0.375,
      0.25, 0.125,

      // abajo
      0.5, 0.875,
      0.25, 0.625,
      0.5, 0.625,
      0.5, 0.875,
      0.25, 0.875,
      0.25, 0.625,
    ]
  }

  /**
   *Creacion del shader para webgl
   */
  createShader(gl, type, source) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if (success) {
      return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }

  /**
   * Creacion del programa para webgl
   */
  createProgram(gl, vertexShader, fragmentShader) {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    let success = gl.getProgramParameter(program, gl.LINK_STATUS);

    if (success) {
      return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  }
}