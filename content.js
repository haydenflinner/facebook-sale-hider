var removeIfSalePost = function(node) {
    if (node.querySelectorAll && node.parentNode && node.querySelectorAll('[class^=_l52]').length > 0) {
        node.parentNode.removeChild(node);
    }
}
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
	mutation.addedNodes.forEach(function(added) {
	    removeIfSalePost(added);
	});
    });
});
var attachRemover = function() {
	if (observer.connected) return;
	observer.connected = true;
	var possible = document.querySelector('[id^=topnews_main_stream]');
	document.querySelectorAll('[data-testid^=fbfeed_story]').forEach(function(node) { removeIfSalePost(node); });
	observer.observe(possible,
		{ attributes: true, childList: true, characterData: true, subtree: true });
}

var disconnectRemover = function() {
	observer.connected = false;
	observer.disconnect();
}

var pageWatcher = new window.MutationObserver(
	function(mutations) {
		mutations.forEach(
			function(mutation) {
				'Facebook' === mutation.target.textContent ? setTimeout(attachRemover, 500) : disconnectRemover();
				}
			});
	});
var target = document.querySelector('head > title');
pageWatcher.observe(target, { subtree: true, characterData: true, childList: true });
