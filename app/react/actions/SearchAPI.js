/* Wiki Search
--------------------------------------------- */

const superagent = require('superagent');
let jsonp = require('superagent-jsonp');

const wiki_api = "https://en.wikipedia.org/w/api.php?action=";
const opensearch = `${wiki_api}opensearch&prop=pageimages|pageterms&format=json&limit=99&search=`
const query_titles = `${wiki_api}query&prop=pageimages|pageterms|info|content|extracts&exintro=&explaintext=&inprop=url&format=json&piprop=thumbnail&pilimit=`
const terms_description_titles = "&wbptterms=description&titles="
const redirects = "&redirects="

export function search(query, callback) {
  superagent(opensearch + query)
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

    superagent(query_titles + titles.length + terms_description_titles + titles.join('|') + redirects).use(jsonp)
    .end((err, res) => {
      if(err) {
        console.log('error fetching titles', err);
      } else {
        const {pages, redirects} = res.body.query;

        if(pages !== undefined) {
          articles = _.values(res.body.query.pages);
        }

        // if there are redirects lets store the from/to values in an easy to retrieve object of from/to key/vals
        var getRedirects = new Promise((resolve, reject)=>{
          if(redirects !== undefined) {
            
            let redirect_titles = [];

            redirects.map((red) => {
              _redirects[red.from] = red.to;
              redirect_titles.push(red.to);
            });

            console.log('redirect_titles', redirect_titles, redirect_titles.join('|'))

            superagent(query_titles + redirect_titles.length + terms_description_titles + redirect_titles.join('|')).use(jsonp)
            .end((err, res) => {
              var { pages } = res.body.query;
              if(pages !== undefined) {
                console.log('redirect pages', _.values(pages))
                resolve(_.values(pages));
              } else {
                resolve([]);
              }
            });
          } else {
            resolve([]);
          }
        })
      }

      getRedirects.then((redirects)=> {
        // concat the return redirect pages to the first page array and order them by the opensearch titles results
        orderResults(titles, articles.concat(redirects))

      }).catch((reason) => {console.log('error fetching results', reason)});

      // callback([]);
    })
    

    function orderResults(titles, results) {
      let ordered_results = [];
      // console.log(titles, results, _.pluck(results, 'title').join('\n'))
      var foundCount = 0;
      titles.map(title => {
        console.log(title);
        
        var findTitle = title;
        if(_redirects.hasOwnProperty(title)) {
          findTitle = _redirects[title];
          console.log('redirect', findTitle);
        } 
        let found = _.find(results, {title: findTitle});
        if(found !== undefined) {
          foundCount++;
          ordered_results.push(found);
        }

      })
      console.log(foundCount, 'found');
      callback(ordered_results);
    }
  
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