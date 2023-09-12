using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using webapi.Models;
using System.Diagnostics;
using MySql.Data.MySqlClient;
using System.Globalization;
using Microsoft.Data.SqlClient;
using Microsoft.AspNetCore.Authorization;

namespace webapi.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Index(string topic = "All", string sortBy = "newest")
        {
            // Get all articles from the database
            List<Article> articles = GetArticlesFromDatabase();

            if (!string.IsNullOrEmpty(topic) && topic != "All")
            {
                articles = articles.Where(a => a.Topic.Contains(topic)).ToList();
            }

            switch (sortBy)
            {
                case "newest":
                    articles = articles.OrderByDescending(a => a.Published).ToList();
                    break;
                case "oldest":
                    articles = articles.OrderBy(a => a.Published).ToList();
                    break;
            }

            return Ok(articles);
        }

        private List<Article> GetArticlesFromDatabase(bool ascending = true)
        {
            // Connection string for MySQL database
            string connStr = "server=localhost;user=root;database=newsextractdb;port=3306;password=1324";

            // SQL query to retrieve data from database
            string sql = "SELECT title, summary, link, published, topic FROM news";

            // Create a list to hold Article objects
            List<Article> articles = new List<Article>();

           /* using (MySqlConnection conn = new MySqlConnection(connStr))
            {
                using (MySqlCommand cmd = new MySqlCommand(sql, conn))
                {
                    conn.Open();
                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        // Loop through each row in the result set and create an Article object from the data
                        while (reader.Read())
                        {
                            Article article = new Article();
                            article.Title = reader.GetString("title");
                            article.Summary = reader.GetString("summary");
                            article.Link = reader.GetString("link");
                            article.Published = reader.GetDateTime("published");
                            article.Topic = new List<string>(reader.GetString("topic").Split(", ").Distinct().ToList());
                            articles.Add(article);
                        }
                    }
                }
            }
           */
            return articles;
        }

        [HttpGet("Privacy")]
        public IActionResult Privacy()
        {
            return Ok();
        }

        [HttpGet("Error")]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return Ok(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
