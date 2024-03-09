using BE_BookingCamping.Interface;
using BE_BookingCamping.Models.Product;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BE_BookingCamping.Controllers.Product
{
    [Route("api/product")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet("GetAllProduct")]
        public IActionResult GetAllProduct()
        {
            var list = _productRepository.GetAllProduct();

            if (list == null || list.Count == 0)
            {
                return NotFound("Danh sách sản phẩm trống!");
            }
            else
            {
                return Ok(list);
            }

        }

        [HttpGet("GetProductById/{id}")]
        public IActionResult GetProductById(int id)
        {
            try
            {
                var data = _productRepository.GetProductById(id);
                if (data != null)
                {
                    return Ok(data);
                }
                else
                {
                    return NotFound("Không tìm thấy sản phẩm");
                }

            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpPut("UpdateProduct")]
        [Authorize(Roles = "1")]
        public IActionResult UpdateProduct(ProductResponse productResponse)
        {
            var product = _productRepository.GetProduct(productResponse.ProductID);
            if (product == null)
            {
                return BadRequest("Không tìm thấy sản sản cần update");
            }
            var result = _productRepository.UpdateProduct(productResponse);
            return Ok(result);
        }
        [HttpPost("AddProduct")]
        [Authorize(Roles = "1")]
        public IActionResult AddProduct(ProductVM product)
        {
            try
            {
                return Ok(_productRepository.AddProduct(product));
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpGet("GetProductByCategory/{CategoryID}")]
        public IActionResult GetProductByCategory(int CategoryID)
        {
            try
            {
                var data = _productRepository.GetProductByCategory(CategoryID);
                if (data != null)
                {
                    return Ok(data);
                }
                else
                {
                    return NotFound("Không tìm thấy sản phẩm");
                }

            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("DeleteProduct")]
        [Authorize(Roles = "1")]
        public IActionResult DeleteProduct(int productID)
        {
            var product = _productRepository.GetProduct(productID);
            if(product == null)
            {
                return BadRequest("Sản phẩm không tồn tại");
            }
            _productRepository.DeleteProduct(product);
            return Ok("Xóa thành công");
        }

    }
}
