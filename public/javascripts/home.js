window.addEventListener('load', function() {
   document.getElementById("create").ontouch = function(){
       var meetings = localStorage.getItem("createMeetings");
       meetings.push(document.getElementById("meetingName").value);
       localStorage.setItem("createdMeetings", meetings);
    }
    document.getElementById("search").onclick = function(){
    }
});