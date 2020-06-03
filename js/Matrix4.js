/**
 * Amaya López Dulce Fernanda | 314195856
 * Lechuga Martinez Jose Eduardo | 314325749
 * Proyecto final - Graficación por computadora 2020-2
 */

import Vector4 from "./Vector4.js";
import Vector3 from "./Vector3.js";

export default class Matrix4 {
  constructor(
    a00 = 1,
    a01 = 0,
    a02 = 0,
    a03 = 0,
    a10 = 0,
    a11 = 1,
    a12 = 0,
    a13 = 0,
    a20 = 0,
    a21 = 0,
    a22 = 1,
    a23 = 0,
    a30 = 0,
    a31 = 0,
    a32 = 0,
    a33 = 1
  ) {
    this.a00 = a00;
    this.a01 = a01;
    this.a02 = a02;
    this.a03 = a03;
    this.a10 = a10;
    this.a11 = a11;
    this.a12 = a12;
    this.a13 = a13;
    this.a20 = a20;
    this.a21 = a21;
    this.a22 = a22;
    this.a23 = a23;
    this.a30 = a30;
    this.a31 = a31;
    this.a32 = a32;
    this.a33 = a33;
  }

  /**
   * Convierte la matriz en un arreglo
   * donde a03, a13, a23, a33 tienen la info de translacion
   */
  toArray() {
    const arreglo = [
      this.a00,
      this.a10,
      this.a20,
      this.a30,
      this.a01,
      this.a11,
      this.a21,
      this.a31,
      this.a02,
      this.a12,
      this.a22,
      this.a32,
      this.a03,
      this.a13,
      this.a23,
      this.a33,
    ];
    return arreglo;
  }

  /**
   * Regresa la suma de las matrices
   * @param {Matrix3} m1
   * @param {Matrix3} m2
   * @returns {Matrix3} Matriz resultante
   */
  static add(m1, m2) {
    return new Matrix3(
      m1.a00 + m2.a00,
      m1.a01 + m2.a01,
      m1.a02 + m2.a02,
      m1.a03 + m2.a03,
      m1.a10 + m2.a10,
      m1.a11 + m2.a11,
      m1.a12 + m2.a12,
      m1.a13 + m2.a13,
      m1.a20 + m2.a20,
      m1.a21 + m2.a21,
      m1.a22 + m2.a22,
      m1.a23 + m2.a23,
      m1.a30 + m2.a30,
      m1.a31 + m2.a31,
      m1.a32 + m2.a32,
      m1.a33 + m2.a33
    );
  }

  /**
   * Metodo que calcula el determinante de una matriz 3x3
   * @param {Number} m00
   * @param {Number} m01
   * @param {Number} m02
   * @param {Number} m10
   * @param {Number} m11
   * @param {Number} m12
   * @param {Number} m20
   * @param {Number} m21
   * @param {Number} m22
   * @return {Number}
   */
  determinant3x3(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    return (
      m00 * m10 * m22 +
      m10 * m21 * m02 +
      m20 * m01 * m12 -
      (m10 * m01 * m22 + m00 * m21 * m12 + m20 * m11 * m02)
    );
  }

