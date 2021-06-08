using AutoMapper;
using IfoodMercado.Business.Models;
using IfoodMercado.Dto;
using System;

namespace IfoodMercado.Configuration
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<ProdutoDto, Produto>().ReverseMap();
        }

    }
}
