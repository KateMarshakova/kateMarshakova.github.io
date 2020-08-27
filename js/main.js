$('document').ready(function () {
    loadJson('#bags');
    loadJson('#watches');
    loadJson('#cloth');
    loadJson('#fashion');
    loadJson('#furnitures');
    loadJson('#mobile');
    loadJson('#toys');
});

function loadJson(product) {
    let json = 'json/'+ product.slice(1) +'.json';
    $.getJSON( json, function( data ) {
        let content = '';
        for (let key in data) {
            content+='<div class="col mb-4" style="margin-bottom: 2rem!important">\n' +
                '                            <div class="card h-100" >\n' +
                '                                <div class="card-top" style="display: flex; justify-content: space-between">\n' +
                '                                    <div class="card-top__heart" style="display: flex"><img class="heart-photo" src="images/arrivals/heart.png" alt="like"><p class="heart-amount">'+data[key]['heartAmount'] + '</p></div>';
            content+='<div class="card-top__comments" style="display: flex"><img class="comments-photo" src="images/arrivals/comments.png" alt="comments"><p class="comments-amount">'+data[key]['commentsAmount'] + '</p></div></div>';
            content+='<img src="'+data[key]['img'] + '" class="card-img-top" alt="bag">';
            content+='<div class="card-body" style="text-align: center; max-height: 150px"><h3 class="card-title">'+data[key]['title'] + '</h3>';
            content+='<p class="card-text">'+data[key]['text'] + '</p></div><button class="card-btn" style="align-items: center">Add to Cart</button></div></div>';
        }
        $(product).html(content);
    })
}


var $tabs = function (target) {
    var
        _elemTabs = (typeof target === 'string' ? document.querySelector(target) : target),
        _eventTabsShow,
        _showTab = function (tabsLinkTarget) {
            var tabsPaneTarget, tabsLinkActive, tabsPaneShow;
            tabsPaneTarget = document.querySelector(tabsLinkTarget.getAttribute('href'));
            tabsLinkActive = tabsLinkTarget.parentElement.querySelector('.tabs__link_active');
            tabsPaneShow = tabsPaneTarget.parentElement.querySelector('.tabs__pane_show');
            if (tabsLinkTarget === tabsLinkActive) {
                return;
            }
            if (tabsLinkActive !== null) {
                tabsLinkActive.classList.remove('tabs__link_active');
            }
            if (tabsPaneShow !== null) {
                tabsPaneShow.classList.remove('tabs__pane_show');
            }
            tabsLinkTarget.classList.add('tabs__link_active');
            tabsPaneTarget.classList.add('tabs__pane_show');
            document.dispatchEvent(_eventTabsShow);
        },
        _switchTabTo = function (tabsLinkIndex) {
            var tabsLinks = _elemTabs.querySelectorAll('.tabs__link');
            if (tabsLinks.length > 0) {
                if (tabsLinkIndex > tabsLinks.length) {
                    tabsLinkIndex = tabsLinks.length;
                } else if (tabsLinkIndex < 1) {
                    tabsLinkIndex = 1;
                }
                _showTab(tabsLinks[tabsLinkIndex - 1]);
            }
        };

    _eventTabsShow = new CustomEvent('tab.show', { detail: _elemTabs });

    _elemTabs.addEventListener('click', function (e) {
        var tabsLinkTarget = e.target;
        if (!tabsLinkTarget.classList.contains('tabs__link')) {
            return;
        }
        e.preventDefault();
        _showTab(tabsLinkTarget);
    });

    return {
        showTab: function (target) {
            _showTab(target);
        },
        switchTabTo: function (index) {
            _switchTabTo(index);
        }
    }

};

$tabs('.tabs');