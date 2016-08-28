console.log("Executing...");
var removeIfSalePost = function(node) {
    if (node.querySelectorAll && node.querySelectorAll('[class^=_l52]').length > 0) {
        node.parentNode.removeChild(node);
    }
}
document.querySelectorAll('[data-testid^=fbfeed_story]').forEach(function(node) { removeIfSalePost(node); });
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(added) {
            removeIfSalePost(added);
        });
    });
});
observer.observe(document.querySelector('[id^=more_pager_pagelet_]'),
        { attributes: true, childList: true, characterData: true, subtree: true });
