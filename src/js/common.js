document.addEventListener("DOMContentLoaded", function() {
    let menuItems = document.querySelectorAll(".nav__link");
    let btnsSlide = document.querySelectorAll(".btn");


    let phoneField = document.querySelector(".phone");
    let im = new Inputmask("+38 (099) 999 99 99");
    im.mask(phoneField);


    menuItems.forEach(elem => {
        elem.addEventListener("click", function() {
            menuItems.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        })
    })



    //swiper
    const swiper = new Swiper('.header-slider', {
        pagination: {
            el: '.swiper-pagination',

        },
        navigation: {
            nextEl: '.next-btn',
            prevEl: '.prev-btn',
        },
        pagination: {
            el: '.pagination__slide',
            type: 'fraction',
            renderFraction: function(currentClass, totalClass) {

                return '<span class="' + currentClass + '"></span>' +
                    ' <img class="slide-line" src="img/line.svg"> ' +
                    '<span class="' + totalClass + '"></span>';
            },
            formatFractionCurrent: function(number) {
                if (number < 10) {
                    number = '0' + number;
                }
                return number;
            },
            formatFractionTotal: function(number) {
                if (number < 10) {
                    number = '0' + number;
                }
                return number;
            }
        },

    });

    btnsSlide.forEach(elem => {
        elem.addEventListener("click", function() {
            btnsSlide.forEach(item => item.classList.remove('btn-active'));
            this.classList.add('btn-active');
        })
    })

    //validete
    new JustValidate('.js-form', {
        rules: {
            name: {
                required: true,
                minLength: 2
            },

            email: {
                required: true,
                email: true
            },

            phone: {
                required: true
            },

            service: {
                required: true
            },

        },
        messages: {
            name: {
                required: "Поле должно быть заполнино",
                minLength: "Имя должно быть больше двух символов"
            },

            email: {
                required: "Поле должно быть заполнино",
                email: "Поле должно содиржать знак @"
            },

            phone: {
                required: "Поле должно быть заполнино"
            },

            service: {
                required: "Поле должно быть заполнино"
            },


        },

        submitHandler: function(form) {
            let xhr = new XMLHttpRequest();

            xhr.open("POST", "php/mail.php", true);
            let formData = new FormData(form);

            xhr.addEventListener("load", function() {
                if (xhr.readyState == 4) {
                    switch (xhr.status) {
                        case 200:
                            {
                                console.log("Все харашо");
                                form.reset();
                                break;
                            }
                        case 301:
                            {
                                console.log("Нас перенаправили");
                                break;
                            }
                        case 404:
                            {
                                console.log("Мы ничего не найшли");
                                break;
                            }
                        default:
                            console.log("Ошибка!");
                            break;
                    }
                }
            })

            xhr.send(formData);

        },
    });

});