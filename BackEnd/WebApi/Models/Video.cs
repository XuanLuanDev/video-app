using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WebApi.Models
{
    public class Video
    {
        [Key]
        [StringLength(80)]
        [Required]
        public string Id { get; set; }
        [Required]
        [StringLength(255)]
        public string Title { get; set; }
        [Required]
        public string Url { get; set; }
        public string Cover { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public Nullable<DateTime> DeletedOn { get; set; }
    }
}
