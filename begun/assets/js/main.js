//var pass = 'password';
var videoUrl = '';

$(document).ready(function() {
    let passwordForm = document.getElementById("passwordForm");
    passwordForm.addEventListener("submit", (e) => {
        e.preventDefault();
        loadVideoUrl(document.getElementById("sipassword").value);
    });
});

function loadVideoUrl(password)
{
    $.ajax({
		type : "GET",
		url : "assets/unlock/" + password.toLowerCase() + ".json",
		success : function(data) {
            if (defaultVideoTrack == "hotstar")
                videoUrl = data.hotstar;
            else
                videoUrl = data.disneyplus;
            showGranted();
		},
		error : function(jqXHR, textStatus, errorThrown) {
            showFailed();
		}
	});
}

function showGranted()
{
    document.getElementById("password-box").style.display = "none";
    document.getElementById("granted-box").style.display = "block";

    var player = videojs(document.querySelector('.video-js'));
    player.src({
        src: videoUrl,
        type: 'application/vnd.apple.mpegurl'
    });
    player.hide();

    if (analyticsOn)
        loadVideoAnalytics();
    setTimeout(showAccessing, 1800);
}


function showAccessing()
{
    document.getElementById("granted-box").style.display = "none";
    document.getElementById("accessing-box").style.display = "block";
    setVideoSettings();
    startProgressBar();
}

function showFailed()
{
    document.getElementById("password-box").style.display = "none";
    document.getElementById("denied-box").style.display = "block";
    document.getElementById("sipassword").value = '';
    setTimeout(revertToPassword, 2000);
}

function revertToPassword()
{
    document.getElementById("denied-box").style.display = "none";
    document.getElementById("password-box").style.display = "block";
}

function showLoading()
{
    document.getElementById("password-box").style.display = "none";
    document.getElementById("accessing-box").style.display = "none";
    document.getElementById("video-box").style.display = "block";
    setTimeout(playVideo, 1500);
}

function playVideo()
{
    var player = videojs(document.querySelector('.video-js'));
    player.show();
    player.play();
}

function loadVideoAnalytics()
{
    loadScript("assets/js/analytics/video.analytics.provider.js");
}

function setVideoSettings()
{
    var player = videojs(document.querySelector('.video-js'));

    // Set default subtitle track
    var tracks = player.textTracks();

    for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];

        // Find the default captions track and mark it as "showing".
        if (track.kind === 'subtitles' && track.language === defaultSubtitle) {
            track.mode = 'showing';
            console.log("Setting default subtitle on: ", track.language);
        }
    }

    //Set default audio track
    tracks = player.audioTracks();

    for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];

        // Find the default audio track and mark it as "showing".
        if (track.kind === 'alternative' && track.language === defaultAudio) {
            track.enabled = true;
            console.log("Setting default audio on: ", track.language);
        }
    }

    if (analyticsOn)
    {
        var tracker = ADB.Media.getInstance();
        var videoPlayer = new VideoPlayer('my-video_html5_api');
        var analyticsProvider = new VideoAnalyticsProvider(videoPlayer);
    }
}


function startProgressBar() 
{
    var a = 0;
    if (a == 0) 
    {
        a++;
        var width = 1;
        var pg = document.getElementById("progressBar");
        var interval = setInterval(increasePercentage, 30);

        function increasePercentage() 
        {
            if (width >= 100) 
            {
                clearInterval(interval);
                setTimeout(showLoading, 500);
            } 
            else 
            {
                width++;
                pg.style.width = width + "%";
                $("#accessing-loading-percentage").html(width  + "%");
            }
        }
    }
}