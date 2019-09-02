 $(".search").on("submit", function(e){
   e.preventDefault();
  let loader = document.createDocumentFragment();
  let loading = document.createElement('div');
  $(loading).addClass('loader');
  $(loading).html('Loading...')
  loader.append(loading)
  $('#results').html(loader)

  let q = $('input[name="search"]').val();

    let promise = $.ajax({
      type: 'GET',
      url: 'https://www.reddit.com/r/' + q + '.json'
    })

    promise.then(function(data) {
      let fragment = document.createDocumentFragment();

      data.data.children.forEach(function(post) {
        let row = document.createElement('div');
        $(row).addClass('row');
        let link = document.createElement('a');
        link.href = post.data.url;
        link.target = '_blank'
        row.append(link);
        let title = document.createElement('h1');
        title.innerHTML = post.data.title;
        link.append(title);
        let score = document.createElement('div');
        $(score).addClass('score');
        score.innerHTML = post.data.score;
        row.append(score);
        let author = document.createElement('div');
        $(author).addClass('author');
        author.innerHTML = post.data.author;
        row.append(author);
        fragment.append(row);
      })

      $('#results').html(fragment)

    }, function() {
	  $('#results').html('That subreddit does not exist')
});
});
