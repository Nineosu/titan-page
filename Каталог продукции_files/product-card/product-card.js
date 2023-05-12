window.addEventListener('DOMContentLoaded', () => {
    const picturesThumbs = new Swiper('.card__pictures-thumbs', {
        direction: 'vertical',
        loop: false,
        slidesPerView: 6,
        spaceBetween: 5,
      
        // Navigation arrows
        navigation: {
          nextEl: '.pictures__thumb-next',
          prevEl: '.pictures__thumb-prev',
        },
    });

    const coupleSlider = new Swiper('.couple__slider', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 10,

        breakpoints: {
            820: {
                loop: false,
                slidesPerView: 5,
                spaceBetween: 25
            },
            768: {
                slidesPerView: 3,
            }
        },
      
        // Navigation arrows
        navigation: {
          nextEl: '.couple__slider-next',
          prevEl: '.couple__slider-prev',
        },
    });

    const seenSlider = new Swiper('.seen__slider', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 10,

        breakpoints: {
            820: {
                slidesPerView: 5,
                spaceBetween: 25
            },
            768: {
                slidesPerView: 3,
            }
        },

        pagination: {
            el: '.seen__slider-pagination',
            clickable: true,
        },
      
        // Navigation arrows
        navigation: {
          nextEl: '.seen__slider-next',
          prevEl: '.seen__slider-prev',
        },
    });

    const picturesAdaptiveSlider = new Swiper('.pictures__adaptive-slider', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 1,

        pagination: {
            el: '.pictures__adaptive-slider-pagination',
            clickable: true,
        },
    });

    // Switching big img

    const thumbsSlides =  document.querySelectorAll('.pictures__thumbs-slide'),
          bigImg = document.querySelector('.card__big-picture');

    thumbsSlides.forEach(slide => {
        slide.addEventListener('click', () => {
            thumbsSlides.forEach(item => {
                item.classList.remove('thumbs-active'); 
            });
            bigImg.src = slide.getAttribute('data-path');
            slide.classList.add('thumbs-active');
        });
    });

    // Cards check
    
    const coupleCards = document.querySelectorAll('.couple__cards-slide');

    coupleCards.forEach(card => {
        const cardPickBtn = card.querySelector('.couple__card-pick'),
              cardFavouriteBtn = card.querySelector('.couple__card-favourite'),
              cardComparisonBtn = card.querySelector('.couple__card-comparison');

        card.addEventListener('click', (e) => {
            if (e.target == cardPickBtn) {
                card.classList.toggle('card__picked');
                e.target.innerHTML = card.classList.contains('card__picked') ? 'Выбрано' : 'Выбрать';
                e.target.classList.toggle('card__btn-picked');
            } 
            else if (e.target === cardFavouriteBtn || e.target === cardComparisonBtn) {
                e.target.classList.toggle('card__btn-checked');
            }
        });
    });

    // Products counter

    const counterFunc = (counter, addBtn, counterValue, counterBtns, btnLink) => {
        addBtn.addEventListener('click', () => {
            counter.classList.add('counter-show');
            addBtn.style.display = 'none';
            btnLink?.classList.add('block-show');
        });

        counterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.getAttribute('data-btn') == 'decrement') {
                    if (Number(counterValue.innerHTML) == 1) {
                        counter.classList.remove('counter-show');
                        addBtn.style.display = 'block';
                        btnLink?.classList.remove('block-show');
                        return
                    }
                    counterValue.innerHTML = Number(counterValue.innerHTML) -1;
                } else {
                    counterValue.innerHTML = Number(counterValue.innerHTML) +1;
                }
            });
        });
    };

    const slideCards = document.querySelectorAll('.seen__cards-slide');

    slideCards.forEach(card => {
        const addBtn = card.querySelector('.couple__card-pick'), 
              counter = card.querySelector('.couple__card-counter'),
              counterBtns = card.querySelectorAll('.calc__counter-btn'),
              counterValue = card.querySelector('.card__counter-value'),
              cardFavouriteBtn = card.querySelector('.couple__card-favourite'),
              cardComparisonBtn = card.querySelector('.couple__card-comparison');

        counterFunc(counter, addBtn, counterValue, counterBtns);

        card.addEventListener('click', (e) => {
            if (e.target === cardFavouriteBtn || e.target === cardComparisonBtn) {
                e.target.classList.toggle('card__btn-checked');
            }
        });
    });

    // Basket buy

    const basketBuyBtn = document.querySelector('.basket__main-buy'),
          basketCounter =  document.querySelector('.basket-counter'),
          basketCounterValue = basketCounter.querySelector('.card__counter-value'),
          basketCounterBtns = basketCounter.querySelectorAll('.calc__counter-btn'),
          basketInLink = document.querySelector('.basket__main-buy.in-basket');

    basketBuyBtn.addEventListener('click', counterFunc(basketCounter, basketBuyBtn, basketCounterValue, basketCounterBtns, basketInLink));

    // Menu btns

    const menuPuncts = document.querySelectorAll('.card__punct'),
          menuBlocks = document.querySelectorAll('.card__desc-block'),
          punctsList = document.querySelector('.card__puncts'),
          punctsArrows = punctsList.querySelectorAll('.show__arrow');

    menuPuncts.forEach(punct => {
        const punctArrow = punct.querySelector('.show__arrow');

        punct.addEventListener('click', () => {
            punctsArrows.forEach(arrow => {
                arrow.classList.remove('arrow-up');
            })
            punctArrow.classList.add('arrow-up');

            menuPuncts.forEach(item => item.classList.remove('punct-selected'));

            punct.classList.add('punct-selected');

            menuBlocks.forEach(block => {

                if (punct.getAttribute('data-punct') === block.getAttribute('data-punct')) {
                    block.classList.toggle('desc__block-show');
                } else {
                    block.classList.remove('desc__block-show');
                };

            });

        })

    });

    // Review comments

    const reviews = document.querySelectorAll('.product__review');

    reviews.forEach(review => {
        const reviewCommentsBtn = review.querySelector('.review__comments-btn'),
              reviewCommentsSection = review.querySelector('.review__comments'),
              reviewCommentsClose = review.querySelector('.review__comments-close');


        reviewCommentsBtn.addEventListener('click', () => {
            reviewCommentsSection.classList.toggle('comments-show');
        });

        reviewCommentsClose.addEventListener('click', () => {
            reviewCommentsSection.classList.remove('comments-show');
        });
    });

    // Modals

    const reviewBtns = document.querySelectorAll('.product__reviews-btn'),
          reviewModal = document.querySelector('.product__review-modal'),
          reviewClose = reviewModal.querySelector('.review__modal-close'),
          reviewForm = reviewModal.querySelector('.review__modal-form');

    const modalThanks = document.querySelector('.product__review-thanks'),
          modalThanksClose = modalThanks.querySelector('.review__thanks-close');
    
    const partnerModalOpen = document.querySelectorAll('.basket__main-link'),
          partnerModal = document.querySelector('.partner__modal'),
          partnerModalClose = partnerModal.querySelector('.partner__modal-close'),
          partnerModalForm = partnerModal.querySelector('.partner__modal-form');

    const questionBtns = document.querySelectorAll('.product__questions-btn'),
          questionModal = document.querySelector('.question__modal'),
          questionClose = questionModal.querySelector('.question__modal-close'),
          questionModalForm = questionModal.querySelector('.question__modal-form');
          

    const modalFunc = (modalBtns, modal, modalForm, modalClose, showClass, afterModal, afterModalClass) => {
        modalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.classList.add(showClass);
            });
        });

        modalClose.addEventListener('click', () => {
            modal.classList.remove(showClass);
        });

        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            modal.classList.remove('block-show');
            afterModal?.classList.add(afterModalClass);
        });
    };

    modalFunc(reviewBtns, reviewModal, reviewForm, reviewClose, 'block-show', modalThanks, 'flex-show');

    modalFunc(partnerModalOpen, partnerModal, partnerModalForm, partnerModalClose, 'block-show');

    modalFunc(questionBtns, questionModal, questionModalForm, questionClose, 'block-show');

    modalThanksClose.addEventListener('click', () => {
        modalThanks.classList.remove('flex-show');
    });


    // Modal rate 

    const rateLabels = document.querySelectorAll('.rate-label');

    rateLabels.forEach((label, index) => {
        label.addEventListener('click', () => {
            rateLabels.forEach((rate, i) => {
                if (index >= i) {
                    rate.classList.add('rate__star-full');
                } else {
                    rate.classList.remove('rate__star-full');
                }
            });
        });
    });

    // Adaptive

    const cardPunctsShow = document.querySelector('.card__advantages-show'),
          cardPuncts = document.querySelector('.card__advantages-puncts'),
          cardShowArrow = cardPunctsShow.querySelector('.show__arrow');

    cardPunctsShow.addEventListener('click', () => {
        cardPuncts.classList.toggle('block-show');
        cardShowArrow.classList.toggle('arrow-up');
    });

    // Collections cards

    const collectionsMoreBtn = document.querySelector('.collections__card-more-btn'),
          collectionsMore = document.querySelector('.collections__cards-more');

    collectionsMoreBtn.addEventListener('click', () => {
        collectionsMore.classList.add('collections__cards-more-show');
        collectionsMoreBtn.style.display = 'none';
    });

    // Deliver btns

    const deliveryPickRadios = document.querySelectorAll('.delivery__select-type'),
          deliveryBlocks = document.querySelectorAll('.product__delivery-block');

    const clearClasses = function(item) {
        item.classList.remove('block-show');
        item.classList.remove('flex-show');
    };

    let showClass = '';

    deliveryPickRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            deliveryBlocks.forEach(block => {
                showClass = `${block.getAttribute('data-display')}-show`;

                clearClasses(block);

                if (block.getAttribute('data-delivery') === radio.value) {
                    block.classList.add(showClass);
                    return
                };
            });
        });
    });

    // Delivery map

    let placemarks = [];
    let adresses = {};

    const deliveryPuncts = document.querySelectorAll('.delivery__self-punct');

    deliveryPuncts.forEach(punct => {
        const punctRadio = punct.querySelector('input[name="delivery-self"]'),
              punctAdress = punct.querySelector('.delivery__self-address').textContent;

        let mark = {};

        let strCoords = punctRadio.getAttribute('data-map-coords').split(',');
        mark[punctRadio.value] = [Number(strCoords[0]), Number(strCoords[1])];
        adresses[punctRadio.value] = punctAdress;
        placemarks.push(mark);
    });

    ymaps.ready(init);

    function init(){
        var deliveryMap = new ymaps.Map("delivery-map", {
            center: [59.941363540794505,30.306555898437452],
            zoom: 11
        });

        placemarks.forEach((item, i) => {
            let markAdress = '';
            for (let key in adresses) {
                markAdress = adresses[key];
            }
            

            let placemark = new ymaps.Placemark(item[Object.keys(item)], {
                balloonContentHeader: `${markAdress}`
            }, {});
            deliveryMap.geoObjects.add(placemark);
        });

        var deliveryMapAdaptive = new ymaps.Map("delivery-map-adaptive", {
            center: [59.941363540794505,30.306555898437452],
            zoom: 11
        });

        placemarks.forEach((item, i) => {
            let markAdress = '';
            for (let key in adresses) {
                markAdress = adresses[key];
            }

            let placemark = new ymaps.Placemark(item[Object.keys(item)], {
                balloonContentHeader: `${markAdress}`
            }, {});
            deliveryMapAdaptive.geoObjects.add(placemark);
        });
        
    };
});