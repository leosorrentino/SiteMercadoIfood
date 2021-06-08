using Microsoft.Extensions.Configuration;

namespace IfoodMercado.Configuration
{
    public interface IAppConfigurationAccessor
    {
        IConfigurationRoot Configuration { get; }
    }
}
