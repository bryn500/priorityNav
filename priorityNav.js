(function () {
    // todo: add more dropdown item when there are items in dropdown
    'use strict';

    var navs = [],
        navId = 1,
        overflowNavOnResize;

    // https://davidwalsh.name/javascript-debounce-function
    // Returns a function, that, as long as it continues to be invoked, will not be triggered.
    // The function will be called after it stops being called for N milliseconds.
    // If `immediate` is passed, trigger the function on the leading edge, instead of the trailing.
    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var args = arguments,
                callNow = immediate && !timeout,
                later = function () {
                    timeout = null;
                    if (!immediate) {
                        func.apply(window, args);
                    }
                };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(window, args);
            }
        };
    }

    function getChildWidth(nav) {
        return nav.nav.scrollWidth;
    }

    function getNavItems(nav) {
        return nav.nav.getElementsByTagName('li');
    }

    function getOverflowItems(nav) {
        return nav.overflow.getElementsByTagName('li');
    }

    function moveLastItemToOverflow(nav, items) {
        var lastItem = items[items.length - 1];

        if (nav.overflow.firstChild) {
            nav.overflow.insertBefore(lastItem, nav.overflow.firstChild);
        } else {
            nav.overflow.appendChild(lastItem);
        }
    }

    function moveFirstItemToNav(nav, items) {
        var firstItem = items[0];

        nav.nav.appendChild(firstItem);
    }

    function navResized() {
        var t0 = performance.now();
        var containerWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        navs.forEach(function (nav) {
            var navItems = getNavItems(nav);
            var overflowItems = getOverflowItems(nav);
            var childWidths = getChildWidth(nav);

            // if supplied a container use its width instead of window width
            if (nav.container) {
                containerWidth = nav.container.offsetWidth;
            }

            // move items to overflow while they are too wide to fit container
            while (childWidths > containerWidth) {
                moveLastItemToOverflow(nav, navItems);
                childWidths = getChildWidth(nav);
            }

            // move items back to nav when there is space
            while (childWidths < containerWidth) {
                moveFirstItemToNav(nav, overflowItems);

                if (getChildWidth(nav) > containerWidth) {
                    moveLastItemToOverflow(nav, navItems); // hide item if it's too large
                    childWidths = containerWidth; // exit loop
                }
            }
        });

        var t1 = performance.now();
        console.log("Call to navResized took " + (t1 - t0) + " milliseconds.");
    }

    function watchNav(nav, overflow, container) {
        if (nav.constructor === Array) {
            console.error('nav is not a dom element');
            return null;
        }

        // add nav to array to watch
        navs.push({ id: navId, nav: nav, overflow: overflow, container: container });

        // check the overflows navs.push
        navResized();

        // return id and increment for the next one
        return navId++;
    }

    function unWatchNav(id) {
        // remove nav by id from array
        var index = navs.findIndex(function (nav) {
            return nav.id === id;
        });
        navs.splice(index, 1);
    }

    // Handle Resize
    overflowNavOnResize = debounce(navResized, 10, false);
    window.addEventListener('resize', overflowNavOnResize);

    window.priorityNav = {
        watchNav: watchNav,
        unWatchNav: unWatchNav,
        callNavResized: navResized
    };
}());
