'use strict';

$(function () {
  if ($('#local-search').size()) {
    const path = "/search.json";
    const search_id = "local-search-input";
    const content_id = "local-search-result";
    const BTN = "<button type='button' class='local-search-close' id='local-search-close'></button>";
    $.ajax({
      url: path,
      dataType: "json",
      success: function (response) { // get the contents from search data
        const $input = document.getElementById(search_id);
        const $resultContent = document.getElementById(content_id);
        console.log(response)

        $input && $input.addEventListener('input', function () {
          var str = '<ul class="search-result-list">';
          var keywords = this.value.trim().toLowerCase().split(/[\s]+/);
          $resultContent.innerHTML = "";
          if (this.value.trim().length <= 0) {
            return;
          }
          // perform local searching
          response.forEach(function (data) {
            var isMatch = true;
            // var content_index = [];
            if (!data.title || data.title.trim() === '') {
              data.title = "Untitled";
            }
            var data_title = data.title.trim().toLowerCase();
            var data_content = data.content.trim().replace(/<[^>]+>/g, "").toLowerCase();
            var data_url = data.url;
            var index_title = -1;
            var index_content = -1;
            var first_occur = -1;
            // only match artiles with not empty contents
            if (data_content !== '') {
              keywords.forEach(function (keyword, i) {
                index_title = data_title.indexOf(keyword);
                index_content = data_content.indexOf(keyword);

                if (index_title < 0 && index_content < 0) {
                  isMatch = false;
                } else {
                  if (index_content < 0) {
                    index_content = 0;
                  }
                  if (i == 0) {
                    first_occur = index_content;
                  }
                  // content_index.push({index_content:index_content, keyword_len:keyword_len});
                }
              });
            } else {
              isMatch = false;
            }
            // show search results
            if (isMatch) {
              str += "<li><a href='" + data_url + "' class='search-result-title'>" + data_title + "</a>";
              var content = data.content.trim().replace(/<[^>]+>/g, "");
              if (first_occur >= 0) {
                // cut out 100 characters
                var start = first_occur - 20;
                var end = first_occur + 80;

                if (start < 0) {
                  start = 0;
                }

                if (start == 0) {
                  end = 100;
                }

                if (end > content.length) {
                  end = content.length;
                }

                var match_content = content.substr(start, end);

                // highlight all keywords
                keywords.forEach(function (keyword) {
                  var regS = new RegExp(keyword, "gi");
                  match_content = match_content.replace(regS, "<em class=\"search-keyword\">" + keyword + "</em>");
                });

                str += "<p class=\"search-result\">" + match_content + "...</p>"
              }
              str += "</li>";
            }
          });
          str += "</ul>";
          if (str.indexOf('<li>') === -1) {
            return $resultContent.innerHTML = BTN + "<div class=\"search-result-empty\"><p><i class=\"fe fe-tired\"></i> 没有找到内容，更换下搜索词试试吧~<p></div>";
          }
          $resultContent.innerHTML = BTN + str;
        });
      }
    });
    $(document).on('click', '#local-search-close', function () {
      $('#local-search-input').val('');
      $('#local-search-result').html('');
    });
  }
})