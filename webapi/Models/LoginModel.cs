using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class LoginModel
    {
        [Required(ErrorMessage = "User Email is required")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
       
    }
}