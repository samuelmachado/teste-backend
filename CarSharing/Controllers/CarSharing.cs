using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarSharing.Business;
using CarSharing.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarSharing.Controllers
{
    [Route("api/rent")]
    [ApiController]
    public class CarSharing : ControllerBase
    {
        [HttpGet("get")]
        public IActionResult Get()
        {
            Response response = new Response();
            try
            {
                var carSharingBusiness = new CarSharingBusiness();
                response = carSharingBusiness.getAll(response);

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(response);
            }

        }

        [HttpGet("rentcar")]
        public IActionResult RentCar(int id)
        {
            Response response = new Response();
            try
            {
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(response);
            }

        }

        [HttpGet("checkin")]
        public IActionResult Checkin(int id)
        {
            Response response = new Response();
            try
            {
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new Response());
            }

        }
        [HttpGet("checkout")]
        public IActionResult Checkout(int id)
        {
            Response response = new Response();
            try
            {
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new Response());
            }

        }


    }
}