  /**
   * Regresa la matriz adjunta
   * @returns {Matrix4} Matriz adjunta
   */
  adjoint() {
    this.a00 = a00;
    this.a01 = a01;
    this.a02 = a02;
    this.a03 = a03;
    this.a10 = a10;
    this.a11 = a11;
    this.a12 = a12;
    this.a13 = a13;
    this.a20 = a20;
    this.a21 = a21;
    this.a22 = a22;
    this.a23 = a23;
    this.a30 = a30;
    this.a31 = a31;
    this.a32 = a32;
    this.a33 = a33;
    return new Matrix4(
      this.determinant3x3(a11, a12, a13, a21, a22, a23, a31, a32, a33),
      -this.determinant3x3(a10, a12, a13, a20, a22, a23, a30, a32, a33),
      this.determinant3x3(a10, a11, a13, a20, a21, a23, a30, a31, a33),
      -this.determinant3x3(a10, a11, a12, a20, a21, a22, a30, a31, a32),
      this.determinant3x3(a01, a02, a03, a21, a22, a23, a31, a32, a33),
      -this.determinant3x3(a00, a02, a03, a20, a22, a23, a30, a32, a33),
      this.determinant3x3(a00, a01, a03, a20, a21, a23, a30, a31, a33),
      -this.determinant3x3(a00, a01, a02, a20, a21, a22, a30, a31, a32),
      this.determinant3x3(a01, a02, a03, a11, a12, a13, a31, a32, a33),
      -this.determinant3x3(a00, a02, a03, a10, a12, a13, a30, a32, a33),
      this.determinant3x3(a00, a01, a03, a10, a11, a13, a30, a31, a33),
      -this.determinant3x3(a00, a01, a02, a10, a11, a12, a30, a31, a32),
      this.determinant3x3(a00, a02, a03, a11, a12, a13, a21, a22, a23),
      -this.determinant3x3(a00, a02, a03, a10, a12, a13, a20, a22, a23),
      this.determinant3x3(a00, a01, a03, a10, a11, a13, a20, a21, a23),
      -this.determinant3x3(a00, a01, a02, a10, a11, a12, a20, a21, a22)
    );
  }

  /**
   * Metodo que clona la matriz
   * @returns {Matrix3} Matriz Clonada
   */
  clone() {
    const clone = this;
    return clone;
  }

  /**
   * Regresa el determinante de la matriz
   * @returns {Number} Determinante
   */
  determinant() {
    const det00 =
      this.a00 *
      this.determinant3x3(
        this.a11,
        this.a12,
        this.a13,
        this.a21,
        this.a22,
        this.a23,
        this.a31,
        this.a32,
        this.a33
      );
    const det01 =
      this.a01 *
      -this.determinant3x3(
        this.a10,
        this.a12,
        this.a13,
        this.a20,
        this.a22,
        this.a23,
        this.a30,
        this.a32,
        this.a33
      );
    const det02 =
      this.a02 *
      this.determinant3x3(
        this.a10,
        this.a11,
        this.a13,
        this.a20,
        this.a21,
        this.a23,
        this.a30,
        this.a31,
        this.a33
      );
    const det03 =
      this.a03 *
      -this.determinant3x3(
        this.a10,
        this.a11,
        this.a12,
        this.a20,
        this.a21,
        this.a22,
        this.a30,
        this.a31,
        this.a32
      );
    const resultado = det00 + det01 + det02 + det03;
    return resultado;
  }

  /**
   * Devuelve verdadero en caso de que sus argumentos sean
   * aproximadamente iguales (con una ε = 0.000001), y falso en caso contrario
   * @param {Matrix3} m1
   * @param {Matrix3} m2
   * @returns {Boolean} Igualdad aproximada
   */
  static equals(m1, m2) {
    const epsilon = 0.000001;
    const equa00 = m1.a00 - m2.a00;
    const equa01 = m1.a01 - m2.a01;
    const equa02 = m1.a02 - m2.a02;
    const equa03 = m1.a03 - m3.a03;
    const equa10 = m1.a10 - m2.a10;
    const equa11 = m1.a11 - m2.a11;
    const equa12 = m1.a12 - m2.a12;
    const equa13 = m1.a13 - m2.a13;
    const equa20 = m1.a20 - m2.a20;
    const equa21 = m1.a21 - m2.a21;
    const equa22 = m1.a22 - m2.a22;
    const equa23 = m1.a23 - m2.a23;
    const equa30 = m1.a30 - m2.a30;
    const equa31 = m1.a31 - m2.a31;
    const equa32 = m1.a32 - m2.a32;
    const equa33 = m1.a33 - m3.a33;

    return (
      equa00 < epsilon &&
      equa00 >= 0 &&
      equa01 < epsilon &&
      equa01 >= 0 &&
      equa02 < epsilon &&
      equa02 >= 0 &&
      equa03 < epsilon &&
      equa03 >= 0 &&
      equa10 < epsilon &&
      equa10 >= 0 &&
      equa11 < epsilon &&
      equa11 >= 0 &&
      equa12 < epsilon &&
      equa12 >= 0 &&
      equa13 < epsilon &&
      equa13 >= 0 &&
      equa20 < epsilon &&
      equa20 >= 0 &&
      equa21 < epsilon &&
      equa21 >= 0 &&
      equa22 < epsilon &&
      equa22 >= 0 &&
      equa23 < epsilon &&
      equa23 >= 0 &&
      equa30 < epsilon &&
      equa30 >= 0 &&
      equa31 < epsilon &&
      equa31 >= 0 &&
      equa32 < epsilon &&
      equa32 >= 0 &&
      equa33 < epsilon &&
      equa33 >= 0
    );
  }

