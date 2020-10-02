using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
  public class StoreContextSeed
  {
    public static async Task SeedAsync(
        StoreContext context,
        ILoggerFactory loggerFactory)
    {
      try
      {
          var path = "../Infrastructure/Data/SeedData/";

          if (!context.ProductBrands.Any()) {
              var pathFile = $"{path}brands.json";
              var brandsData = File.ReadAllText(pathFile);
              var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
              foreach (var item in brands)
              {
                  context.ProductBrands.Add(item);
              }

              await context.SaveChangesAsync();
          }

          if (!context.ProductTypes.Any()) {
              var pathFile = $"{path}types.json";
              var typesData = File.ReadAllText(pathFile);
              var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);
              foreach (var item in types)
              {
                  context.ProductTypes.Add(item);
              }

              await context.SaveChangesAsync();
          }

          if (!context.Products.Any()) {
              var pathFile = $"{path}products.json";
              var productsData = File.ReadAllText(pathFile);
              var products = JsonSerializer.Deserialize<List<Product>>(productsData);
              foreach (var item in products)
              {
                  context.Products.Add(item);
              }

              await context.SaveChangesAsync();
          }
      }
      catch (Exception ex)
      {
          var logger = loggerFactory.CreateLogger<StoreContextSeed>();
          logger.LogError(ex.Message);
      }
    }
  }
}