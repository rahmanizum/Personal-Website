
const iframe = document.querySelector("#iframeTarget");
function openIframe(url){
    iframe.src=url;
}

function closing(){
    const sidebar = document.querySelector(`#navmenu`);
    console.log(sidebar);
    sidebar.className="d-none";
}
