using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WebApi.Models
{
    public class VideoModel
    {
        [Required]
        public string title { get; set; }
        [Required]
        public IFormFile cover { get; set; }
        [Required]
        public  IFormFile video { get; set; }
    }
}
