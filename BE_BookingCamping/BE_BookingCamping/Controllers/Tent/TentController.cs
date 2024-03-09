using BE_BookingCamping.Interface;
using BE_BookingCamping.Models.Tent;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace BE_BookingCamping.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TentsController : ControllerBase
    {
        private readonly ITentRepository _tentRepository;

        public TentsController(ITentRepository tentRepository)
        {
            _tentRepository = tentRepository;
        }

        [HttpGet("GetAllTents")]
        public IActionResult GetAllTents()
        {
            var tents = _tentRepository.GetAllTents();
            if (tents == null || tents.Count == 0)
            {
                return NotFound("Danh sách lều trống!");
            }
            else
            {
                return Ok(tents);
            }
        }

        [HttpGet("GetTent/{id}")]
        public IActionResult GetTent(int id)
        {
            try
            {
                var tent = _tentRepository.GetTentById(id);
                if (tent != null)
                {
                    return Ok(tent);
                }
                else
                {
                    return NotFound("Không tìm thấy lều");
                }
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost("AddTent")]
        [Authorize(Roles = "1")]
        public ActionResult<TentResponse> AddTent(TentVM tent)
        {
            try
            {
                var createdTent = _tentRepository.AddTent(tent);
                return CreatedAtAction(nameof(GetTent), new { id = createdTent.TentID }, createdTent);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("UpdateTent/{id}")]
        [Authorize(Roles = "1")]
        public IActionResult UpdateTent(int id, TentResponse tent)
        {
            if (id != tent.TentID)
            {
                return BadRequest();
            }
            _tentRepository.UpdateTent(tent);
            return NoContent();
        }

        [HttpDelete("DeleteTent/{id}")]
        [Authorize(Roles = "1")]
        public IActionResult DeleteTent(int id)
        {
            var tent = _tentRepository.GetTent(id);
            if (tent == null)
            {
                return NotFound();
            }
            _tentRepository.DeleteTent(tent);
            return NoContent();
        }
    }
}
