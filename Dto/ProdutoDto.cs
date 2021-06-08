using System;
using System.ComponentModel.DataAnnotations;

namespace IfoodMercado.Dto
{
    public class ProdutoDto
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public string Nome { get; set; }
        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public decimal Valor { get; set; }
        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        public string Imagem { get; set; }
    }
}
