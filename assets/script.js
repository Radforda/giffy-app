
      var topics = ["Purple", "Blue", "Green", "Yellow"];

      function displaygiphyInfo() {
        
    
        var key="fVcWItoUbVFOotQbd6sGdDBxa59lKTSE";
        var searchTerm=$(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=fVcWItoUbVFOotQbd6sGdDBxa59lKTSE&q="+searchTerm+"&limit=10&offset=0&rating=G&lang=en";

        $.ajax({
          url:queryURL,
          method:"GET"
        }).then(function(response){
          console.log(response);
          $("#giphy-view").text("");


          for(var i=0;i<10;i++){
          var card=$("<div class='card imageCard'style='width: 18rem;'>");
          var cardBody=$("<div class=card-body>")
          
          var c=$("<p class='card-text'>");
          c.text("rating: "+response.data[i].rating);
          var b=$("<h5 class='card-title'>");
          b.text(response.data[i].title);
         
          var e=$("<img class='card-img-top'>");
          e.attr("data-alt", response.data[i].images.fixed_width.url);
          e.attr("class", "giphyImage")
          e.attr("src",response.data[i].images.fixed_width_still.url);
          
          cardBody.append(b).append(c);
          card.append(e).append(cardBody);
          $("#giphy-view").prepend(card);
        };

        });
        
    
      }


      $(document).on("click", ".giphyImage",function(){

          console.log('click');
          var toggle1=$(this).attr("src");
          var toggle2=$(this).attr("data-alt");
          $(this).attr("src",toggle2);
          $(this).attr('data-alt', toggle1)
          console.log('animating gif at '+toggle2);
      })
      // Function for displaying giphy data
      function renderButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {

          var a = $("<button>");
          a.addClass("giphy");
          a.attr("data-name", topics[i]);
          a.text(topics[i]);
          $("#buttons-view").append(a);
        }
      }

      $("#add-giphy").on("click", function(event) {
        event.preventDefault();
        var giphy = $("#giphy-input").val().trim();
        topics.push(giphy);
        renderButtons();
      });
      $(document).on("click", ".giphy", displaygiphyInfo);
      renderButtons();
