/**
 * Amaya López Dulce Fernanda | 314195856
 * Lechuga Martinez Jose Eduardo | 314325749
 * Proyecto final - Graficación por computadora 2020-2
 */

/**
 * Clase para la definicion y operacion de vectores
 */
export default class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Regresa el vector como arreglo
   */
  toArray() {
    return [this.x, this.y, this.z];
  }

  /**
   * Metodo que suma dos vectores dados
   * @param {Vector3} u
   * @param {Vector3} v
   * @returns {Vector3} Resultado de la suma
   */
  static add(u, v) {
    const addX = u.x + v.x;
    const addY = u.y + v.y;
    const addZ = u.z + v.z;
    return new Vector3(addX, addY, addZ);
  }

  /**
   * Metodo que resta dos vectores dados
   * @param {Vector3} u
   * @param {Vector3} v
   * @returns {Vector3} Resultado de la resta
   */
  static subs(u, v) {
    const subsX = u.x - v.x;
    const subsY = u.y - v.y;
    const subsZ = u.z - v.z;
    return new Vector3(subsX, subsY, subsZ);
  }

  /**
   * Metodo que regresa una copia del vector
   * @returns {Vector3} Copia del vector
   */
  clone() {
    const clone = this;
    return clone;
  }

  /**
   * Metodo que regresa el resultado de el producto cruz de dos vectores
   * @param {Vector3} u
   * @param {Vector3} v
   * @returns {Vector3} Vector con producto cruz
   */
  static cross(u, v) {
    const crossX = u.y * v.z - u.z * v.y;
    const crossY = u.x * v.z - u.z * v.x;
    const crossZ = u.x * v.y - u.y * v.x;
    return new Vector3(crossX, -crossY, crossZ);
  }

  /**
   * Metodo que regresa la distancia euclidiana entre dos vectores
   * @param {Vector3} u
   * @param {Vector3} v
   * @returns {Number} Distancia
   */
  static distance(u, v) {
    const disX = Math.pow(u.x - v.x, 2);
    const disY = Math.pow(u.y - v.y, 2);
    const disZ = Math.pow(u.z - v.z, 2);
    const distance = Math.sqrt(disX + disY + disZ);
    return distance;
  }

  /**
   * Metodo que regresa el valor del producto punto entre dos vectores
   * @param {Vector3} u
   * @param {Vector3} v
   * @returns {Number} Valor del producto punto
   */
  static dot(u, v) {
    const dotX = u.x * v.x;
    const dotY = u.y * v.y;
    const dotZ = u.z * v.z;
    const dot = dotX + dotY + dotZ;
    return dot;
  }

  /**
   * Devuelve verdadero en caso de que sus argumentos sean
   * aproximadamente iguales (con una ε = 0.000001), y falso en caso contrario
   * @param {Vector3} u
   * @param {Vector3} v
   * @returns {Boolean} Igualdad aproximada
   */
  static equals(u, v) {
    const epsilon = 0.000001;
    const equX = u.x - v.x;
    const equY = u.y - v.y;
    const equZ = u.z - v.z;
    return (
      equX < epsilon &&
      equX >= 0 &&
      equY < epsilon &&
      equY >= 0 &&
      equZ < epsilon &&
      equZ >= 0
    );
  }

  /**
   * Devuelve verdadero en caso de que sus argumentos sean
   * exactamente iguales y falso en caso contrario
   * @param {Vector3} u
   * @param {Vector3} v
   * @returns {Boolean} Igualdad exacta
   */
  static exactEquals(u, v) {
    return u.x == v.x && u.y == v.y && u.z == v.z;
  }

  /**
   * Metodo devuelve el vector resultado de la normalización
   * del vector que lo invoca
   * @returns {Vector3} Vector normalizado
   */
  normalize() {
    const module = Math.sqrt(
      Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2)
    );
    const norX = this.x / module;
    const norY = this.y / module;
    const norZ = this.z / module;
    const norma = new Vector3(norX, norY, norZ);
    return norma;
  }

  /**
   * Metodo que asigna nuevos valores al vector
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   */
  set(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Metodo que devuelve la distancia euclidiana al cuadrado que hay entre
   * sus argumentos
   * @param {Vector3} u
   * @param {Vector3} v
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
  }
}

// v1 = new Vector3(2, 0, 1);
// v2 = new Vector3(1, -1, 3);
// v3 = new Vector3(1, 1, 1);
// v4 = new Vector3(1, 1, 0.9999999);
// v5 = new Vector3(6, 8, 0);

// /**
//  * Test sumas
//  */
// addVect = Vector3.add(v1, v2);
// console.log(addVect);

// /**
//  * Test clon
//  */
// cloneVect = v1.clone();
// console.log("Clon de 201", cloneVect);

// /**
//  * Test cross
//  */
// crossVect = Vector3.cross(v1, v2);
// console.log(crossVect);

// /**
//  * Test dist
//  */
// console.log("Distancia:", Vector3.distance(v1, v2));

// /**
//  * Test dist al cuadrado
//  */
// console.log("Distancia al cuadrado:", Vector3.squareDistance(v1, v2));

// /**
//  * Test dot
//  */
// console.log(Vector3.dot(new Vector3(7, -4, -1), new Vector3(3, -5, 2)));

// /**
//  * Test equals aprox
//  */
// console.log(Vector3.equals(v3, v4));

// /**
//  * Test exactEquals
//  */
// console.log(Vector3.exactEquals(v3, v4));

// /**
//  * Test norma
//  */
// console.log(v5.normalize());

// /**
//  * Test set
//  */
// console.log("Antes", v1);
// v1.set(666, 666, 666);
// console.log("Despues", v1);

// /**
//  * Test zero
//  */
// console.log("Antes de 0", v5);
// v5.zero();
// console.log("Despues de 0", v5);
