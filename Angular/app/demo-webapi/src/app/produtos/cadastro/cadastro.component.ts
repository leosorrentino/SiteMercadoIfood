import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../models/Produto';
import { ProdutoService } from '../services/produtoService';
import { ProdutoDto } from '../dto/produtoDto';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {

  produtoForm: FormGroup;
  produtoDto: ProdutoDto = new ProdutoDto()
  produto: Produto;

  constructor(private router: Router,
    private produtoService: ProdutoService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params.id != null) {
      this.activatedRoute.params.subscribe(
        p => {
          this.produtoDto.id = p.id;
          this.produtoService.obterPorId(this.produtoDto.id).subscribe(
            p => {
              this.produtoDto = p;              
            })
        });
    }
  }

  cadastrarProduto(produtoDto) {
      this.produtoService.novoProduto(produtoDto)
      .subscribe(produto => {
        this.produtoDto = produto      
        this.onSaveComplete()
      });    
  }
  onSaveComplete() {
    this.router.navigate(['/lista-produtos']);
  }

}


