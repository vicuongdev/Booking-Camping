using BE_BookingCamping.Data;
using BE_BookingCamping.Models.Product;

namespace BE_BookingCamping.Interface
{
    public interface IProductRepository
    {
        List<ProductResponse> GetAllProduct();
        ProductResponse GetProductById(int id);
        ProductResponse AddProduct(ProductVM product);
        ProductResponse UpdateProduct(ProductResponse product);
        bool DeleteProduct(Product product);
        List<ProductResponse> GetProductByCategory(int categoryId);
        Product GetProduct(int id);
    }
}
