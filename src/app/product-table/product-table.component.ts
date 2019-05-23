import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product.model';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {

  @ViewChild(MatTable) dataTable: MatTable<any>;

  products: Product[];
  prodColumns: string[] = [
    'id', 'name', 'price', 'description', 'department'
  ];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.productService.onNewProduct.subscribe((produto) => {
      this.dataTable.renderRows();
    });
  }

}
