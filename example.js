import axios from "axios";
import cheerio from "cheerio";

await axios("https://news.ycombinator.com/jobs").then((response) => {
  const htmlData = response.data;
  const $ = cheerio.load(htmlData);
  let jobs = $(".titlelink")
    
    .map(function () {
        
        return $(this).text()
    });
    console.log(jobs[0])
});
const nextPage =async (href)=>{
    
}