/* -----------------------------------------------
					Js Main
--------------------------------------------------
    Template Name: BOX
--------------------------------------------------

----------------------------------- */
(function ($) {
    "use strict";
    var mymap = L.map('mapid', {
        zoomControl: false
    }).setView([0, 0], 13);

    var greenIcon = L.icon({
        iconUrl: './images/icon-location.svg',

        iconSize: [30, 50], // size of the icon
        iconAnchor: [30, 50], // point of the icon which will correspond to marker's location
    });

    var myModal = new bootstrap.Modal(document.getElementById('error'));


    function showMap(lat, lng) {

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
        }).addTo(mymap);

        mymap.panTo([lat, lng]);

        var marker = L.marker([lat, lng],{icon: greenIcon}).addTo(mymap);




    }

    function getIp(domainIP = "", searchParam = "") {
        $(".loading").show();
        const ip = "https://geo.ipify.org/api/v1?apiKey=at_TBKWxnKTxV2ZdHvGovxxkctmjm5zv" + domainIP + searchParam;
        $.getJSON(ip)
            .done(function (result) {
                $("#ip").text(result.ip);
                $("#location").text(result.location.city);
                $("#timezone").text(result.location.timezone);
                $("#isp").text(result.isp);
                showMap(result.location.lat, result.location.lng);
                $(".loading").hide();
            })
            .fail(function () {
                $(".loading").hide();
                myModal.show();
            })
    }

    function searchip() {
        $("form button").on("click", function (e) {
            e.preventDefault();
            const searchParam = $("form input").val();
            const numbers = /[0-9]/g;
            const letters = /[a-zA-Z]/g;

            if (numbers.test(searchParam) && letters.test(searchParam)) {
                myModal.show();
            } else if (letters.test(searchParam)) {
                getIp("&domain=", searchParam)
            } else if (numbers.test(searchParam)) {
                getIp("&ipAddress=", searchParam)

            } else {
                myModal.show();
            }


        })
    }


    $(document).ready(function () {

        getIp();
        searchip();
    });

})(jQuery);
