// Copyright (c) 2016 Catenology All Rights Reserved.

'use strict'
let main = () => {

    //read more toggle
    let toggleReadMore = (triggers, textBefore, textAfter, iconBefore, iconAfter ) => {
            triggers.on('click', (e) => {
                let trigger = $(e.currentTarget);
                let triggerIcon = trigger.find($('i'));
                let triggerLabel = trigger.find($('label'));
                let target = $(`#${trigger.data('target')}`);
                let text = target.is('.active') ? textBefore : textAfter;
                triggerIcon.toggleClass(`'${iconBefore} ${iconAfter}'`);
                triggerLabel.text(text);
                target.toggleClass('active');
            });
        }

    //detail panel
    let detailPanel = (triggers, panels, closes) => {
        if (triggers) {
            triggers.on('click', (e) => {
                let trigger = $(e.currentTarget);
                let panel = $(`#${trigger.data('detail')}`);
                if (!trigger.hasClass('active')) {
                    triggers.removeClass('active');
                    panels.removeClass('active');
                    trigger.addClass('active');
                    panel.addClass('active');
                } else {
                    triggers.removeClass('active');
                    panels.removeClass('active');
                }
            });
        }
        if (closes) {
            closes.on('click', (e) => {
                let close = $(e.currentTarget);
                let target = $(`#${close.data('target')}`);
                if (!target.hasClass('active')) {
                    panels.removeClass('active');
                } else {
                    panels.removeClass('active');
                }
            });
        }
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

    // click trigger to show target
    let toggleActive = (trigger, exclude) => {
      let target = $(`#${trigger.data('target')}`);
      let $document = $(document);
      let excludeAndInside = $(exclude).find('*');

      // toggle target when trigger is clicked
      trigger.on('click', (e) => {
        target.toggleClass('active');
      });

      //click anywhere to deactive target
      $document.on('click', (e) => {
        let closest = $(e.target).closest(trigger);
        if (!closest.length) {
          target.removeClass('active');
        }
      });

      // exclude objects from triggering deactive
      excludeAndInside.on('click', (e) => {
        let currentTarget = $(e.target);
        console.log(currentTarget.length);
        if (currentTarget.length) {
          target.removeClass('active');
        }
      });
    };


    // credits info in console
    let consoleNotes = () => {
        console.log('Website built by Catenology. Copyright (c) 2016 Catenology All Rights Reserved.');
    }

    // run stuff
    toggleReadMore($('.about-read-more'),'Read more', 'Read less', 'catif-chevron-down', 'catif-chevron-up');
    detailPanel($('.highlight-icon'), $('.service-list'));
    detailPanel($('.service-item-read-more'), $('.service-item-description'), $('.service-close'));
    clickFilter($('.team-branch'), $('.photowall-item'), 'branch');
    smoothScroll();
    toggleActive($('.navbar-hamburger-icon'), $('.navbar-menu'));
};
main();
