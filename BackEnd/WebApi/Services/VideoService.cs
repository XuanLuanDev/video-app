using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Services
{
    public interface IVideoService
    {
        public  Task<bool> UploadFile(VideoModel video);
        public IEnumerable<object> GetList();
    }
    public class VideoService: IVideoService
    {
        private readonly ApiDbContext _context;

        public VideoService(ApiDbContext context)
        {
            this._context = context;
        }
        public async Task<bool> UploadFile(VideoModel video)
        {
            if (video != null && CheckIfVideoFile(video.video))
            {
              return  await Create(video);
            }
            else
            {
                return false;
            }
        }
        private bool CheckIfVideoFile(IFormFile file)
        {
            var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
            List<string> videoExt = new List<string>() { ".mp4", ".avi", ".flv", ".wmv", ".mov" };
            return videoExt.IndexOf(extension?.ToLower()) >= 0;
        }

        private async Task<bool> Create(VideoModel video)
        {
            bool isSaveSuccess = false;
            try
            {
                var file = video.video;
                var videoUrl = await WriteFile(file, "Videos");
                var coverUrl = await WriteFile(video.cover);
                Video vd = new Video();
                vd.Title = video.title;
                vd.Url = videoUrl;
                vd.Cover = coverUrl;
                vd.Id = Guid.NewGuid().ToString("N");
                vd.UpdatedOn = DateTime.Now;
                vd.CreatedOn = DateTime.Now;
                _context.Videos.Add(vd);
                await _context.SaveChangesAsync();
                isSaveSuccess = true;
            }
            catch (Exception e)
            {
                //log error
            }

            return isSaveSuccess;
        }

        private static async Task<string> WriteFile(IFormFile file, string folder = "Images")
        {
            var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
            string fileName = DateTime.Now.Ticks + extension; //Create a new Name for the file due to security reasons.
            string folderName = Path.Combine("Resources", folder);
            var pathBuilt = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            if (!Directory.Exists(pathBuilt))
            {
                Directory.CreateDirectory(pathBuilt);
            }

            var path = Path.Combine(Directory.GetCurrentDirectory(), pathBuilt,
               fileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return folderName + "/" + fileName;
        }

        public IEnumerable<object> GetList()
        {
            return (from vd in _context.Videos
                    select new
                    {
                      id=  vd.Id,
                      title =  vd.Title,
                      cover =vd.Cover,
                      url = vd.Url
                    }
                    ).ToList();
        }
        
    }
}
