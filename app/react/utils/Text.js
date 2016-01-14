export function truncateHTML(s, l){
  if(s.length <= l){
      return s;
  } else {
      var ts = "";
      var subs = s.split('&');
      if(subs[0].length > l){
          return subs[0].substring(0, l) + "&hellip;";
      } else {    
          ts = ts + subs[0];
      }
      for(var i = 1; i < subs.length; i++){
          var end = subs[i].indexOf(';');
          l += end + 1;
          ts = ts + '&' + subs[i];
          if(ts.length >= l){
              return ts.substring(0,l) + "&hellip;";
          }
      }
      return ts;
  }
}

export function stripTags(string){
  return string.replace(/(<([^>]+)>)/ig,"");
}