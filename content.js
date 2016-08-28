/** Uses the presence of the bold item title field in most sale posts to determine if sale post or not Check for 'Sale' in group name if this doesn't work well enough **/
var removeIfSalePost = function(node) {
    if (node.querySelectorAll && node.querySelectorAll('[class^=_l52]').length > 0) node.parentNode.removeChild(node);
}

/** Attaches to newsfeed, removes incoming saleposts before they are scrolled into view **/
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(added) {
            removeIfSalePost(added);
        });
    });
});

/** Removes sale group posts from the main DOM, then attaches and purges incoming sale posts **/
var attachRemover = function() {
    if (observer.connected) return;
    observer.connected = true;
    var posts = document.querySelectorAll('[data-testid^=fbfeed_story]');
    posts.forEach(function(node) { removeIfSalePost(node); }); // Clear the posts loaded when page loads
    var newsFeed = document.querySelector('[id^=topnews_main_stream]'); // Then remove them as they come into view
    observer.observe(newsFeed, { childList: true, subtree: true });
}

var disconnectRemover = function() {
    observer.connected = false;
    observer.disconnect();
}

/** Called when tab title changes. Attaches sale post remover or disconnects it if leaving main feed. **/
var pageWatcher = new window.MutationObserver(
    function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.target.textContent.indexOf('Facebook') != -1 ? setTimeout(attachRemover, 500) : disconnectRemover();
        });
    });
var tabTitleText = document.querySelector('head > title');
pageWatcher.observe(tabTitleText, { subtree: true, characterData: true, childList: true });
