'use strict'
let main = () => {
    //click thumbnail to expand detail panel
    let detailPanel = (triggers, panels, collapse) => {
        triggers.on('click', (e) => {
            e.stopPropagation();
            let trigger = $(e.currentTarget);
            let panel = $(`#${trigger.data('detail')}`);
            if (!trigger.hasClass('active')) {
                triggers.removeClass('active');
                panels.removeClass('active');
                trigger.addClass('active');
                panel.addClass('active');
            } else {
                if (collapse) {
                    triggers.removeClass('active');
                    panels.removeClass('active');
                }
            }
        });
    };

    //smooth scroll to anchor on the same page
    let smoothScroll = () => {
        let anchors = $('a[href*="#"]:not([href="#"])');
        anchors.on('click', (e) => {
            let trigger = e.currentTarget;
            if (location.pathname.replace(/^\//, '') == trigger.pathname.replace(/^\//, '') && location.hostname == trigger.hostname) {
                let target = $(trigger.hash);
                target = target.length ? target : $('[name=' + trigger.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    };

    //hide elements don't match the filter
    let clickFilter = (triggers, targets, dataAttr) => {
        triggers.on('click', (e) => {
            let trigger = $(e.currentTarget);
            let query = trigger.data(dataAttr);
            let $targets = $(targets);
            if (query == 'all') {
                $targets.show();
            } else {
                $($targets).hide();
                for (let target of $targets) {
                    let $target = $(target);
                    let targetDataAttr = $target.data(dataAttr);
                    if (targetDataAttr.includes(query)) {
                        $target.show();
                    }
                }
            }
            triggers.removeClass('active');
            trigger.addClass('active');
        });
    };

    // show or hide element on scroll
    let scrollHide = (target, direction, limit) => {
        let $window = $(window);
        let $target = $(target);
        let didScroll = false;

        $window.on('scroll', () => {
            didScroll = true;
        });

        let hideTarget = () => {
            $target.addClass('scroll-move');
        };
    };

    detailPanel($('.photowall-item'), $('.photowall-detail'), true);
    detailPanel($('.highlight-icon'), $('.service-list'), false);
    clickFilter($('.team-branch'), $('.photowall-item'), 'branch');
    smoothScroll();
};
main();
