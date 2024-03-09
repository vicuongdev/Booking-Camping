using BE_BookingCamping.Data;
using BE_BookingCamping.Models.Tent;
using System.Collections.Generic;

namespace BE_BookingCamping.Interface
{
    public interface ITentRepository
    {
        List<TentResponse> GetAllTents();
        TentResponse GetTentById(int id);
        TentResponse AddTent(TentVM tent);
        TentResponse UpdateTent(TentResponse tent);
        bool DeleteTent(Tent tent);
        List<TentResponse> GetTentsByLocation(int locationId);
        Tent GetTent(int id);
    }
}
