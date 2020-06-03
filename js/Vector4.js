/**
 * Amaya López Dulce Fernanda | 314195856
 * Lechuga Martinez Jose Eduardo | 314325749
 * Proyecto final - Graficación por computadora 2020-2
 */

export default class Vector4 {
  constructor(x = 0, y = 0, z = 0, w = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  toArray() {
    return [this.x, this.y, this.z, this.w];
  }

  /**
   * Metodo que suma dos vectores dados
   * @param {Vector4} u
   * @param {Vector4} v
   * @returns {Vector4} Resultado de la suma
   */
  static add(u, v) {
    const addX = u.x + v.x;
    const addY = u.y + v.y;
    const addZ = u.z + v.z;
    const addW = u.w + v.w;
    return new Vector4(addX, addY, addZ, addW);
  }

  /**
   * Metodo que regresa una copia del vector
   * @returns {Vector4} Copia del vector
   */
  clone() {
    const clone = this;
    return clone;
  }

  /**
   * Metodo que regresa la distancia euclidiana entre dos vectores
   * @param {Vector4} u
   * @param {Vector4} v
   * @returns {Number} Distancia
   */
  static distance(u, v) {
    const disX = Math.pow(u.x - v.x, 2);
    const disY = Math.pow(u.y - v.y, 2);
    const disZ = Math.pow(u.z - v.z, 2);
    const disW = Math.pow(u.w - v.w, 2);
    const distance = Math.sqrt(disX + disY + disZ + disW);
    return distance;
  }

  /**
   * Metodo que regresa el valor del producto punto entre dos vectores
   * @param {Vector4} u
   * @param {Vector4} v
   * @returns {Number} Valor del producto punto
   */
  static dot(u, v) {
    const dotX = u.x * v.x;
    const dotY = u.y * v.y;
    const dotZ = u.z * v.z;
    const dotW = u.w * v.w;
    const dot = dotX + dotY + dotZ + dotW;
    return dot;
  }

  /**
   * Devuelve verdadero en caso de que sus argumentos sean
   * aproximadamente iguales (con una ε = 0.000001), y falso en caso contrario
   * @param {Vector4} u
   * @param {Vector4} v
   * @returns {Boolean} Igualdad aproximada
   */
  static equals(u, v) {
    const epsilon = 0.000001;
    const equX = u.x - v.x;
    const equY = u.y - v.y;
    const equZ = u.z - v.z;
    const equW = u.w - v.w;
    return (
      equX < epsilon &&
      equX >= 0 &&
      equY < epsilon &&
      equY >= 0 &&
      equZ < epsilon &&
      equZ >= 0 &&
      equW < epsilon &&
      equW >= 0
    );
  }

  /**
   * Devuelve verdadero en caso de que sus argumentos sean
   * exactamente iguales y falso en caso contrario
   * @param {Vector4} u
   * @param {Vector4} v
   * @returns {Boolean} Igualdad exacta
   */
  static exactEquals(u, v) {
    return u.x == v.x && u.y == v.y && u.z == v.z && u.w == v.w;
  }

  /**
   * Metodo devuelve el vector resultado de la normalización
   * del vector que lo invoca
   * @returns {Vector4} Vector normalizado
   */
  normalize() {
    const module = Math.sqrt(
      Math.pow(this.x, 2) +
      Math.pow(this.y, 2) +
      Math.pow(this.z, 2) +
      Math.pow(this.w, 2)
    );
    const norX = this.x / module;
    const norY = this.y / module;
    const norZ = this.z / module;
    const norW = this.w / module;
    const norma = new Vector4(norX, norY, norZ, norW);
    return norma;
  }

  /**
   * Metodo que asigna nuevos valores al vector
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   */
  set(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  /**
   * Metodo que devuelve la distancia euclidiana al cuadrado que hay entre
   * sus argumentos
   * @param {Vector4} u
   * @param {Vector4} v
   * @return {Number}
   */
  static squareDistance(u, v) {
    return Math.pow(this.distance(u, v), 2);
  }

  /**
   * Metodo que hace 0 a todos los valores del vector
   */
  zero() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.w = 0;
  }
}
