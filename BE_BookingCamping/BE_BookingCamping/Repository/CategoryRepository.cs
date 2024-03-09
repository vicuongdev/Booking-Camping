using BE_BookingCamping.Data;
using BE_BookingCamping.Interface;
using BE_BookingCamping.Models.Category;

namespace BE_BookingCamping.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly BookingCampingDbContext _context;

        public CategoryRepository(BookingCampingDbContext context)
        {
            _context = context;
        }
        public Category AddCategory(CategoryRequest category)
        {
            var c = _context.Categories.FirstOrDefault(c => c.CategoryName == category.CategoryName);
            if (c == null)
            {
                c = new Category();
                c.CategoryName = category.CategoryName;
                _context.Categories.Add(c);
                _context.SaveChanges();
                return c;
            }
            return null;
        }

        public bool DeleteCategory(int id)
        {
            var category = _context.Categories.FirstOrDefault(c => c.CategoryID == id);
            if(category == null)
            {
                return false;
            }
            _context.Categories.Remove(category);
            _context.SaveChanges();
            return true;
        }

        public List<Category> GetAllCategory()
        {
            var list = _context.Categories.ToList();
            if(list == null)
            {
                return null;
            }
            return list;
        }

        public Category GetCategory(int id)
        {
            var cate = _context.Categories.FirstOrDefault(c => c.CategoryID==id);
            if (cate == null)
                return null;
            return cate;
        }

        public Category GetCategoryById(int id)
        {
            var cate = _context.Categories.FirstOrDefault(c => c.CategoryID == id);
            if (cate == null)
                return null;
            return cate;
        }

        public List<Product> GetProductByCategoryId(int id)
        {
            var list = _context.Products.Where(p => p.CategoryID == id).ToList();
            if (list.Count == 0)
            {
                return null;
            }
            return list;
        }

        public Category UpdateCategory(CategoryUpdateRequest category)
        {
            var cate = _context.Categories.FirstOrDefault(c => c.CategoryID ==  category.CategoryID);
            if(cate == null)
            {
                return null;
            }
            cate.CategoryName = category.CategoryName;
            _context.Categories.Update(cate);
            _context.SaveChanges();
            return cate;
        }
    }
}
