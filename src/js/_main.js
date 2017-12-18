import $ from 'jquery';
import svg4everybody from 'svg4everybody';

const main = () => {
  // read more toggle
  const toggleReadMore = (triggers, iconBefore, iconAfter) => {
    triggers.on('click', (e) => {
      const trigger = $(e.currentTarget);
      const triggerIcon = trigger.find($('i'));
      const triggerLabel = trigger.find($('label'));
      const target = $(`#${trigger.data('target')}`);
      const textBefore = triggerLabel.data('expand');
      const textAfter = triggerLabel.data('collapse');
      const text = target.is('.active') ? textBefore : textAfter;
      triggerIcon.toggleClass(`'${iconBefore} ${iconAfter}'`);
      triggerLabel.text(text);
      target.toggleClass('active');
    });
  };

  // detail panel
  const detailPanel = (triggers, panels, closes) => {
    if (triggers) {
      triggers.on('click', (e) => {
        const trigger = $(e.currentTarget);
        const panel = $(`#${trigger.data('detail')}`);
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
        const close = $(e.currentTarget);
        const target = $(`#${close.data('target')}`);
        if (!target.hasClass('active')) {
          panels.removeClass('active');
        } else {
          panels.removeClass('active');
        }
      });
    }
  };

  // smooth scroll to anchor on the same page
  const smoothScroll = () => {
    const anchors = $('a[href*="#"]:not([href="#"])');
    anchors.on('click', (e) => {
      const trigger = e.currentTarget;
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

  // hide elements don't match the filter
  const clickFilter = (triggers, targets, dataAttr) => {
    triggers.on('click', (e) => {
      const trigger = $(e.currentTarget);
      const query = trigger.data(dataAttr);
      const $targets = $(targets);
      if (query === 'all') {
        $targets.show();
      } else {
        $($targets).hide();
        $targets.forEach((target) => {
          const $target = $(target);
          const targetDataAttr = $target.data(dataAttr);
          if (targetDataAttr.includes(query)) {
            $target.show();
          }
        });
      }
      triggers.removeClass('active');
      trigger.addClass('active');
    });
  };

  // show or hide element on scroll
  const scrollHide = (target) => {
    const $window = $(window);
    const $target = $(target);
    let didScroll = false;

    $window.on('scroll', () => {
      didScroll = true;
    });

    let hideTarget = () => {
      $target.addClass('scroll-move');
    };
  };

  // click trigger to show target
  const toggleActive = (trigger, exclude) => {
    const target = $(`#${trigger.data('target')}`);
    const $document = $(document);
    const excludeAndInside = $(exclude).find('*');

    // toggle target when trigger is clicked
    trigger.on('click', () => {
      target.toggleClass('active');
    });

    // click anywhere to deactive target
    $document.on('click', (e) => {
      const closest = $(e.target).closest(trigger);
      if (!closest.length) {
        target.removeClass('active');
      }
    });

    // exclude objects from triggering deactive
    excludeAndInside.on('click', (e) => {
      const currentTarget = $(e.target);
      if (currentTarget.length) {
        target.removeClass('active');
      }
    });
  };


  // credits info in console
  const consoleNotes = () => {
    console.log('Website built by Catenology. Copyright (c) 2016 Catenology All Rights Reserved.');
  }

  // run stuff
  svg4everybody();
  toggleReadMore($('.about-read-more'), 'catif-chevron-down', 'catif-chevron-up');
  detailPanel($('.highlight-icon'), $('.service-list'));
  detailPanel($('.service-item-read-more'), $('.service-item-description'), $('.service-close'));
  clickFilter($('.team-office'), $('.photowall-item'), 'office');
  smoothScroll();
  toggleActive($('.navbar-hamburger-icon'), $('.navbar-menu'));
};
main();