  /**
   * Devuelve verdadero en caso de que sus argumentos sean
   * exactamente iguales y falso en caso contrario
   * @param {Matrix3} m1
   * @param {Matrix3} m2
   */
  static exactEquals(m1, m2) {
    return (
      m1.a00 == m2.a00 &&
      m1.a01 == m2.a01 &&
      m1.a02 == m2.a02 &&
      m1.a03 == m2.a03 &&
      m1.a10 == m2.a10 &&
      m1.a11 == m2.a11 &&
      m1.a12 == m2.a12 &&
      m1.a13 == m2.a13 &&
      m1.a20 == m2.a20 &&
      m1.a21 == m2.a21 &&
      m1.a22 == m2.a22 &&
      m1.a23 == m2.a23 &&
      m1.a30 == m2.a30 &&
      m1.a31 == m2.a31 &&
      m1.a32 == m2.a32 &&
      m1.a33 == m2.a33
    );
  }

  /**
   * función que construye una matriz que representa la pirámide truncada
   * @param {Number} left
   * @param {Number} right
   * @param {Number} bottom
   * @param {Number} top
   * @param {Number} near
   * @param {Number} far
   * @return {Matrix4}
   */
  static frustum(left, right, bottom, top, near, far) {
    const frustum = new Matrix4(
      (3 * near) / right - left,
      0,
      right + left / right - left,
      0,
      0,
      (2 * near) / top - bottom,
      top + bottom / top - bottom,
      0,
      0,
      0,
      -(far + near) / far - near,
      (-2 * (far * near)) / far - near,
      0,
      0,
      -1,
      0
    );
    return frustum.transpose();
  }

  /**
   * función que asigna los valores de la matriz identidad
   */
  identity() {
    this.a00 = 1;
    this.a01 = 0;
    this.a02 = 0;
    this.a03 = 0;
    this.a10 = 0;
    this.a11 = 1;
    this.a12 = 0;
    this.a13 = 0;
    this.a20 = 0;
    this.a21 = 0;
    this.a22 = 1;
    this.a23 = 0;
    this.a30 = 0;
    this.a31 = 0;
    this.a32 = 0;
    this.a33 = 1;
  }

  /**
   * función que devuelve la matriz de vista a partir de la posición del ojo (eye) el centro
   * de interés (center) y el vector hacia arriba (up).
   * @param {Vector3} eye
   * @param {Vector3} center
   * @param {Vector3} up
   * @return {Matrix4}
   */
  static lookAt(eye, center, up) {
    let Z = Vector3.subs(eye, center);
    Z = Z.normalize();
    let Y = up;
    let X = Vector3.cross(Y, Z);
    Y = Vector3.cross(Z, X);
    X = X.normalize();
    Y = Y.normalize();
    const lookAtMatrix = new Matrix4(
      X.x,
      X.y,
      X.z,
      -Vector3.dot(X, eye),
      Y.x,
      Y.y,
      Y.z,
      -Vector3.dot(Y, eye),
      Z.x,
      Z.y,
      Z.z,
      -Vector3.dot(Z, eye),
      0,
      0,
      0,
      1
    );
    return lookAtMatrix;
  }

