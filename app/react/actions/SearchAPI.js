/* Wiki Search
--------------------------------------------- */

const superagent = require('superagent');
let jsonp = require('superagent-jsonp');

const wiki_api = "https://en.wikipedia.org/w/api.php?action=";
const generator = `${wiki_api}query&formatversion=2&format=json&generator=prefixsearch&gpslimit=99&prop=pageimages|pageterms|info&inprop=url&piprop=thumbnail&pithumbsize=50&pilimit=99&redirects=&wbptterms=description&gpssearch=`
const redirects = "&redirects="

let pendingSearch;

export function search(query, callback) {
  if (pendingSearch) {
    pendingSearch.cancel();
  }

  var encoded_query = encodeURIComponent(query);

  pendingSearch = superagent(generator + encoded_query)
  .use(jsonp)
  .end((err, res) => {
    if(err) {
      console.log('error fetching search', err);
    } else {
      if (res.body.query && res.body.query.pages) {
        res.body.query.pages = _.sortBy(res.body.query.pages, 'index')
        callback(res.body.query.pages)
      } else {
        callback()
      }
    }
  })
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
  const url = query_article_images + title;

  let imageObjects = [];

  var getImages = function(url) {
    console.log(url)
    superagent(url)
    .use(jsonp)
    .end((err, res) => {
      if(err) {
        console.log('error fetching article images', err);
      } else {
        const continueObj = res.body.continue;
        imageObjects = imageObjects.concat(_.values(res.body.query.pages));
        if(continueObj !== undefined && continueObj.iicontinue !== undefined) {
          getImages(url + '&continue=' + continueObj.continue + '&iicontinue=' + continueObj.iicontinue);
        } else {
          filterImages(imageObjects);
        }
      }
    });
  }

  getImages(url);

  var filterImages = function(imageObjects) {
    console.log(imageObjects)
    let images = [];
    imageObjects.map(obj => {
      let image = { url: ''}
      if(obj.imageinfo !== undefined && obj.imageinfo.length) {
        const {thumburl} = obj.imageinfo[0];
        image.url = thumburl
      }

      var exclude = false;
      exclude_images.map(exl => {
        if(image.url.indexOf(exl) !== -1) {exclude = true;}
      });

      if(!exclude && image.url !== '') {
        images.push(image);
      }
    });
    callback(images);
  }
}
