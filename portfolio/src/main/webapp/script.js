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


var images = ["/images/blueflowers.jpg","/images/fluffy.jpg","/images/pinkflowers.jpg","/images/pinkrose.jpg","/images/yellowflowers.jpg","/images/purpleback1.jpg"];

//Onload Functions to be called
function onLoadFuncs(){
    getJson();
    createMap();
    initializeAccordian();
    initializeAnimate();
    splitView();
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

var idName = "";
function initializeAccordian(){
    //slider width val formula: ( (Number of images - 1) * 50px ) + 335px
    var wid = ((images.length-1)*50)+335;
    document.getElementById("ia-container").style.width = wid.toString()+ "px";
    for (var i = 1, len = images.length; i < len; i++){
        var figure = document.createElement('figure');
        figure.id = "figure" + (i+1);

        var img = document.createElement('img');
        img.src = images[i];
        img.className = "fig";
        var num = i < 10 ? "0"+i : i;
        img.alt = "image" + num;
        figure.appendChild(img);

        var input = document.createElement('input');
        input.type = "radio";
        input.name = "radio-set"
        input.id = (i+1).toString();
        input.className = "check"
        if (i == len-1) { input.id = "ia-selector-last"; }
        figure.appendChild(input);

        document.getElementById("figure"+i).appendChild(figure);
    }

    //Automatically show next image in gallery every 5 seconds    
    setInterval(function(){var id = $('.check:checked').attr('id');
                            document.getElementById(id).checked = false;
                            if (id == "ia-selector-last"){
                                document.getElementById("1").checked = true;
                                return;
                            }
                            var next = parseInt(id)+1;
                            var greaterThan = (next > images.length) ? 1 : next;
                            var newId = (next == images.length) ? "ia-selector-last" : greaterThan;
                            if (newId == "ia-selector-last"){
                                document.getElementById(newId).checked = true;
                                return;
                            }
                            document.getElementById(newId.toString()).checked = true;
                        },5000);
}

function initializeAnimate(){
    var $cont = document.querySelector('.cont');
    var $elsArr = [].slice.call(document.querySelectorAll('.el'));
    var $closeBtnsArr = [].slice.call(document.querySelectorAll('.el__close-btn'));

    setTimeout(function() {
                        $cont.classList.remove('s--inactive');
                }, 200);

    var flag = false;
    $elsArr.forEach(function($el) {
        $el.addEventListener('click', function() {
            if (!flag){
                flag = true;
                if (this.classList.contains('s--active')) return;
                $cont.classList.add('s--el-active');
                this.classList.add('s--active');
            }
        });
    });

    $closeBtnsArr.forEach(function($btn) {
        $btn.addEventListener('click', function(e) {
            flag = false;
            e.stopPropagation();
            $cont.classList.remove('s--el-active');
            document.querySelector('.el.s--active').classList.remove('s--active');
        });
    });
}

function splitView () {
    var parent = document.querySelector('.splitview'),
        topPanel = parent.querySelector('.top'),
        handle = parent.querySelector('.handle'),
        skewHack = 0,
        delta = 0;

    // If the parent has .skewed class, set the skewHack var.
    if (parent.className.indexOf('skewed') != -1) {
        skewHack = 1000;
    }

    parent.addEventListener('mousemove', function(event) {
        // Get the delta between the mouse position and center point.
        delta = (event.clientX - window.innerWidth / 2) * 0.5;

        // Move the handle.
        handle.style.left = event.clientX + delta + 'px';

        // Adjust the top panel width.
        topPanel.style.width = event.clientX + skewHack + delta + 'px';
    });
    parent.addEventListener('mousedown', function(event) {
        window.location.hash = "#act";
    });
}

function requestTranslation($val) {
        const languageCode = $val;
        var allContent = document.documentElement.innerHTML;
        const params = new URLSearchParams();
        params.append('text', allContent);
        params.append('languageCode', languageCode);
        fetch('/translate', {
          method: 'POST',
          body: params
        }).then(response => response.json()).then((jsonObject) =>{
        for (str in jsonObject){
            document.documentElement.innerHTML = (jsonObject[str]);
        }
        onLoadFuncs();
      });
}
