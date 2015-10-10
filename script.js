
function domobj(){
  var self        =this;
  self.products   = [];

  self.getproducts = function(url){
    $.getJSON(url, function(response){
        for(i=0; i<response.sales.length ; i++){
          self.products.push( new productobj(response.sales[i], i)  );
        }
    });
  }
    
  self.updateproducthtml = function(){
    var template  = getTemplate(); // instead of multiple class , declaring template variable and storing on product data in the template

    for( i=0; i< self.products.length ; i++){
      self.products[i].updatehtml(template); // calling template object to updatehtml
    }
  }
  
  self.updatedom = function(){
    var i=0
    thishtml='';
    for( i=0; i< self.products.length ; i++){
      if (i % 3 == 0 ){  thishtml += "<div class='row'>"; console.log("START") }
      thishtml += self.products[i].htmlview;
      if ((i % 3 == 2) || i == (self.products.length-1) ){thishtml += "</div>";console.log("FINISH")}
    }
    $("#content").append(thishtml)
  }
  
}

function productobj(product, i){
  var self          = this;
  self.description  = product.description // calling description from json
  self.photo        = product.photos.medium_half
  self.title        = product.name
  self.tagline      = product.tagline
  self.url          = product.url
  self.htmlview     = ""
  self.index        = i
  self.custom_class = "col"+ ((i % 3) +1)
  
  self.updatehtml= function(tmpl){
    //$.get('product-template.html', function(template){
      self.htmlview = tmpl.replace('{image}', self.photo).replace('{title}', self.title).replace('{tagline}', self.tagline).replace('{url}', self.url).replace('{custom_class}', self.custom_class).replace('{description}', self.description);
    //});
  }
}


function getTemplate( ) //writing an ajax call for getting the data from json file
{
     var result = null;
     var scriptUrl = "product-template.html";
     $.ajax({
        url: scriptUrl,
        type: 'get',
        dataType: 'html',
        async: false,
        success: function(data) {
            result = data;
        } 
     });
     return result;
}

function overlay() // mouse over overlay function for show & hide the description
{
  jQuery(".product-container").on("mouseover", function(event) {
     jQuery(this).find(".desc1").css({"display":"block"});
  });

$( ".desc_close" ).on( "click", function(e){
	$(this).parents(".desc1").hide(500); // hide the description, view after 500 mil.seconds
	//$( this ).parents(".desc1").remove(); // this is for remove the description permanently, again when page refresh  content will load on mouseover

  });
}


var page=new domobj();
page.getproducts('data.json');
setTimeout("console.log('building html');page.updateproducthtml();",10);
setTimeout("page.updatedom();overlay()",20) // overlay function will show the description on mouse over, and click on X, hiding the div content. 







