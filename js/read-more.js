(function() {

  var readMore = {
    selectAllContent: document.querySelectorAll(".article-content"),
    selectReadMoreBtn: document.querySelectorAll(".read-more"),
    getParagraphArr: function() {
      var text = Array.prototype.slice.call(this.selectAllContent);
      return text;
    },
    getFullContent: function() {
      var arrLength = this.getParagraphArr(),
          getString = [];
      for ( var i = 0; i < arrLength.length; i++  ) {
        getString.push(arrLength[i].innerHTML);
      }
      return getString;
    },
    storeFullContent: [],
    storeExcerpt: [],
    displayExcerpt: function() {
      var arrLength = this.getParagraphArr();
      for ( var i = 0; i < arrLength.length; i++  ) {
        var convertToArr = this.getFullContent()[i].split(" "),
            sliceArr = convertToArr.slice(0, 80);
        arrLength[i].classList.add("show-excerpt");
        this.storeFullContent.push(convertToArr);
        arrLength[i].innerHTML = sliceArr.join(" ") + "...";
        this.storeExcerpt.push(arrLength[i].innerHTML);
      }
    },
    showFullContent: function() {
      var _this = this;
      for (var i = 0; i < this.selectReadMoreBtn.length; i++) { //closure to find clicked button
       ( function(index) {
         _this.selectReadMoreBtn[i].onclick = function() {
             var buttonSiblings = this.parentNode.childNodes,
                writeToParagraph = _this.getParagraphArr()[index];
                buttonSiblings = Array.prototype.slice.call(buttonSiblings);
        if ( this.classList.contains("show-less") ) {
          this.innerHTML = "Read more";
          this.classList.remove("show-less");
          _this.getFullContent();
          writeToParagraph.innerHTML = _this.storeExcerpt[index];
        } else {
          for ( var j = 0; j < buttonSiblings.length; j++ ) {
            if ( buttonSiblings[j].nodeType === 1 ) {
              if ( buttonSiblings[j].classList.contains("show-excerpt") ) {
                this.innerHTML = "Show less";
                this.classList.add("show-less");
                writeToParagraph.innerHTML = _this.storeFullContent[index].join(" ");
              }
            }
          }
        }
        return false;
      }
       })(i);
      }
    },
    init: function() {
      this.getFullContent();
      this.displayExcerpt();
      this.showFullContent();
    }
  }
  readMore.init();

})()
