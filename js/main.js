document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(){
// get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }


  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  if(localStorage.getItem('bookmarks') === null){
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  }

  document.getElementById('myForm').reset();

  fetchBookmarks();
}

function deleteBookmark(url){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for(var i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url === url){
      bookmarks.splice(i, 1);
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
  }

}

function fetchBookmarks(){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  var bookmarkResults = document.getElementById('bookmarkResults');

  bookmarkResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarkResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-defalut" target="_blank" href="'+url+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +

                                  '</h3>'+
                                  '</div>';
  }
}
