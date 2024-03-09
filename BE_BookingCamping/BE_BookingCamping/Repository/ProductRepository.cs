using BE_BookingCamping.Data;
using BE_BookingCamping.Interface;
using BE_BookingCamping.Models.Product;

namespace BE_BookingCamping.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly BookingCampingDbContext _context;

        public ProductRepository(BookingCampingDbContext context)
        {
            _context = context;
        }
        public ProductResponse AddProduct(ProductVM product)
        {

            var _product = new Product
            {
                ProductName = product.ProductName,
                ProductImage = product.ProductImage,
                Price = product.Price,
                Capacity = product.Capacity == null ? "" : product.Capacity,
                Description = product.Description,
                CategoryID = product.CategoryID,


            };
            _context.Add(_product);
            _context.SaveChanges();
            return new ProductResponse
            {

                ProductName = product.ProductName,
                ProductImage = product.ProductImage,
                Price = product.Price,
                Capacity = product.Capacity,
                Description = product.Description,
                CategoryID = product.CategoryID,
            };
        }

        public bool DeleteProduct(Product product)
        {
            _context.Products.Remove(product);
            _context.SaveChanges();
            return true;
        }

        public List<ProductResponse> GetAllProduct()
        {
            var product = _context.Products.Select(p => new ProductResponse
            {
                ProductID = p.ProductID,
                ProductName = p.ProductName,
                Price = p.Price,
                ProductImage = p.ProductImage,
                Capacity = p.Capacity,
                CategoryID = p.CategoryID,
                Description = p.Description,

            });
            if (product == null)
            {
                return null;
            }
            return product.ToList();
        }

        public Product GetProduct(int id)
        {
            var product = _context.Products.FirstOrDefault(p => p.ProductID == id);
            if (product == null)
            {
                return null; 
            }
            return product;
        }

        public List<ProductResponse> GetProductByCategory(int categoryId)
        {
            var product = _context.Products.Select(p => new ProductResponse
            {
                ProductID = p.ProductID,
                ProductName = p.ProductName,
                Price = p.Price,
                ProductImage = p.ProductImage,
                Capacity = p.Capacity,
                CategoryID = p.CategoryID,
                Description = p.Description,

            }).Where(p => p.CategoryID == categoryId);
            if (product == null)
            {
                return null;
            }
            return product.ToList();
        }

        public ProductResponse GetProductById(int id)
        {
            var p = _context.Products.SingleOrDefault(p => p.ProductID == id);
            if (p != null)
            {
                return new ProductResponse {
                    ProductID = p.ProductID,
                    ProductName = p.ProductName,
                    Price = p.Price,
                    ProductImage = p.ProductImage,
                    Capacity = p.Capacity,
                    CategoryID = p.CategoryID,
                    Description = p.Description,

                };
            }
            return null;
        }

        public ProductResponse UpdateProduct(ProductResponse productResponse)
        {
            var product = _context.Products.FirstOrDefault(p => p.ProductID ==  productResponse.ProductID);
            product.ProductName = productResponse.ProductName;
            product.Price = productResponse.Price;
            product.ProductImage = productResponse.ProductImage;
            product.Capacity = productResponse.Capacity;
            product.CategoryID = productResponse.CategoryID;
            product.Description = productResponse.Description;
            _context.Products.Update(product);
            _context.SaveChanges();
            return productResponse;
        }
    }
}