  /**
   * función que devuelve la multiplicación de dos matrices.
   * @param {Matrix4} m1
   * @param {Matrix4} m2
   * @return {Matrix4}
   */
  static multiply(m1, m2) {
    const mula00 =
      m1.a00 * m2.a00 + m1.a01 * m2.a10 + m1.a02 * m2.a20 + m1.a03 * m2.a30;
    const mula01 =
      m1.a00 * m2.a01 + m1.a01 * m2.a11 + m1.a02 * m2.a21 + m1.a03 * m2.a31;
    const mula02 =
      m1.a00 * m2.a02 + m1.a01 * m2.a12 + m1.a02 * m2.a22 + m1.a03 * m2.a32;
    const mula03 =
      m1.a00 * m2.a03 + m1.a01 * m2.a13 + m1.a02 * m2.a23 + m1.a13 * m2.a33;
    const mula10 =
      m1.a10 * m2.a00 + m1.a11 * m2.a10 + m1.a12 * m2.a20 + m1.a13 * m2.a30;
    const mula11 =
      m1.a10 * m2.a01 + m1.a11 * m2.a11 + m1.a12 * m2.a21 + m1.a13 * m2.a31;
    const mula12 =
      m1.a10 * m2.a02 + m1.a11 * m2.a12 + m1.a12 * m2.a22 + m1.a13 * m2.a32;
    const mula13 =
      m1.a10 * m2.a03 + m1.a11 * m2.a13 + m1.a12 * m2.a23 + m1.a13 * m2.a33;
    const mula20 =
      m1.a20 * m2.a00 + m1.a21 * m2.a10 + m1.a22 * m2.a20 + m1.a23 * m2.a30;
    const mula21 =
      m1.a20 * m2.a01 + m1.a21 * m2.a11 + m1.a22 * m2.a21 + m1.a23 * m2.a31;
    const mula22 =
      m1.a20 * m2.a02 + m1.a21 * m2.a12 + m1.a22 * m2.a22 + m1.a23 * m2.a32;
    const mula23 =
      m1.a20 * m2.a03 + m1.a21 * m2.a13 + m1.a22 * m2.a23 + m1.a23 * m2.a33;
    const mula30 =
      m1.a30 * m2.a00 + m1.a31 * m2.a10 + m1.a32 * m2.a20 + m1.a33 * m2.a30;
    const mula31 =
      m1.a30 * m2.a01 + m1.a31 * m2.a11 + m1.a32 * m2.a21 + m1.a33 * m2.a31;
    const mula32 =
      m1.a30 * m2.a02 + m1.a31 * m2.a12 + m1.a32 * m2.a22 + m1.a33 * m2.a32;
    const mula33 =
      m1.a30 * m2.a03 + m1.a31 * m2.a13 + m1.a32 * m2.a23 + m1.a33 * m2.a33;

    const matrix = new Matrix4(
      mula00,
      mula01,
      mula02,
      mula03,
      mula10,
      mula11,
      mula12,
      mula13,
      mula20,
      mula21,
      mula22,
      mula23,
      mula30,
      mula31,
      mula32,
      mula33
    );

    return matrix;
  }

  /**
   * función que devuelve una matriz que es el resultado de multiplicar cada
   * componente por un escalar
   * @param {Matrix4} m1
   * @param {Number} c
   * @return {Matrix4}
   */
  static multiplyScalar(m1, c) {
    const ms00 = m1.a00 * c;
    const ms01 = m1.a01 * c;
    const ms02 = m1.a02 * c;
    const ms03 = m1.a03 * c;
    const ms10 = m1.a10 * c;
    const ms11 = m1.a11 * c;
    const ms12 = m1.a12 * c;
    const ms13 = m1.a13 * c;
    const ms20 = m1.a20 * c;
    const ms21 = m1.a21 * c;
    const ms22 = m1.a22 * c;
    const ms23 = m1.a23 * c;
    const ms30 = m1.a30 * c;
    const ms31 = m1.a31 * c;
    const ms32 = m1.a32 * c;
    const ms33 = m1.a33 * c;
    const mulScalar = new Matrix4(
      ms00,
      ms01,
      ms02,
      ms03,
      ms10,
      ms11,
      ms12,
      ms13,
      ms20,
      ms21,
      ms22,
      ms23,
      ms30,
      ms31,
      ms32,
      ms33
    );
    return mulScalar;
  }

