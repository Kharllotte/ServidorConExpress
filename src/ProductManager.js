import { promises as fs } from "fs";

export default class ProductManager {
    constructor() {
        this.patch="./productos.json";
        this.products = [];
    }

    static id = 0;

    addProduct = async (title, description, price, imagen, code, stock) => {
        ProductManager.id++;
        let newProduct = { id: ProductManager.id, title, description, price, imagen, code, stock};
        this.products.push(newProduct);
        await fs.writeFile(this.patch, JSON.stringify(this.products));
    };

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }
    
    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        if(!respuesta3.find((product) => product.id === id)){
            console.log("Producto no encontrado");
        }else {
            console.log(respuesta3.find(product => product.id === id))}
    }

    deleteProduct = async (id) => {
        let respuesta3 = await this.readProducts()
        let productFilter = respuesta3.filter((products) => products.id != id);
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        console.log("Producto Eliminado")
    }

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProduct(id);
        let productOld = await this.readProducts();
        let productsModif = [{id, ...producto}, ...productOld];
        await fs.writeFile(this.patch, JSON.stringify(productsModif));
    }
}


// const productos = new ProductManager();

// productos.addProduct("Producto1", "DescripcionProducto1", 1000, "SinImagen1", "abc123", 5);
// productos.addProduct("Producto2", "DescripcionProducto2", 2000, "SinImagen2", "abc124", 10);
// productos.addProduct("Producto3", "DescripcionProducto3", 3000, "SinImagen3", "abc125", 15);
// productos.addProduct("Producto4", "DescripcionProducto4", 4000, "SinImagen4", "abc126", 16);
// productos.addProduct("Producto5", "DescripcionProducto5", 5000, "SinImagen5", "abc127", 17);
// productos.addProduct("Producto6", "DescripcionProducto6", 6000, "SinImagen6", "abc128", 9);
// productos.addProduct("Producto7", "DescripcionProducto7", 7000, "SinImagen7", "abc129", 12);
// productos.addProduct("Producto8", "DescripcionProducto8", 8000, "SinImagen8", "abc110", 13);
// productos.addProduct("Producto9", "DescripcionProducto9", 9000, "SinImagen9", "abc111", 14);
// productos.addProduct("Producto10", "DescripcioProducton10", 10000, "SinImagen10", "abc122", 4);

// productos.getProducts()

// productos.getProductsById(5)

// productos.deleteProduct(2)

// productos.updateProducts({
//   id: 2,
//   title: 'Titulo2',
//   description: 'Descripcion2',
//   price: 4000,
//   imagen: 'Imagen2',
//   code: 'abc124',
//   stock: 10
// })