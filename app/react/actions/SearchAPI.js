/* Wiki Search
--------------------------------------------- */

const superagent = require('superagent');
let jsonp = require('superagent-jsonp');

const wiki_api = "https://en.wikipedia.org/w/api.php?action=";

const SEARCH_MAX_RESULTS = 50
const SEARCH_THUMBNAIL_WIDTH = 100

let pendingSearch;

export function search(query, callback) {

   const params = {
     formatversion: 2,
     format: 'json',
     action: 'query',
     generator: 'prefixsearch',
     gpssearch: query,
     gpsnamespace: 0,
     gpslimit: SEARCH_MAX_RESULTS,
     prop: 'pageterms|pageimages|info',
     inprop: 'url',
     piprop: 'thumbnail',
     wbptterms: 'description',
     pithumbsize : SEARCH_THUMBNAIL_WIDTH,
     pilimit: SEARCH_MAX_RESULTS,
     redirects: 'resolve'
  }

  if (pendingSearch) {
    pendingSearch.cancel();
  }

  pendingSearch = superagent(wiki_api)
  .use(jsonp)
  .query(params)
  .end((err, res) => {
    pendingSearch = null
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
    url: `${query_article_summary}${encodeURIComponent(title)}`,
    jsonp: "callback",
    dataType: "jsonp"
  })
}

// Fetch Article images
const commons_url = 'https://commons.wikimedia.org/wiki/';
const exclude_images = require('../data/exclude_images');
const query_article_images = `${wiki_api}query&redirects&generator=images&list=allimages&prop=imageinfo&&iiprop=url|extmetadata|metadata|commonmetadata&iiurlwidth=600&gimlimit=100&format=json&titles=`

export function fetchArticleImages(title, callback,) {
  const url = query_article_images + encodeURIComponent(title);

  let imageObjects = [];

  var getImages = function(url) {
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
    let images = [];
    if(imageObjects.length) {
      imageObjects.map(obj => {
        let image = { url: ''}
        
        if(obj.imageinfo !== undefined && obj.imageinfo.length) {
          const {thumburl} = obj.imageinfo[0];
          image.url = thumburl;
          image.commons_url = commons_url + obj.title;
        }
        const meta = _.get(obj, 'imageinfo[0].extmetadata', null);
        if(meta) {
          image.attribution_required = _.get(meta, 'AttributionRequired.value', false) === 'true';
          image.credit = _.get(meta, 'Credit.value', null);
          image.license_url = _.get(meta, 'LicenseUrl.value', null);
          image.license = _.get(meta, 'LicenseShortName.value', null);
        }

        var exclude = false;
        exclude_images.map(exl => {
          if(image.url.indexOf(exl) !== -1) {exclude = true;}
        });

        if(!exclude && image.url !== '') {
          images.push(image);
        }
      });

    }

    images.push({
      url: '//w-playlist.s3.amazonaws.com/images/lightbulb.png',
      commons_url: 'https://meta.wikimedia.org/wiki/File:Lightbulb_mark.svg'
    });

    callback(images);
  }
}
