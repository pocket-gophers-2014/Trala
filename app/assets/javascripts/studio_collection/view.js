StudioCollection.View = function(){

}

StudioCollection.View.prototype = {
  renderStudioCollection: function(elementData) {
    $('.container ul').append("<li> Name: " + elementData.name + "Subs: " + elementData.subs + "</li>")
  },

  addUl: function() {
    $('.container').append("<ul>")  
  }

}