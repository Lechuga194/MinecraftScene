// por lo general es buena idea precargar las imágenes que se van a utilizar como textura
class ImageLoader {
  constructor() {
    this.images = {};
  }

  // función que recibe un arreglo con los nombres de las imágenes que va a precargar y un función que se ejecutará una vez que se hayan cargado las imágenes
  load(imageList, callback) {
    // se inicia un contador para saber cuantas imágenes se han completado
    let image_count = 0;

    if (imageList.length > 0) {
      // se itera sobre cada imagen que se quiere cargar
      imageList.forEach((src) => {
        // se crea una nueva imagen
        let img = new Image();

        // se agrega un manejador del evento de carga
        img.addEventListener("load", (evt) => {
          // se almacena la imagen en el objeto images, para después acceder a ella en el programa de WebGL
          this.images[src] = img;

          // se incrementa el contador de imágenes leídas
          image_count++;

          // si ya leímos todas las imágenes, entonces ejecutamos el callback
          if (image_count == imageList.length) {
            callback();
          }
        });

        // se agrega un manejador del evento de error, en caso de que la imagen no se encuentre o haya ocurrido algún error al leerla
        img.addEventListener("error", (evt) => {
          throw `Error loading image. ${evt}`;
        });

        // se asigna el nombre del archivo que se va a cargar
        img.src = src;
      });
    } else {
      callback();
    }
  }

  getImage(image_name) {
    if (this.images[image_name]) {
      return this.images[image_name];
    }

    throw `Error loading image: ${image_name}`;
  }
}

// se crea una instancia del cargador de imágenes, para que sea esta única instancia la que se utilice para acceder a las imágenes cargadas
let image_loader = new ImageLoader();

export default image_loader;
