import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { Produto } from '../models/Produto';
import { BaseService } from 'src/app/base/baseService';
import { ProdutoDto } from '../dto/produtoDto';

@Injectable()
export class ProdutoService extends BaseService {
    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<Produto[]> {
        return this.http
            .get<Produto[]>(this.UrlServiceV1 + "produto", super.ObterAuthHeaderJson())
            .pipe(
                catchError(this.serviceError));
    }

    obterPorId(id: string): Observable<ProdutoDto> {
        return this.http
        .get<ProdutoDto>(this.UrlServiceV1 + "produto/" + id, super.ObterAuthHeaderJson())
            .pipe(
                catchError(super.serviceError));
    }

    novoProduto(produto: ProdutoDto): Observable<ProdutoDto> {        
        return this.http
            .post(this.UrlServiceV1 + 'produto/adicionar', produto, super.ObterHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarProduto(id: string): Observable<Produto> {
        return this.http
            .put(this.UrlServiceV1 + "produto/" + id, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirProduto(id: string): Observable<Produto> {
        return this.http
            .delete(this.UrlServiceV1 + "produto/" + id, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
 
}