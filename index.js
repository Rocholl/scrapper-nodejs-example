import axios from "axios";
import cheerio from "cheerio";
const toScrap = await axios("https://www.hiperdino.es/").then((response) => {
  const htmlData = response.data;
  const $ = cheerio.load(htmlData);
  let toScrap = [
    {
      category: "",
      type: [{}],
    },
  ];
  $(".category-group--container").map(function () {
    let categoryContainer = {
      category: "",
      type: [{ name: "", link: "" }],
    };
    let category = $(this)
      .children(".category-group__header")
      .children(".category-group__header--container")
      .children(".menu__text")
      .text();
    categoryContainer.category = category;
    let types = $(this)
      .children(".category-group__content")
      .children(".category__list")
      .children(".sidebar-item--wrapper")
      .children(".link--wrapper");
    types.each(function (i, elem) {
      let type = {
        name: $(elem).text().trim(),
        link: $(elem).attr("href").trim(),
      };
      categoryContainer.type.push(type);
    });
    toScrap.push(categoryContainer);
  });

  return toScrap;
});
async function scrapPage(url) {
  if (url) {
    await axios(url).then((response) => {
        console.log(url)
      const htmlData = response.data;
      const $ = cheerio.load(htmlData);
      let products = $(".action-container").map(function () {
        console.log($(this).attr("data-all"));
        
      });
    });
  }
}
function scrapAll() {
  toScrap.forEach((cat) => {
    cat.type.forEach((type) => {
        if(type.link){
       scrapPage(type.link);
       }
    });
  });
}
scrapAll();
