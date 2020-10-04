using Core.Entities;

namespace Core.Specifications
{
  public class ProductWithFiltersforCountSpecification
  : BaseSpecification<Product>
  {
    public ProductWithFiltersforCountSpecification(
        ProductSpecParams productParams)
        : base(p =>
          (string.IsNullOrEmpty(productParams.Search)
            || p.Name.ToLower().Contains(productParams.Search))
          && (!productParams.BrandId.HasValue
            || p.ProductBrandId == productParams.BrandId)
          && (!productParams.TypeId.HasValue
            || p.ProductTypeId == productParams.TypeId)
        )
    {}
  }
}