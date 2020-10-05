import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPagination } from '../shared/_models/pagination';
import { IBrand } from '../shared/_models/brand';
import { IType } from '../shared/_models/productType';
import { ShopParams } from '../shared/_models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams): Observable<IPagination> {
    let params = new HttpParams();

    if (shopParams.brandId !== 0) {
        params = params.append('brandId', shopParams.brandId.toString());
    }

    if (shopParams.typeId !== 0) {
      params = params.append('typeId', shopParams.typeId.toString());
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());

    const url = `${this.baseUrl}products`;

    return this.http.get<IPagination>(url, { observe: 'response', params })
      .pipe(
        map(response => response.body)
      );
  }

  getBrands(): Observable<IBrand[]> {
    const url = `${this.baseUrl}products/brands?pageSize=50`;

    return this.http.get<IBrand[]>(url);
  }

  getTypes(): Observable<IType[]> {
    const url = `${this.baseUrl}products/types?pageSize=50`;

    return this.http.get<IType[]>(url);
  }
}
