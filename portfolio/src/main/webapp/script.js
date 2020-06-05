// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var slideIndex = 1;
var images = ["/images/blueflowers.jpg","/images/fluffy.jpg","/images/pinkflowers.jpg","/images/pinkrose.jpg","/images/yellowflowers.jpg","/images/purpleback1.jpg"];

//Onload Functions to be called
function onLoadFuncs(){
    getJson();
    createMap();
    initializeGallery();
    showSlides(slideIndex);
}

/** Creates a map and adds it to the page. */
function createMap() {
  var projectPlace = ["MIT", "Wellesley"];
  var projectCoord = [[42.360091, -71.09416],[42.293573,-71.305928]];
  var projectName = ['Real-Time Embedded System','2016 United States Election: Analysis of Russian Accounts on Twitter'];
  var projectInfo = ['<h1> Real-Time Embedded System </h1>'+
                            '<p> Collaborated with peer in developing concurrent real-time embedded microcontroller system in C, controlling two robot arms which respond to incoming MIDI encoded audio with mirroring movements</p>' +
                            '<p> Implemented FreeRTOS tasks and ensured overall thread safety by utilizing mutex locks and task notifications</p>','<h1> 2016 United States Election: Analysis of Russian Accounts on Twitter </h1>'+
                          '<p> Investigated data collected by Wellesley College’s TwitterTrails.com regarding stories promoted by Russian accounts on Twitter </p>' +
                          '<p> Developed and implemented a Graph interface with depth-first search and breadth-first search functionality </p>' +
                          '<p> Determined most active and central Russian accounts, and most propagated story </p>'];
  for (var i = 0, len = projectPlace.length; i < len; i ++){
    var div = document.createElement('div');
    div.className = 'map'
    div.id = projectPlace[i];
    document.getElementById("maps").appendChild(div);
    var map = new google.maps.Map(
                                        div,
                                        {
                                            center: {
                                                        lat: projectCoord[i][0], 
                                                        lng: projectCoord[i][1]
                                                    }, 
                                            zoom: 10
                                        }
                                    );
            
      var marker = new google.maps.Marker(
                                            {
                                                position: 
                                                            {
                                                                lat: projectCoord[i][0],
                                                                lng: projectCoord[i][1]
                                                            },
                                                map: map,
                                                title: projectName[i]
                                            }
                                        );

        map.addListener('center_changed', function() {
    // 6 seconds after the center of the map has changed, pan back to the
    // marker.
    window.setTimeout(function() {
      map.panTo(marker.getPosition());
    }, 6000);
  });

      var infowindow = new google.maps.InfoWindow(
                                                    {
                                                        content: projectInfo[i]
                                                    }
                                                );
                        
    
      infoWindowMarker(map, marker, infowindow);

  }

}

function infoWindowMarker(map, marker, infowindow){
    
    marker.addListener('click', function() 
                                            {
                                                map.setZoom(14);
                                                map.setCenter(marker.getPosition());
                                                infowindow.open(map, this);
                                            } 
                        );
}

//Funtion for page tabs
function openInfo(evt, info){
    //Get all elements with tabcontent
    var tabcontent = document.getElementsByClassName("tabcontent");

    //Hide the content
    for (var i = 0; i < tabcontent.length; i++){
        tabcontent[i].style.display = "none";
    }

    //Get all elements with tablinks
    var tablinks = document.getElementsByClassName("tablinks");

    //And remove the class active (because inactive unless clicked)
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    //Display the current tab
    document.getElementById(info).style.display = "block";
    //Mark as active
    evt.currentTarget.classList.add("active");
}


function getJson(){
    fetch('/comment').then(response => response.json()).then((jsonObject) =>{
        const facts = document.getElementById("history");
        facts.innerHTML = "";
        for (str in jsonObject){
            const liElement = document.createElement('li')
            liElement.innerText = jsonObject[str];
            facts.append(liElement);
        }
    });
    
}

function openForm() {
  const form = document.getElementById("msgForm");
  const bton = document.getElementsByClassName("open-button")[0];
  if (form.style.display == "block") {
      form.style.display = "none";
      bton.innerHTML = "Open Comment Box";

      }
  else{
    form.style.display = "block";
    bton.innerHTML = "Close Comment Box";
  }
}

function closeForm() {
  document.getElementById("msgForm").style.display = "none";
}


//Slides
function initializeGallery(){

for (var i = 0, len = images.length; i < len; i++){
    var mySlides = document.createElement('div');
    mySlides.className = "mySlides fade";
    
    var numbertext = document.createElement('div');
    numbertext.className = "numbertext";
    numbertext.innerHTML = (i+1) + " / " + len;
    mySlides.appendChild(numbertext);

    var img = document.createElement('img');
    img.src = images[i];
    img.style.width = "50%";
    mySlides.appendChild(img);
    document.getElementsByClassName("slideshow-container")[0].appendChild(mySlides)

    dot = document.createElement('span');
    dot.className = "dot";
    dot.onclick = function(){currentSlide(i+1);}
    document.getElementById("show").appendChild(dot);

    }
    //Automatically show next image in gallery every 5 seconds
    setInterval(function(){plusSlides(1);},5000);
}



    // Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}







