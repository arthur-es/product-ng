import { Injectable, EventEmitter } from '@angular/core';
import { Product } from './models/product.model';
import { DepartmentService } from './department.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [];
  private nextID: number;
  onNewProduct: EventEmitter<Product> = new EventEmitter<Product>();

  private dataFromServer: any[] = [
    {id: 1, name: 'Laptop', department_id: 4, price: 40, description: 'Laptop Description'},
    {id: 2, name: 'Shirt', department_id: 1, price: 40, description: 'Shirt Description'},
    {id: 3, name: 'Mouse', department_id: 3, price: 40, description: 'Mouse Description'},
  ];

  constructor(private departmentService: DepartmentService) {

    for (const p of this.dataFromServer) {
      this.products.push({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        department: this.departmentService.getDepartmentById(p.department_id)
      });
      this.nextID = p.id++;
    }

  }

  getProducts() {
    return this.products;
  }

  addProduct(p: Product) {
    const prodId = this.nextID + 1;
    this.nextID++;
    const prod: Product = {id: prodId, ...p};
    console.log(prod.id);
    this.products.push(prod);
    this.onNewProduct.emit(prod);
    }

}
