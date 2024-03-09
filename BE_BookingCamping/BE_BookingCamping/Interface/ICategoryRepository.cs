using BE_BookingCamping.Data;
using BE_BookingCamping.Models.Category;

namespace BE_BookingCamping.Interface
{
    public interface ICategoryRepository
    {
        List<Category> GetAllCategory();
        Category GetCategory(int id);
        Category GetCategoryById(int id);
        Category AddCategory(CategoryRequest category);
        Category UpdateCategory(CategoryUpdateRequest category);

        List<Product> GetProductByCategoryId(int id);
        bool DeleteCategory(int id);
    }
}
