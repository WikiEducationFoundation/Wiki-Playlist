/* Wiki Search
--------------------------------------------- */

const superagent = require('superagent');
let jsonp = require('superagent-jsonp');

const wiki_api = "https://en.wikipedia.org/w/api.php?action=";
const opensearch = `${wiki_api}opensearch&prop=pageimages|pageterms&format=json&limit=99&redirects=resolve&search=`
const query_titles = `${wiki_api}query&prop=pageimages|pageterms|info|content|extracts&exintro=&explaintext=&inprop=url&format=json&piprop=thumbnail&pilimit=`
const terms_description_titles = "&wbptterms=description&titles="
const redirects = "&redirects="

export function search(query, callback) {
  var encoded_query = encodeURIComponent(query);
  superagent(opensearch + encoded_query)
  .use(jsonp)
  .end((err, res) => {
    if(err) {
      console.log('error fetching search', err);
    } else {
      searchTitles(res.body[1])
    }
  })

  function searchTitles(titles) {
    var _redirects = {};
    var articles;
    var encoded_titles = [];
    titles.map(title => {
      encoded_titles.push(encodeURIComponent(title));
    })
    superagent(query_titles + titles.length + terms_description_titles + encoded_titles.join('|') + redirects).use(jsonp)
    .end((err, res) => {
      if(err) {
        console.log('error fetching titles', err);
      } else {
        const {pages} = res.body.query;
        if(pages !== undefined) {
          articles = _.values(pages);
        }
        orderResults(titles, articles)
      }
    })
  }

  function orderResults(titles, results) {
    let ordered_results = [];
    titles.map(title => {
      let found = _.find(results, {title: title});
      if(found !== undefined) {
        ordered_results.push(found);
      }
    });
    callback(ordered_results);
  }
}

export function fetchArticleSummary(title) {
  const query_article_summary = `${wiki_api}query&prop=extracts&exintro=&explaintext=&format=json&titles=`;
  return $.ajax({
    url: `${query_article_summary}${title}`,
    jsonp: "callback",
    dataType: "jsonp"
  })
}

// Fetch Article images
const exclude_images = require('../data/exclude_images');
const query_article_images = `${wiki_api}query&redirects&generator=images&list=allimages&prop=imageinfo&&iiprop=url|extmetadata|metadata|commonmetadata&iiurlwidth=600&gimlimit=100&format=json&titles=`

export function fetchArticleImages(title, callback,) {
  superagent(query_article_images + title)
  .use(jsonp)
  .end((err, res) => {
    if(err) {
      console.log('error fetching article images', err);
    } else {
      const imageObjects = _.values(res.body.query.pages);
      let images = [];
      imageObjects.map(obj => {
        let image = { url: ''}
        if(obj.imageinfo !== undefined && obj.imageinfo.length) {
          const {thumburl} = obj.imageinfo[0];
          image.url = thumburl
        }
        
        var exclude = false
        exclude_images.map(exl => {
          if(image.url.indexOf(exl) !== -1) {exclude = true;}
        });

        if(!exclude && image.url !== '') {
          images.push(image);
        }
        
      });
      callback(images);
    }
  })
}