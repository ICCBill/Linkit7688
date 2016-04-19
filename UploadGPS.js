var request = require('request');
var gpx2js = require('gpx2js');
var delay = require('delay');

const base_url = 'https://locationtracker-web.herokuapp.com/api/v1/location?api_key=a185b53a1e11061d810adc79dd6f60dd';
var   url;
var lengthgps;
var gpxtmp;
var c=0;
var i = 0;   

gpx2js.convert('RK_gpx_2016-04-17_0601.gpx', function (gpxtmp) {
    JSON.stringify(gpxtmp, null, 4);
    lengthgps = Object.keys(gpxtmp.tracks[0].segments[0].points).length;
    console.log(lengthgps);

    function myLoop() {             //  create a loop function

        setTimeout(function () {    //  call a 3s setTimeout when the loop is called
            //console.log('hello');    //  your code here
            url = base_url + "&lat=" + gpxtmp.tracks[0].segments[0].points[i].lat + "&lng=" + gpxtmp.tracks[0].segments[0].points[i].lon;
          
            request.post(url, function (error, httpResponse, body) {
                if (!error && httpResponse.statusCode == 200) {
                    console.log("Oook! it write data up"+c);
                    c++;
                }
                else {
                    console.log(A_A);
                }
            });                      
            
            i+=5;                     //  increment the counter
            if (i < lengthgps) {            //  if the counter < 10, call the loop function
                myLoop();             //  ..  again which will trigger another 
            }                        //  ..  setTimeout()

        }, 500)
    }
    
    myLoop();

});
