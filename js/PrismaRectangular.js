/**
 * Amaya López Dulce Fernanda | 314195856
 * Lechuga Martinez Jose Eduardo | 314325749
 * Proyecto final - Graficación por computadora 2020-2
 */

import Matrix4 from "./Matrix4.js";
import Vector3 from "./Vector3.js";
import Vector4 from "./Vector4.js";

export default class PrismaRectangular {
  /**
   * @param {WebGLRenderingContext} gl
   * @param {Number[]} color
   * @param {Number} width
   * @param {Number} height
   * @param {Number} length
   * @param {Matrix4} initial_transform
   */
  constructor(gl, color = [0, 1, 0.8, .5], initial_transform, width = 5, height = 5, length = 5, position) {
    this.gl = gl;
    this.color = color;
    this.width = width;
    this.height = height;
    this.length = length;

    if (position) {
      this.position = position;
      this.initial_transform = Matrix4.translate(position);
    } else {
      // se guarda la referencia a la transformación incial, en caso de que no se reciba una matriz, se asigna la matriz identidad
      this.initial_transform = initial_transform || Matrix4.identity();
    }

    //Buffer para los vertices
    this.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    let vertices = this.getVertices();
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    //Buffer para las normales
    let normals = this.getNormals(vertices);
    this.normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

    //Buffer para coordenadas Uv
    let uv = this.getUV();
    this.UVBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.UVBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.STATIC_DRAW);

    //Buffer para las caras 
    let caras = this.getCaras();
    this.indexBuffer = gl.createBuffer();
    if (!this.indexBuffer) {
      alert("Algo pasó INDEX buffer");
      console.log("Fail creating a index buffer");
      return -1;
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(caras), gl.STATIC_DRAW);

