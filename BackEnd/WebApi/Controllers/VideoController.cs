using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
   public class VideoController : ControllerBase
    {
        private readonly ApiDbContext _context;
        private readonly IVideoService _service;
        public VideoController(ApiDbContext context, IVideoService service)
        {
            this._context = context;
            this._service = service;
        }
        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile(
        [FromForm] VideoModel video)
        {
            if (! await _service.UploadFile(video))
            {
                return BadRequest(new { message = "Invalid file extension" });
            }

            return Ok();
        }
        [HttpPost("getList")]
        public ActionResult<IEnumerable<object>> GetList()
        {
            try
            {
                var res = _service.GetList();
                return Ok(res);
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
           
        }
        [HttpPost("getListDetail")]
        public ActionResult<IEnumerable<object>> GetListDetail(VideoListDetailParam param)
        {
            try
            {
                var res = _service.GetListDetail(param);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }
        [HttpPost("delete")]
        public ActionResult<IEnumerable<object>> Delete(List<VideoListDetailParam> param)
        {
            try
            {
                var res = _service.Delete(param);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }
    }

}
