using Microsoft.EntityFrameworkCore;

namespace BE_BookingCamping.Data
{
    public class BookingCampingDbContext : DbContext
    {
        public BookingCampingDbContext(DbContextOptions<BookingCampingDbContext> options) : base(options) { }

        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Admin> Admins { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Location> Locations { get; set; }
        public virtual DbSet<Feedback> Feedbacks { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderDetail> OrderDetails { get; set;}
        public virtual DbSet<Booking> Bookings { get; set; }
        public virtual DbSet<CampsiteCalendar> CampsiteCalendars { get; set; }
        public virtual DbSet<Tent> Tents { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Location)
                .WithMany(l => l.Bookings)
                .HasForeignKey(b => b.LocationID)
                .OnDelete(DeleteBehavior.ClientSetNull); ;

            modelBuilder.Entity<Order>()
                .Property(o => o.TotalPrice)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<OrderDetail>()
                .Property(od => od.TotalPrice)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Order>()
                .HasOne(o => o.Employee)
                .WithMany(e => e.Orders)
                .HasForeignKey(o => o.EmployeeID)
                .OnDelete(DeleteBehavior.ClientSetNull);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.Customer)
                .WithMany(e => e.Orders)
                .HasForeignKey(o => o.CustomerID)
                .OnDelete(DeleteBehavior.ClientSetNull);

            modelBuilder.Entity<User>()
                .Property(u => u.PhoneNumber)
                .HasColumnType("varchar(10)");

            modelBuilder.Entity<Booking>()
                .Property(b => b.PhoneNumber)
                .HasColumnType("varchar(10)");

            modelBuilder.Entity<Customer>()
                .Property(c => c.CustomerID)
                .ValueGeneratedNever();

            modelBuilder.Entity<Employee>()
                .Property(e => e.EmployeeID)
                .ValueGeneratedNever();

            modelBuilder.Entity<Admin>()
                .Property(a => a.AdminID)
                .ValueGeneratedNever();
        }
    }
}
