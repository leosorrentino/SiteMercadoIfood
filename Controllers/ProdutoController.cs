using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using IfoodMercado.Business.Intefaces;
using IfoodMercado.Business.Models;
using IfoodMercado.Dto;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Net.Http;
using Newtonsoft.Json.Linq;

namespace IfoodMercado.Controllers
{
    //[Route("api/produtos")]    
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        private readonly IProdutoService _produtoService;
        private readonly IMapper _mapper;

        public ProdutoController(IProdutoService produtoService,
                                  IMapper mapper) : base()
        {            
            _produtoService = produtoService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<ProdutoDto>> ObterTodos()
        {
            return _mapper.Map<IEnumerable<ProdutoDto>>(await _produtoService.Obter());
        }
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<ProdutoDto>> ObterPorId(Guid id)
        {
            var produto = await ObterProduto(id);

            if (produto == null) return NotFound();

            return produto;
        }

        [HttpPost("adicionar")]
        public async Task<ProdutoDto> Adicionar(ProdutoDto produtoDto)
        {
            if (produtoDto.Id != Guid.Empty)            
                await Atualizar(produtoDto.Id, produtoDto);            
            else            
                await _produtoService.Adicionar(_mapper.Map<Produto>(produtoDto));
            
            return produtoDto;

        }
        [HttpPut("{id:guid}")]
        public async Task<ProdutoDto> Atualizar(Guid id, ProdutoDto produtoDto)
        {
           await _produtoService.Atualizar(_mapper.Map<Produto>(produtoDto));

           return produtoDto;

        }
        private async Task<ProdutoDto> ObterProduto(Guid id)
        {
            return _mapper.Map<ProdutoDto>(await _produtoService.ObterPorId(id));
        }

        [HttpDelete("{id:guid}")]
        public async Task<ProdutoDto> Excluir(Guid id)
        {
            var produto = await ObterProduto(id);

            if (produto == null) return null;
                
            await _produtoService.Remover(id);

            return produto;
        }

        [HttpPost("entrar")]
        public async Task<string> Login(UserDto userDto)
        {
            string url = String.Format("{0}", "https://dev.sitemercado.com.br/api/login");

            var httpClientHandler = new HttpClientHandler();
            var httpClient = new HttpClient(httpClientHandler);

            //httpClient.DefaultRequestHeaders.Add("Authorization", userDto.username);           

            JObject param = new JObject(new JProperty("Username", userDto.username),
                new JProperty("Password", userDto.password));           

            var content = new StringContent(param.ToString(), Encoding.UTF8, "application/json");
            var response = await httpClient.PostAsync(url, content);
            string responseBody = await response.Content.ReadAsStringAsync();

            var error = JObject.Parse(responseBody)["error"].ToString();

            if (error != null)
            {
                throw new Exception("Verifique o seu usuário e senha");
            }  
            return responseBody;
        }    

    }
}
