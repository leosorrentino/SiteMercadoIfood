using IfoodMercado.Business.Intefaces;
using IfoodMercado.Business.Services;
using IfoodMercado.Data.Context;
using IfoodMercado.Data.Repository;
using Microsoft.Extensions.DependencyInjection;

namespace IfoodMercado.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection ResolveDependencies(this IServiceCollection services)
        {
            services.AddScoped<MeuDbContext>();
            services.AddScoped<IProdutoRepository, ProdutoRepository>();         

            services.AddScoped<IProdutoService, ProdutoService>();

            return services;
        }
    } 
}