    //Se activa el buffer de color
    this.colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    let colors = [];
    if (!color) {
      color = [Math.random(), Math.random(), Math.random(), 1];
    }
    for (let i = 0; i < vertices.length / 3; i++) {
      colors = colors.concat(color);
    }

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    this.num_elements = vertices.length;
  }

  /**
   * Regresa la posicion 
   */
  getPosition() {
    return this.position;
  }

  /**
   * Asigna la nueva posicion
   * @param {Vector3} position 
   */
  setPosition(position) {
    this.initial_transform = Matrix4.translate(position);
    this.position = position;
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

  /**
   * @param {WebGLRenderingContext} gl
   * @param {Object} shader_locations
   * @param {Array} lightPos
   * @param {Matrix4} projectionMatrix // Manda la informacion de la matriz de proyeccion y vista
   */
  drawTexture(gl, shader_locations, lightPos, viewMatrix, projectionMatrix, texture) {

    // se activa la textura con la que se va a dibujar
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // se envía la información de las coordenadas de textura
    gl.enableVertexAttribArray(shader_locations.texcoordAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.UVBuffer);
    gl.vertexAttribPointer(shader_locations.texcoordAttribute, 2, gl.FLOAT, false, 0, 0);

    //Se activa el buffer de la posicion
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.vertexAttribPointer(shader_locations.positionAttribute, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(shader_locations.positionAttribute);

    //Se activa el buffer para las normales
    gl.enableVertexAttribArray(shader_locations.normalAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.vertexAttribPointer(shader_locations.normalAttribute, 3, gl.FLOAT, false, 0, 0);

    // se calcula la matriz de transformación de modelo, vista y proyección
    let viewModelMatrix = Matrix4.multiply(viewMatrix, this.initial_transform);
    gl.uniformMatrix4fv(shader_locations.VM_matrix, false, viewModelMatrix.toArray());

    // se enviá la dirección de la luz
    let auxLightPos = new Vector4(lightPos[0], lightPos[1], lightPos[2], lightPos[3])
    let lightPosView = viewMatrix.multiplyVector(auxLightPos);
    let lightPosViewArray = lightPosView.toArray();
    gl.uniform3f(shader_locations.lightPosition, lightPosViewArray[0], lightPosViewArray[1], lightPosViewArray[2]);

    // se envía la información de la matriz de transformación del modelo, vista y proyección
    let projectionViewModelMatrix = Matrix4.multiply(projectionMatrix, viewModelMatrix);
    // let projectionViewModelMatrix = projectionMatrix; //Si dejamos esto así el objeto se queda pegado a la camara
    gl.uniformMatrix4fv(shader_locations.PVM_matrix, false, projectionViewModelMatrix.toArray());

    // se dibuja
    gl.drawArrays(gl.TRIANGLES, 0, this.num_elements);

  }

  drawMaterial(gl, shader_locations, lightPos, viewMatrix, projectionMatrix, lightDir) {

    //Se activa el buffer de la posicion
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.vertexAttribPointer(shader_locations.positionAttribute, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(shader_locations.positionAttribute);

    //Se activa el buffer para las normales
    gl.enableVertexAttribArray(shader_locations.normalAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.vertexAttribPointer(shader_locations.normalAttribute, 3, gl.FLOAT, false, 0, 0);

    //Buffer para el color
    gl.enableVertexAttribArray(shader_locations.colorAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
    gl.vertexAttribPointer(shader_locations.colorAttribute, 4, gl.FLOAT, false, 0, 0);

    // se calcula la matriz de transformación de modelo, vista y proyección
    let viewModelMatrix = Matrix4.multiply(viewMatrix, this.initial_transform);
    gl.uniformMatrix4fv(shader_locations.VM_matrix, false, viewModelMatrix.toArray());

    if (lightDir) {
      // se enviá la información de la luz
      gl.uniform3f(shader_locations.lightPosition, lightPos[0], lightPos[1], lightPos[2]);
      gl.uniform3f(shader_locations.lightDirection, lightDir[0], lightDir[1], lightDir[2]);

      // se envía la información de la matriz de transformación del modelo, vista y proyección
      let projectionViewModelMatrix = Matrix4.multiply(projectionMatrix, viewModelMatrix);
      gl.uniformMatrix4fv(shader_locations.PVM_matrix, false, projectionViewModelMatrix.toArray());

      // se enviá la información de la matriz de transformación del modelo
      gl.uniformMatrix4fv(shader_locations.M_matrix, false, this.initial_transform.toArray());

    } else {
      // se enviá la dirección de la luz
      let auxLightPos = new Vector4(lightPos[0], lightPos[1], lightPos[2], lightPos[3])
      let lightPosView = viewMatrix.multiplyVector(auxLightPos);
      let lightPosViewArray = lightPosView.toArray();
      gl.uniform3f(shader_locations.lightPosition, lightPosViewArray[0], lightPosViewArray[1], lightPosViewArray[2]);

      // se envía la información de la matriz de transformación del modelo, vista y proyección
      let projectionViewModelMatrix = Matrix4.multiply(projectionMatrix, viewModelMatrix);
      gl.uniformMatrix4fv(shader_locations.PVM_matrix, false, projectionViewModelMatrix.toArray());
    }

    // se dibuja
    gl.drawArrays(gl.TRIANGLES, 0, this.num_elements);
  }

  /**
   * Metodo para asignar color 
   * @param {Array} color 
   */
  setColor(color) {
    this.color = color;
  }

  /**
   * Metodo para obtener el color
   */
  getColor() {
    return this.color;
  }

  /**
   * Metodo para obtener las normales
   * @param {Array} vertices
   */
  getNormals(vertices) {
    let normals = [];

    for (let i = 0; i < vertices.length; i += 9) {
      // se crean arreglos de tres elementos para representar cada vértice y simplificar los cálculos
      let v1 = new Vector3(vertices[i], vertices[i + 1], vertices[i + 2]);
      let v2 = new Vector3(vertices[i + 3], vertices[i + 4], vertices[i + 5]);
      let v3 = new Vector3(vertices[i + 6], vertices[i + 7], vertices[i + 8]);

      let vAux = Vector3.cross(Vector3.subs(v1, v2), Vector3.subs(v2, v3));
      let n = vAux.normalize().toArray();

      // como se está usando flat shading los tres vértices tiene la misma normal asociada
      normals.push(n[0], n[1], n[2], n[0], n[1], n[2], n[0], n[1], n[2]);
    }
    return normals;
  }

  /**
   * Metodo para obtener los vertices
   */
  getVertices() {
    let h = this.height / 2;
    let w = this.width / 2;
    let l = this.length / 2;

    let pos = [
      h, w, l,
      h, w, -l,
      h, -w, l,
      h, -w, -l,
      -h, w, l,
      -h, w, -l,
      -h, -w, l,
      -h, -w, -l
    ];

    let caras = this.getCaras();
    let vertices = [];

    for (let i = 0; i < caras.length; i++) {
      vertices.push(pos[caras[i] * 3], pos[caras[i] * 3 + 1], pos[caras[i] * 3 + 2])
    }
    return vertices;
  }

  /**
  * Metodo para obtener las caras
  */
  getCaras() {
    return [
      2, 1, 0, //Derecho
      3, 1, 2, //Derecho
      1, 3, 7, //Atras
      7, 5, 1, //Atras
      7, 5, 6, //Izquierdo
      4, 6, 5, //Izquierdo
      6, 4, 2, //Frente
      4, 0, 2, //Frente
      2, 3, 6, //Abajo
      7, 6, 3, //Abajo
      4, 0, 1, //Arriba
      4, 1, 5  //Arriba
    ];
  }

  /**
   * Metodo para obtener las coordenadas UV
   */
  getUV() {
    return [
      //DERECHO
      0.75, 0.625,
      0.5, 0.375,
      0.75, 0.375,
      0.5, 0.625,
      0.5, 0.375,
      0.75, 0.625,

      //ATRAS
      0.75, 0.375,
      0.75, 0.625,
      1, 0.625,
      1, 0.625,
      1, 0.375,
      0.75, 0.375,

      // IZQUIERDA
      0, 0.625,
      0, 0.375,
      0.25, 0.625,
      0.25, 0.375,
      0.25, 0.625,
      0, 0.375,

      //FRENTE
      0.25, 0.625,
      0.25, 0.375,
      0.5, 0.625,
      0.25, 0.375,
      0.5, 0.375,
      0.5, 0.625,

      // ABAJO
      0.5, 0.625,
      0.5, 0.875,
      0.25, 0.625,
      0.25, 0.875,
      0.25, 0.625,
      0.5, 0.875,

      // // ARRIBA
      0.5, 0.375,
      0.25, 0.375,
      0.25, 0.125,
      0.5, 0.375,
      0.25, 0.125,
      0.5, 0.125,
    ]
  }
}
