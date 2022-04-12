window.addEventListener('DOMContentLoaded', function() {

  // GLOBAL SCROLLBAR ==================================
  // (function($){
  //   $(window).load(function(){

  //     $("body").mCustomScrollbar({
  //       theme:"minimal-dark"
  //     });

  //   });
  // })(jQuery);

  // BURGER MENU =========================================
  document.querySelector('.header__responsive-navigation-burger').addEventListener('click', function() {
    document.querySelector('.header__responsive-navigation-table').classList.add('header__responsive-navigation-table--active')
  })

  document.querySelector('.close').addEventListener('click', function() {
    document.querySelector('.header__responsive-navigation-table').classList.remove('header__responsive-navigation-table--active')
  })


  $(".header__responsive-navigation-burger").click(function(){
    $("body").addClass("hidden");
  });

  $(".close").click(function(){
    $("body").removeClass("hidden");
  });


  // LAZY SCROOL ========================================
  $(document).ready(function() {
    var margin = 0;
    $(".scrool").click(function() {
       $("html, body").animate({
          scrollTop: $($(this).attr("href")).offset().top+margin+ "px"
       }, {
          duration: 1600,
          easing: "swing"
       });
       return true;
    });
 });

  // SLIDER ============================================
  const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    loop: false,
    autoplay: {
      delay: 20000,
    },
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });

  // DROP-DOWN MENU  ====================================
  jQuery(document).ready(function (e) {
    function t(t) {
        e(t).bind("click", function (t) {
            t.preventDefault();
            e(this).parent().fadeOut()
        })
    }
    e(".drop-down-menu").click(function () {
        var t = e(this).parents(".header__bottom-navigation-item").children(".drop-down-menu__list").is(":hidden");
        e(".header__bottom-navigation-item .drop-down-menu__list").hide();
        e(".header__bottom-navigation-item .drop-down-menu").removeClass("active");
        if (t) {
            e(this).parents(".header__bottom-navigation-item").children(".drop-down-menu__list").toggle().parents(".header__bottom-navigation-item").children(".drop-down-menu").addClass("active")
        }
    });
    e(document).bind("click", function (t) {
        var n = e(t.target);
        if (!n.parents().hasClass("header__bottom-navigation-item")) e(".header__bottom-navigation-item .drop-down-menu__list").hide();
    });
    e(document).bind("click", function (t) {
        var n = e(t.target);
        if (!n.parents().hasClass("header__bottom-navigation-item")) e(".header__bottom-navigation-item .drop-down-menu").removeClass("active");
    })
  });

  // SEARCH =============================================

  $(".search_button").click(function() {
    if($('.search_form').val().length) {
       $(".search__input-container").submit()
    } else {
       $(".search_form").focus();  }
  });

  document.querySelector('.search_form').addEventListener('focusin', function() {
    document.querySelector('.search_button').classList.add('search_button__active')
  })
  document.querySelector('.search_form').addEventListener('focusout', function() {
    document.querySelector('.search_button').classList.remove('search_button__active')
  })

  $(document).ready(function(){
    if (window.matchMedia("(max-width: 1480px)").matches) {
      $(".search_button").click(function(){
        $(".search__input-container, .search_form").toggleClass("search__input-container--active");
        $("search_form").focus();
      });
    }

    if (window.matchMedia("(max-width: 1024px)").matches) {
      $(".search_button").click(function(){
        $(".search_button").toggleClass("search_button--active");
      });
    }
  });

  $(document).ready(function(){
    if (window.matchMedia("(max-width: 768px)").matches) {
      $(".search_button").click(function(){
        $(".search").addClass("search--active");
        $(".search_button").addClass("search_button--active");
        $(".search__input-container, .search_form").addClass("search__input-container--active");
        $(".search_button-close").addClass("search_button-close--active");
        $("search_form").focus();
      });

      $(".search_button-close").click(function(){
        $(".search").removeClass("search--active");
        $(".search_button").removeClass("search_button--active");
        $(".search__input-container, .search_form").removeClass("search__input-container--active");
        $(".search_button-close").removeClass("search_button-close--active");
      });

      $('.search_form').removeAttr('placeholder');
    }

  });

  // OWL CARUSEL ========================================

  //owl2row plugin
  ;(function ($, window, document, undefined) {
    Owl2row = function (scope) {
        this.owl = scope;
        this.owl.options = $.extend({}, Owl2row.Defaults, this.owl.options);
        //link callback events with owl carousel here

        this.handlers = {
            'initialize.owl.carousel': $.proxy(function (e) {
                if (this.owl.settings.owl2row) {
                    this.build2row(this);
                }
            }, this)
        };

        this.owl.$element.on(this.handlers);
    };

    Owl2row.Defaults = {
        owl2row: false,
        owl2rowTarget: 'owl-carousel__item-style',
        owl2rowContainer: 'owl2row-item',
        owl2rowDirection: 'utd' // ltr
    };

    //mehtods:
    Owl2row.prototype.build2row = function(thisScope){

        var carousel = $(thisScope.owl.$element);
        var carouselItems = carousel.find('.' + thisScope.owl.options.owl2rowTarget);

        var aEvenElements = [];
        var aOddElements = [];

        $.each(carouselItems, function (index, item) {
            if ( index % 2 === 0 ) {
                aEvenElements.push(item);
            } else {
                aOddElements.push(item);
            }
        });

        carousel.empty();

        switch (thisScope.owl.options.owl2rowDirection) {
            case 'ltr':
                thisScope.leftToright(thisScope, carousel, carouselItems);
                break;

            default :
                thisScope.upTodown(thisScope, aEvenElements, aOddElements, carousel);
        }

    };

    Owl2row.prototype.leftToright = function(thisScope, carousel, carouselItems){

        var o2wContainerClass = thisScope.owl.options.owl2rowContainer;
        var owlMargin = thisScope.owl.options.margin;

        var carouselItemsLength = carouselItems.length;

        var firsArr = [];
        var secondArr = [];

        //console.log(carouselItemsLength);

        if (carouselItemsLength %2 === 1) {
            carouselItemsLength = ((carouselItemsLength - 1)/2) + 1;
        } else {
            carouselItemsLength = carouselItemsLength/2;
        }

        //console.log(carouselItemsLength);

        $.each(carouselItems, function (index, item) {


            if (index < carouselItemsLength) {
                firsArr.push(item);
            } else {
                secondArr.push(item);
            }
        });

        $.each(firsArr, function (index, item) {
            var rowContainer = $('<div class="' + o2wContainerClass + '"/>');

            var firstRowElement = firsArr[index];
                firstRowElement.style.marginBottom = owlMargin + 'px';

            rowContainer
                .append(firstRowElement)
                .append(secondArr[index]);

            carousel.append(rowContainer);
        });

    };

    Owl2row.prototype.upTodown = function(thisScope, aEvenElements, aOddElements, carousel){

        var o2wContainerClass = thisScope.owl.options.owl2rowContainer;
        var owlMargin = thisScope.owl.options.margin;

        $.each(aEvenElements, function (index, item) {

            var rowContainer = $('<div class="' + o2wContainerClass + '"/>');
            var evenElement = aEvenElements[index];

            evenElement.style.marginBottom = owlMargin + 'px';

            rowContainer
                .append(evenElement)
                .append(aOddElements[index]);

            carousel.append(rowContainer);
        });
    };

    /**
     * Destroys the plugin.
     */
    Owl2row.prototype.destroy = function() {
        var handler, property;

        for (handler in this.handlers) {
            this.owl.dom.$el.off(handler, this.handlers[handler]);
        }
        for (property in Object.getOwnPropertyNames(this)) {
            typeof this[property] !== 'function' && (this[property] = null);
        }
    };

    $.fn.owlCarousel.Constructor.Plugins['owl2row'] = Owl2row;
  })( window.Zepto || window.jQuery, window,  document );
  //end of owl2row plugin

  // Gallery Carusel
  $('.gallery__right-content').owlCarousel({
    loop: false,
    autoplay: false,
    nav: true,
    dots: true,
    items: 3,
    slideBy: 3,
    margin: 50,
    slideTransition: 'ease-out',
    // lazyLoad: true,
    checkVisibility: false,
    owl2row: true,
    responsive : {
      0: {
        items: 1,
        slideBy: 1,
        owl2row: false,
        margin: 0,
      },

      421: {
        items: 2,
        slideBy: 2,
        margin: 34,
      },

      1025: {
        items: 3,
        margin: 50,
      },
    },
    // responsiveBaseElement: '.gallery__right-content',
  });

  // LightBox
  jQuery(document).ready(function($){
    $('.chocolat-parent').Chocolat({
      pagination: true,
    });
  });

  // Editions Carusel
  if(window.matchMedia('(min-width: 521px)').matches){
  $(".editions__right-content").owlCarousel({
    loop: false,
    autoplay: false,
    nav: true,
    dots: true,
    items: 3,
    slideBy: 3,
    margin: 50,
    slideTransition: 'ease-out',
    checkVisibility: false,
    responsive : {
      520: {
        items: 2,
        slideBy: 2,
        margin: 34,
      },
      900: {
        items: 2,
        slideBy: 2,
        margin: 49,
      },
      1424: {
        items: 3,
        slideBy: 3,
        margin: 50,
      },
    },
  });
  };
  // Projects Carusel
  $(".projects__carusel").owlCarousel({
    loop: false,
    autoplay: false,
    nav: true,
    dots: true,
    items: 3,
    slideBy: 1,
    margin: 50,
    slideTransition: 'ease-out',
    checkVisibility: false,
    responsive : {
      0: {
        items: 1,
        margin: 0,
      },
      521: {
        items: 2,
        margin: 34,
      },
      800: {
        items: 2,
        margin: 50,
      },
      1424: {
        items: 3,
        margin: 50,
      },
    },
  });

  // CHOICES ===========================================
  const multichoicesSelect = () => {
    const elements = document.querySelectorAll('.choices-select');
    elements.forEach(el => {
      const choices = new Choices(el, {
        itemSelectText: "",
        searchEnabled: false,
        shouldSort: false,
        placeholder: false,
        placeholderValue: false,
      });
    });
  }

  multichoicesSelect();

  // CATALOG ===========================================
  $( function() {
    // MAIN INITIAL
    document.querySelectorAll('.catalog__tab-button').forEach(function(tabButton) {
      tabButton.addEventListener('click', function(event) {
        const firstlevel = event.currentTarget.dataset.firstlevel

        document.querySelectorAll('.catalog__content').forEach(function(tabContent) {
          tabContent.classList.remove('catalog__content--active')
        })

        document.querySelector(`[data-firsttarget="${firstlevel}"]`).classList.add('catalog__content--active')
        $('.catalog__accordion').accordion("refresh");
      })
    })

    // COUNTRY BUTTON
    document.querySelectorAll('.catalog__tab-button').forEach(function(tabButtonCountry) {
      tabButtonCountry.addEventListener('click', function(event) {
        const firstlevel = event.currentTarget.dataset.firstlevel

        document.querySelectorAll('.catalog__tab-button').forEach(function(tabContent) {
          tabContent.classList.remove('catalog__tab-button--focus')
        })

        document.querySelector(`[data-firstlevel="${firstlevel}"]`).classList.add('catalog__tab-button--focus')

      })
    })

    // LEFT CONTENT INITIAL
      // -- France --
    document.querySelectorAll('.catalog__author--france').forEach(function(authorButtonFrance) {
      authorButtonFrance.addEventListener('click', function(event) {
        const lastlevelfrance = event.currentTarget.dataset.lastlevelfrance

        document.querySelectorAll('.catalog__left-content').forEach(function(authorContent) {
          authorContent.classList.remove('catalog__left-content-france--active')
        })

        document.querySelector(`[data-lasttargetfrance="${lastlevelfrance}"]`).classList.add('catalog__left-content-france--active')
        $('.catalog__accordion').accordion("refresh");
      })
    })

    // FRANCE AUTHOR BUTTON
    document.querySelectorAll('.catalog__author--france').forEach(function(tabButtonCountryFrance) {
      tabButtonCountryFrance.addEventListener('click', function(event) {
        const lastlevelfrance = event.currentTarget.dataset.lastlevelfrance

        document.querySelectorAll('.catalog__author--france').forEach(function(tabContent) {
          tabContent.classList.remove('catalog__author--france--focus')
        })

        document.querySelector(`[data-lastlevelfrance="${lastlevelfrance}"]`).classList.add('catalog__author--france--focus')

      })
    })

    // -- Germany --
    document.querySelectorAll('.catalog__author--germany').forEach(function(authorButtonGermany) {
      authorButtonGermany.addEventListener('click', function(event) {
        const lastlevelgermany = event.currentTarget.dataset.lastlevelgermany

        document.querySelectorAll('.catalog__left-content').forEach(function(authorContent) {
          authorContent.classList.remove('catalog__left-content-germany--active')
        })

        document.querySelector(`[data-lasttargetgermany="${lastlevelgermany}"]`).classList.add('catalog__left-content-germany--active')
        $('.catalog__accordion').accordion("refresh");
      })
    })

    // GERMANY AUTHOR BUTTON
    document.querySelectorAll('.catalog__author--germany').forEach(function(tabButtonCountryGermany) {
      tabButtonCountryGermany.addEventListener('click', function(event) {
        const lastlevelgermany = event.currentTarget.dataset.lastlevelgermany

        document.querySelectorAll('.catalog__author--germany').forEach(function(tabContent) {
          tabContent.classList.remove('catalog__author--germany--focus')
        })

        document.querySelector(`[data-lastlevelgermany="${lastlevelgermany}"]`).classList.add('catalog__author--germany--focus')

      })
    })

    // -- Italy --
    document.querySelectorAll('.catalog__author--italy').forEach(function(authorButtonItaly) {
      authorButtonItaly.addEventListener('click', function(event) {
        const lastlevelitaly = event.currentTarget.dataset.lastlevelitaly

        document.querySelectorAll('.catalog__left-content').forEach(function(authorContent) {
          authorContent.classList.remove('catalog__left-content-italy--active')
        })

        document.querySelector(`[data-lasttargetitaly="${lastlevelitaly}"]`).classList.add('catalog__left-content-italy--active')
        $('.catalog__accordion').accordion("refresh");
      })
    })

    // ITALY AUTHOR BUTTON
    document.querySelectorAll('.catalog__author--italy').forEach(function(tabButtonCountryItaly) {
      tabButtonCountryItaly.addEventListener('click', function(event) {
        const lastlevelitaly = event.currentTarget.dataset.lastlevelitaly

        document.querySelectorAll('.catalog__author--italy').forEach(function(tabContent) {
          tabContent.classList.remove('catalog__author--italy--focus')
        })

        document.querySelector(`[data-lastlevelitaly="${lastlevelitaly}"]`).classList.add('catalog__author--italy--focus')

      })
    })

    // -- Russia --
    document.querySelectorAll('.catalog__author--russia').forEach(function(authorButtonRussia) {
      authorButtonRussia.addEventListener('click', function(event) {
        const lastlevelrussia = event.currentTarget.dataset.lastlevelrussia

        document.querySelectorAll('.catalog__left-content').forEach(function(authorContent) {
          authorContent.classList.remove('catalog__left-content-russia--active')
        })

        document.querySelector(`[data-lasttargetrussia="${lastlevelrussia}"]`).classList.add('catalog__left-content-russia--active')
        $('.catalog__accordion').accordion("refresh");
      })
    })

    // RUSSIA AUTHOR BUTTON
    document.querySelectorAll('.catalog__author--russia').forEach(function(tabButtonCountryRussia) {
      tabButtonCountryRussia.addEventListener('click', function(event) {
        const lastlevelrussia = event.currentTarget.dataset.lastlevelrussia

        document.querySelectorAll('.catalog__author--russia').forEach(function(tabContent) {
          tabContent.classList.remove('catalog__author--russia--focus')
        })

        document.querySelector(`[data-lastlevelrussia="${lastlevelrussia}"]`).classList.add('catalog__author--russia--focus')

      })
    })

    // -- Belgium --
    document.querySelectorAll('.catalog__author--belgium').forEach(function(authorButtonBelgium) {
      authorButtonBelgium.addEventListener('click', function(event) {
        const lastlevelbelgium = event.currentTarget.dataset.lastlevelbelgium

        document.querySelectorAll('.catalog__left-content').forEach(function(authorContent) {
          authorContent.classList.remove('catalog__left-content-belgium--active')
        })

        document.querySelector(`[data-lasttargetbelgium="${lastlevelbelgium}"]`).classList.add('catalog__left-content-belgium--active')
        $('.catalog__accordion').accordion("refresh");
      })
    })

    // BELGIUM AUTHOR BUTTON
    document.querySelectorAll('.catalog__author--belgium').forEach(function(tabButtonCountryBelgium) {
      tabButtonCountryBelgium.addEventListener('click', function(event) {
        const lastlevelbelgium = event.currentTarget.dataset.lastlevelbelgium

        document.querySelectorAll('.catalog__author--belgium').forEach(function(tabContent) {
          tabContent.classList.remove('catalog__author--belgium--focus')
        })

        document.querySelector(`[data-lastlevelbelgium="${lastlevelbelgium}"]`).classList.add('catalog__author--belgium--focus')

      })
    })

    // ACCORDION
    $( ".catalog__accordion" ).accordion({
      //collapsible: true,
      heightStyle: "content",
      animate: 100,
    });

    // ANCHOR
    if (window.matchMedia("(max-width: 1024px)").matches) {
    $('.catalog__author--france').attr('href', '#author-france');
    $('.catalog__author--germany').attr('href', '#author-germany');
    $('.catalog__author--italy').attr('href', '#author-italy');
    $('.catalog__author--russia').attr('href', '#author-russia');
    $('.catalog__author--belgium').attr('href', '#author-belgium');
    };

    $('.ui-state-active').attr('tabindex', '-1');
  });

  // EVENTS ===========================================
  $(document).ready(function () {
    if(window.matchMedia('(min-width: 1px)').matches){

      size_li = $(".events__list .events__item").size();
      x=1000000;

    if(window.matchMedia('(min-width: 521px)').matches){
      size_li = $(".events__list .events__item").size();
      x=2;
    };

    if(window.matchMedia('(min-width: 1019px)').matches){
      size_li = $(".events__list .events__item").size();
      x=3;
    };

    $('.events__list .events__item:lt('+x+')').css( "display", "flex" );
    $('.events__all-events-button').click(function () {
        x= (x+5 <= size_li) ? x+5 : size_li;
        $('.events__list .events__item:lt('+x+')').css( "display", "flex" );
    });
    };

    if(window.matchMedia('(max-width: 520px)').matches){
      $(document).ready(function(){
        $(".events__owl").owlCarousel({
          loop: false,
          autoplay: false,
          items: 1,
          margin: 10,
          nav: false,
          dots: true,
          slideBy: 1,
          slideTransition: 'ease-out',
          checkVisibility: false,
        });
        $('.owl-dot').click(function() {
          $('.owl-dot').trigger('to.owl.carousel', [$(this).index(), 1000]);
        })
      });
    };
  });

  document.querySelector('.events__all-events-button').addEventListener('click', function() {
    document.querySelector('.events__all-events-button').classList.add('events__all-events-button--hidden')
  })

  // TOOLTIP ===========================================
  tippy('#tooltip__one', {
    content: 'Пример современных тенденций - современная методология разработки',
    maxWidth: 265,
    offset: [0, 8],
    theme: 'blacnchard-one',
    trigger: 'click',
  });

  tippy('#tooltip__two', {
    content: 'Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции',
    maxWidth: 265,
    offset: [0, 8],
    theme: 'blacnchard-two',
    trigger: 'click',
  });

  tippy('#tooltip__three', {
    content: 'В стремлении повысить качество',
    maxWidth: 265,
    offset: [0, 8],
    theme: 'blacnchard-one',
    trigger: 'click',
  });

  // VALIDATION ===========================================

  var selector = document.querySelector("input[type='tel']");
  var im = new Inputmask("+7(999) 999-99-99");
  im.mask(selector);

  let validateForms = function(selector, rules, successModal, yaGoal) {
    new window.JustValidate(selector, {
      rules: rules,

      messages: {
        valname: {
          minLength: 'Введите минимум 2 символа',
          maxLenght: 'Введите не более 32 символов'
        },
        valname: 'Введите минимум 2 символа',
        valtelephone: 'Введите полный номер телефона',
      },

      submitHandler: function(form) {
        let formData = new FormData(form);

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              $(".thanks-popup").addClass("thanks-popup--active");
              $(".contacts__field").addClass("contacts__field--disabled");
              console.log('Отправлено');
            }
          }
        }

        xhr.open('POST', 'mail.php', true);
        xhr.send(formData);

        form.reset();
      }
    });
  }

  validateForms('.contacts__forms', { valname: {required: true, minLength: 2, maxLenght: 32}, valtelephone: {required: true,
    function: (name, value) => {
      const phone = selector.inputmask.unmaskedvalue()
      return Number(phone) && phone.length === 10
    }
  } }, '.thanks-popup--active', 'send goal')

  // CHECKBOX ===========================================
  if (window.matchMedia("(max-width: 520px)").matches) {
  $('.editions__checkbox').on('change', function () {
    if ( $(this).is(':checked') ) {
      $(this).parent().detach().appendTo('.checked');
    } else {
      $(this).parent().detach().appendTo('.unchecked');
    }
  });
  };

})