  /**
   * función que devuelve el vector resultado de multiplicar el vector v por la
   * matriz con que se llama la función.
   * @param {Vector4} v
   * @return {Vector4}
   */
  multiplyVector(v) {
    const x = this.a00 * v.x + this.a01 * v.y + this.a02 * v.z + this.a03 * v.w;
    const y = this.a10 * v.x + this.a11 * v.y + this.a12 * v.z + this.a13 * v.w;
    const z = this.a20 * v.x + this.a21 * v.y + this.a22 * v.z + this.a23 * v.w;
    const w = this.a30 * v.x + this.a31 * v.y + this.a32 * v.z + this.a33 * v.w;
    const mulVect = new Vector4(x, y, z, w);
    return mulVect;
  }

  /**
   * función que devuelve una matriz que corresponde a una proyección ortogonal,
   * determinada por los planos dados por los parámetros left, right, bottom, top, near y far.
   * @param {Number} left
   * @param {Number} right
   * @param {Number} bottom
   * @param {Number} top
   * @param {Number} near
   * @param {Number} far
   * @return {Matrix4}
   */
  static ortho(left, right, bottom, top, near, far) {
    const ortho = new Matrix4(
      2 / right - left,
      0,
      0,
      0,
      0,
      2 / top - bottom,
      0,
      0,
      0,
      0,
      -2 / (far - near),
      0,
      -(right + left) / (right - left),
      -(top + bottom) / (top - bottom),
      -(far + near) / (far - near),
      1
    );
    return ortho;
  }

  /**
   * función que devuelve una matriz que corresponde a una proyección en
   * perspectiva.
   * @param {Number} fovy
   * @param {Number} aspect
   * @param {Number} near
   * @param {Number} far
   * @return {Matrix4}
   */
  static perspective(fovy, aspect, near, far) {
    const f = Math.tan(Math.PI * 0.5 - 0.5 * fovy);
    const rango = 1 / (near - far);

    const perspective = new Matrix4(
      f / aspect,
      0,
      0,
      0,
      0,
      f,
      0,
      0,
      0,
      0,
      (near + far) * rango,
      -1,
      0,
      0,
      near * far * rango * 2,
      0
    );
    return perspective.transpose();
  }

