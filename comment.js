$("#submit-comment").click(function(){
    var comment = document.querySelector("#comment-text").value;
    var container = document.querySelector("#comment-container");    
        var sample = document.createElement("div");
    
        sample.innerHTML = 
        ` 
        <div class = "sample-comment">
        <div class="user">
          <a class="prof-pic" href="#">
            <img src="images/sample2.jpg">
          </a>
          <div class="prof-name" id="prof-name">Leo Jones</div>
        </div>
        <div class="comment-text" id="comment-text">
          <p> ${comment}
          </p>
        </div>
      </div>`
        container.appendChild(sample);
    
});
