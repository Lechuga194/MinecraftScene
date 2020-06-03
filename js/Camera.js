/**
 * Amaya López Dulce Fernanda | 314195856
 * Lechuga Martinez Jose Eduardo | 314325749
 * Proyecto final - Graficación por computadora 2020-2
 */

import Matrix4 from "./Matrix4.js";
import Vector3 from "./Vector3.js";

export default class Camera {

    /**
     * 
     * @param {Vector3} pos 
     * @param {Vector3} coi
     * @param {Vector3} up
     */
    constructor(pos, coi, up) {
        this.setPos(pos);
        this.setCOI(coi);
        this.setUp(up);

        this.m = new Matrix4().identity;
        this.radius = Vector3.distance(this.pos, this.coi);
        let direction = Vector3.subs(this.pos, this.coi);
        this.theta = Math.atan2(direction.z, direction.x);
        this.phi = Math.atan2(direction.y, direction.x);
    }

    /**
     * Funcion que devuelve la matriz asociada a la camara
     */
    getMatrix() {
        if (this.needUpdate) {
            this.needUpdate = false;
            this.m = Matrix4.lookAt(this.pos, this.coi, this.up);
        }
        return this.m;
    }

    /**
   * Función que permite cambiar la posición de la cámara
   * @param {Vector3} pos es la nueva posición de la cámara
   */
    setPos(pos) {
        let posAux = new Vector3(0, 0, 1);
        this.pos = pos;

        this.needUpdate = true;
    }

    /**
     * Metodo que regresa la posicion actual de la camara
     */
    getPos() {
        return this.pos;
    }

    /**
     * Función que permite cambiar el centro de interés de la cámara
     * @param {Vector3} coi es el nuevo centro de interés de la cámara
     */
    setCOI(coi) {
        let coiAux = new Vector3(0, 0, 0);
        this.coi = coi || coiAux;

        this.needUpdate = true;
    }

    /**
     * Metodo que regresa el punto de interesa actual
     */
    getCOI() {
        return this.coi;
    }

    /**
     * Función que permite cambiar el vector hacia arriba de la cámara
     * @param {Vector3} up es el nuevo vector hacia arriba de la cámara
     */
    setUp(up) {
        let upAux = new Vector3(0, 1, 0);
        this.up = up || upAux;

        this.needUpdate = true;
    }

    /**
     * Función que asigna los ángulos finales a la cámara, una vez que se termino de mover el mouse, esta función se debe ejecutar en el evento mouseup
     * @param {Object} init_mouse es un objeto que contiene las coordenadas del mouse cuando se dio clic en el canvas
     * @param {Object} current_mouse es un objeto que contiene las coordenadas actuales del mouse 
     */
    finishMove(init_mouse, current_mouse) {
        // se obtiene el ángulo phi y theta considerando como se ha movido el mouse desde el primer clic hasta la última posición
        let angles = this.getAngles(init_mouse, current_mouse);

        this.theta = angles.theta;
        this.phi = angles.phi;
    }

    /**
     * Función que rota la cámara con la información de movimiento del mouse
     * @param {Object} init_mouse es un objeto que contiene las coordenadas del mouse cuando se dio clic en el canvas
     * @param {Object} current_mouse es un objeto que contiene las coordenadas actuales del mouse 
     */
    rotate(init_mouse, current_mouse) {
        // se obtiene el ángulo phi y theta considerando como se ha movido el mouse desde el primer clic hasta la última posición
        let angles = this.getAngles(init_mouse, current_mouse);

        // se cambia la posición de la cámara utilizando los ángulos anteriores para determinar las coordenadas polares

        let x = this.radius * Math.cos(angles.phi) * Math.cos(angles.theta);
        let y = this.radius * Math.sin(angles.phi);
        let z = this.radius * Math.cos(angles.phi) * Math.sin(angles.theta);
        let newPos = new Vector3(x, y, z);
        this.setPos(newPos)

    }

    /**
     * Función que calcula los ángulos theta y phi sobre la esfera, para determinar la posición de la cámara
     * @param {Object} init_mouse es un objeto que contiene las coordenadas del mouse cuando se dio clic en el canvas
     * @param {Object} current_mouse es un objeto que contiene las coordenadas actuales del mouse 
     */
    getAngles(init_mouse, current_mouse) {
        // es la restricción del ángulo de movimiento de la cámara, esto es útil para que la cámara no rote completamente y se desoriente
        let rest = Math.PI / 2 - 0.1;

        // theta es el ángulo determinado por la proyección de la cámara en el plano XZ; y está controlado por el movimiento en el eje X del mouse
        let theta = this.theta + (current_mouse.x - init_mouse.x) / 100;

        // phi es el ángulo determinado por la proyección de la cámara en el plano XY; y está controlado por el movimiento en el eje Y del mouse
        let phi = Math.min(
            Math.max(
                this.phi + (current_mouse.y - init_mouse.y) / 100,
                -rest
            ),
            rest
        );

        return {
            theta: theta,
            phi: phi
        };
    }

}