  /**
   * función que devuelve una matriz de rotación en 3D sobre el eje X con el ángulo (en
   * radianes) dado por el parámetro rad.
   * @param {Number} theta
   * @return {Matrix4}
   */
  static rotateX(theta) {
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);
    const rotatex = new Matrix4(
      1,
      0,
      0,
      0,
      0,
      cos,
      sin,
      0,
      0,
      -sin,
      cos,
      0,
      0,
      0,
      0,
      1
    );
    return rotatex;
  }

  /**
   * función que devuelve una matriz de rotación en 3D sobre el eje Y con el ángulo (en
   * radianes) dado por el parámetro rad
   * @param {Number} theta
   * @return {Matrix4}
   */
  static rotateY(theta) {
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);
    const rotatey = new Matrix4(
      cos,
      0,
      -sin,
      0,
      0,
      1,
      0,
      0,
      sin,
      0,
      cos,
      0,
      0,
      0,
      0,
      1
    );
    return rotatey;
  }

  /**
   * función que devuelve una matriz de rotación en 3D sobre el eje Z con el ángulo (en
   * radianes) dado por el parámetro rad.
   * @param {Number} theta
   * @return {Matrix4}
   */
  static rotateZ(theta) {
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);
    const rotatez = new Matrix4(
      cos,
      sin,
      0,
      0,
      -sin,
      cos,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    );
    return rotatez;
  }

  /**
   * función que devuelve una matriz de escalamiento en 3D con los factores de escala
   * determinados por las componentes del vector v.
   * @param {Vector3} v
   * @return {Matrix4}
   */
  static scale(v) {
    const matrixScale = new Matrix4(
      v.x,
      0,
      0,
      0,
      0,
      v.y,
      0,
      0,
      0,
      0,
      v.z,
      0,
      0,
      0,
      0,
      1
    );
    return matrixScale;
  }

  /**
   * función que asigna nuevos valores a los componentes de la matriz con que se llama.
   * @param {Number} a00
   * @param {Number} a01
   * @param {Number} a02
   * @param {Number} a03
   * @param {Number} a10
   * @param {Number} a11
   * @param {Number} a12
   * @param {Number} a13
   * @param {Number} a20
   * @param {Number} a21
   * @param {Number} a22
   * @param {Number} a23
   * @param {Number} a30
   * @param {Number} a31
   * @param {Number} a32
   * @param {Number} a33
   */
  set(
    a00,
    a01,
    a02,
    a03,
    a10,
    a11,
    a12,
    a13,
    a20,
    a21,
    a22,
    a23,
    a30,
    a31,
    a32,
    a33
  ) {
    this.a00 = a00;
    this.a01 = a01;
    this.a02 = a02;
    this.a03 = a03;
    this.a10 = a10;
    this.a11 = a11;
    this.a12 = a12;
    this.a13 = a13;
    this.a20 = a20;
    this.a21 = a21;
    this.a22 = a22;
    this.a23 = a23;
    this.a30 = a30;
    this.a31 = a31;
    this.a32 = a32;
    this.a33 = a33;
  }

  /**
   * función que sustrae componente a componente la matriz m2 de la matriz m1.
   * @param {Matrix4} m1
   * @param {Matrix4} m2
   * @return {Matrix4}
   */
  static subtract(m1, m2) {
    return new Matrix3(
      m1.a00 - m2.a00,
      m1.a01 - m2.a01,
      m1.a02 - m2.a02,
      m1.a03 - m2.a03,
      m1.a10 - m2.a10,
      m1.a11 - m2.a11,
      m1.a12 - m2.a12,
      m1.a13 - m2.a13,
      m1.a20 - m2.a20,
      m1.a21 - m2.a21,
      m1.a22 - m2.a22,
      m1.a23 - m2.a23,
      m1.a30 - m2.a30,
      m1.a31 - m2.a31,
      m1.a32 - m2.a32,
      m1.a33 - m2.a33
    );
  }

  /**
   * función que devuelve una matriz de traslación en 3D con los factores de
   * desplazamiento dados por las componentes del vector v
   * @param {Vector3} v
   * @return {Matrix4}
   */
  static translate(v) {
    const translate = new Matrix4(
      1,
      0,
      0,
      v.x,
      0,
      1,
      0,
      v.y,
      0,
      0,
      1,
      v.z,
      0,
      0,
      0,
      1
    );
    return translate;
  }

  /**
   * función que devuelve la matriz transpuesta de la matriz desde donde se invocó la
   * función.
   * @return {Matrix4}
   */
  transpose() {
    const a00 = this.a00;
    const a01 = this.a10;
    const a02 = this.a20;
    const a03 = this.a30;
    const a10 = this.a01;
    const a11 = this.a11;
    const a12 = this.a21;
    const a13 = this.a31;
    const a20 = this.a02;
    const a21 = this.a12;
    const a22 = this.a22;
    const a23 = this.a32;
    const a30 = this.a03;
    const a31 = this.a13;
    const a32 = this.a23;
    const a33 = this.a33;

    const transMatrix = new Matrix4(
      a00,
      a01,
      a02,
      a03,
      a10,
      a11,
      a12,
      a13,
      a20,
      a21,
      a22,
      a23,
      a30,
      a31,
      a32,
      a33
    );
    return transMatrix;
  }
}
