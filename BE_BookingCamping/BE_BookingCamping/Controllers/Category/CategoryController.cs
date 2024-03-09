using BE_BookingCamping.Data;
using BE_BookingCamping.Interface;
using BE_BookingCamping.Models.Category;
using BE_BookingCamping.Models.Product;
using BE_BookingCamping.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BE_BookingCamping.Controllers
{
    [Route("api/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpGet("GetAllCategory")]
        public IActionResult GetAllCategory()
        {
            var list = _categoryRepository.GetAllCategory();

            if (list == null || list.Count == 0)
            {
                return NotFound("Danh sách danh mục trống!");
            }
            else
            {
                return Ok(list);
            }

        }

        [HttpGet("GetCategoryById/{id}")]
        public IActionResult GetCategoryById(int id)
        {
            try
            {
                var data = _categoryRepository.GetCategoryById(id);
                if (data != null)
                {
                    return Ok(data);
                }
                else
                {
                    return NotFound("Không tìm thấy danh mục");
                }

            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpPut("UpdateCategory")]
        [Authorize(Roles = "1")]
        public IActionResult UpdateCategory(CategoryUpdateRequest category)
        {
            var cate = _categoryRepository.GetCategory(category.CategoryID);
            if (cate == null)
            {
                return BadRequest("Không tìm thấy danh mục cần update");
            }
            var result = _categoryRepository.UpdateCategory(category);
            return Ok(result);
        }
        [HttpPost("AddCategory")]
        [Authorize(Roles = "1")]
        public IActionResult AddCategory(CategoryRequest category)
        {
            try
            {
                return Ok(_categoryRepository.AddCategory(category));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }


        [HttpDelete("DeleteCategory")]
        [Authorize(Roles = "1")]
        public IActionResult DeleteProduct(int catId)
        {
            var listproduct = _categoryRepository.GetProductByCategoryId(catId);
            if (listproduct == null)
            {
                var isDelete = _categoryRepository.DeleteCategory(catId);
                if (!isDelete)
                {
                    return BadRequest("Xóa thất bại");
                }
                return Ok("Xóa thành công");
            }
            return BadRequest("Hiện đang có sản phẩm trong danh mục, không thể xóa");
        }

    }
}
