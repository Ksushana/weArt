window.addEventListener("load", function() {
	const myTabs = document.querySelectorAll(".js-tab-link");
	if (myTabs !== null && myTabs.length > 0) {
		function myTabClicks(tabClickEvent) {

			for (var i = 0; i < myTabs.length; i++) {
				myTabs[i].classList.remove("is-active");
			}
	
			var clickedTab = tabClickEvent.currentTarget; 
	
			clickedTab.classList.add("is-active");
	
			tabClickEvent.preventDefault();
	
			var myContentPanes = document.querySelectorAll(".tab-panes__item");
	
			for (i = 0; i < myContentPanes.length; i++) {
				myContentPanes[i].classList.remove("is-active");
			}
	
			var anchorReference = tabClickEvent.target;
			var activePaneId = anchorReference.getAttribute("href");
			var activePane = document.querySelector(activePaneId);
	
			activePane.classList.add("is-active");
	
		}
	
		for (i = 0; i < myTabs.length; i++) {
			myTabs[i].addEventListener("click", myTabClicks)
		}
	}
});

window.addEventListener("load", function() {
	const myTabsArtist = document.querySelectorAll(".js-artist-tab-link");
	
	if (myTabsArtist !== null && myTabsArtist.length > 0) {
		function myTabClicks(tabClickEvent) {
			for (var i = 0; i < myTabsArtist.length; i++) {
				myTabsArtist[i].classList.remove("is-active");
			}
	
			var clickedTab = tabClickEvent.currentTarget; 
	
			clickedTab.classList.add("is-active");
	
			tabClickEvent.preventDefault();
	
			var myContentPanes = document.querySelectorAll(".js-artist-tab-pane");
	
			for (i = 0; i < myContentPanes.length; i++) {
				myContentPanes[i].classList.remove("is-active");
			}
	
			var anchorReference = tabClickEvent.target;
			var activePaneId = anchorReference.getAttribute("href");
			var activePane = document.querySelector(activePaneId);
	
			activePane.classList.add("is-active");
	
		}
	
		for (i = 0; i < myTabsArtist.length; i++) {
			myTabsArtist[i].addEventListener("click", myTabClicks)
		}
	}
});


