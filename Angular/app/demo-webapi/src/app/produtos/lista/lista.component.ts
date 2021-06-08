import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produtoService';
import { Produto } from '../models/Produto';
import { ProdutoDto } from '../dto/produtoDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  constructor(
    private produtoService: ProdutoService,
    private router: Router) { }

  public produtos: Produto[];
  produtoDto: ProdutoDto = new ProdutoDto()
  public imageURL: string;
  errorMessage: string;

  ngOnInit() {
    this.produtoService.obterTodos()
      .subscribe(
        produtos => this.produtos = produtos,
        error => this.errorMessage = error,
      );
  }
  editarProduto(id) {
    this.produtoService.obterPorId(id)
      .subscribe(produto => {
        this.produtoDto = produto
        this.onEdit(this.produtoDto)
      });
  }
  onEdit(produtoDto: ProdutoDto) {
    this.router.navigate(['/cadastro-produtos', produtoDto]);    
  }  
  excluirProduto(id) {   
    this.produtoService.excluirProduto(id)
      .subscribe(produto => {
        window.location.reload();
      });
  }
}
