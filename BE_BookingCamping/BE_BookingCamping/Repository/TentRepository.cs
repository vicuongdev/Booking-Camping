using System.Collections.Generic;
using System.Linq;
using BE_BookingCamping.Data;
using BE_BookingCamping.Interface;
using BE_BookingCamping.Models.Tent;

namespace BE_BookingCamping.Repository
{
    public class TentRepository : ITentRepository
    {
        private readonly BookingCampingDbContext _context;

        public TentRepository(BookingCampingDbContext context)
        {
            _context = context;
        }

        public List<TentResponse> GetAllTents()
        {
            return _context.Tents.Select(t => new TentResponse
            {
                TentID = t.TentID,
                TentName = t.TentName,
                Capacity = t.Capacity,
                Description = t.Description,
                PricePerNight = t.PricePerNight,
                LocationID = t.LocationID,
                ProductID = t.ProductID
            }).ToList();
        }

        public TentResponse GetTentById(int id)
        {
            var tent = _context.Tents.Find(id);
            if (tent == null)
                return null;

            return new TentResponse
            {
                TentID = tent.TentID,
                TentName = tent.TentName,
                Capacity = tent.Capacity,
                Description = tent.Description,
                PricePerNight = tent.PricePerNight,
                LocationID = tent.LocationID,
                ProductID = tent.ProductID
            };
        }

        public TentResponse AddTent(TentVM tent)
        {
            var newTent = new Tent
            {
                TentName = tent.TentName,
                Capacity = tent.Capacity,
                Description = tent.Description,
                PricePerNight = tent.PricePerNight,
                LocationID = tent.LocationID,
                ProductID = tent.ProductID
            };

            _context.Tents.Add(newTent);
            _context.SaveChanges();

            return new TentResponse
            {
                TentID = newTent.TentID,
                TentName = newTent.TentName,
                Capacity = newTent.Capacity,
                Description = newTent.Description,
                PricePerNight = newTent.PricePerNight,
                LocationID = newTent.LocationID,
                ProductID = newTent.ProductID
            };
        }

        public TentResponse UpdateTent(TentResponse tent)
        {
            var existingTent = _context.Tents.Find(tent.TentID);
            if (existingTent == null)
                return null;

            existingTent.TentName = tent.TentName;
            existingTent.Capacity = tent.Capacity;
            existingTent.Description = tent.Description;
            existingTent.PricePerNight = tent.PricePerNight;
            existingTent.LocationID = tent.LocationID;
            existingTent.ProductID = tent.ProductID;

            _context.SaveChanges();

            return tent;
        }

        public bool DeleteTent(Tent tent)
        {
            var existingTent = _context.Tents.Find(tent.TentID);
            if (existingTent == null)
                return false;

            _context.Tents.Remove(existingTent);
            _context.SaveChanges();

            return true;
        }


        public List<TentResponse> GetTentsByLocation(int locationId)
        {
            return _context.Tents.Where(t => t.LocationID == locationId).Select(t => new TentResponse
            {
                TentID = t.TentID,
                TentName = t.TentName,
                Capacity = t.Capacity,
                Description = t.Description,
                PricePerNight = t.PricePerNight,
                LocationID = t.LocationID,
                ProductID = t.ProductID
            }).ToList();
        }

        public Tent GetTent(int id)
        {
            return _context.Tents.Find(id);
        }
    }
}
