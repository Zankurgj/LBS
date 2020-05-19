document.addEventListener('DOMContentLoaded', function () {
  getScroll();
  $('.features1-slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: $('.slider-arrow--prev-features1'),
    nextArrow: $('.slider-arrow--next-features1'),
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 812,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          infinite: false,
          arrows: false,
        },
      },
    ],
  });

  $('.features2-slider').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    prevArrow: $('.slider-arrow--prev-features2'),
    nextArrow: $('.slider-arrow--next-features2'),
    dots: false,
    responsive: [
      {
        breakpoint: 812,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          infinite: false,
          arrows: false,
        },
      },
    ],
  });
  $('.about-team-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: $('.slider-arrow--prev-about-team'),
    nextArrow: $('.slider-arrow--next-about-team'),
    dots: true,
    responsive: [
      {
        breakpoint: 812,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          arrows: false,
        },
      },
    ],
  });

  $('.smi-slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: $('.slider-arrow--prev-smi'),
    nextArrow: $('.slider-arrow--next-smi'),
    dots: false,
    responsive: [
      {
        breakpoint: 812,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true,
          infinite: false,
          arrows: false,
        },
      },
    ],
  });
  $('.app-block-item-container').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    mobileFirst: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 812,
        settings: 'unslick',
      },
    ],
  });

  $('.history-slider').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    prevArrow: $('.slider-arrow--prev-history'),
    nextArrow: $('.slider-arrow--next-history'),
    dots: false,
    responsive: [
      {
        breakpoint: 812,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true,
          infinite: false,
          arrows: false,
        },
      },
    ],
  });

  $(window)
    .on('resize', () => {
      let init = $('.lk-course-wrapper').data('init-slider');
      if (window.innerWidth < 1000) {
        if (!init) {
          $('.lk-course-wrapper')
            .slick({
              infinite: false,
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false,
              arrows: false,
              mobileFirst: true,
              variableWidth: true,
              responsive: [
                {
                  breakpoint: 1000,
                  settings: 'unslick',
                },
              ],
            })
            .data({ 'init-slider': true });
        }
      } else {
        if (init) {
          $('.lk-course-wrapper')
            .slick('unslick')
            .data({ 'init-slider': false });
        }
      }
    })
    .trigger('resize');

  $('.extras-slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: $('.slider-arrow--prev-extra'),
    nextArrow: $('.slider-arrow--next-extra'),
    dots: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          variableWidth: true,
        },
      },
      {
        breakpoint: 812,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true,
          arrows: false,
        },
      },
    ],
  });
  startAppend();
});

// Тест
// стартовый индекс
let amountQestionsIndex = 0;
// данные с бека
const qestionsArr = [
  {
    title: 'Когда вы в последний раз летали на самолёте?',
    q: [
      'Более 5 лет назад',
      '1-2 года назад',
      'Более 10 лет назад',
      'Менее 1 месяца назад',
      '3-5 лет назад',
      '1-5 месяцев назад',
      '6-12 месяцев назад',
    ],
  },
  { title: 'title2', q: ['question1', 'question2', 'question3'] },
  { title: 'title3', q: ['question1', 'question2', 'question3'] },
  { title: 'title4', q: ['question1', 'question2', 'question3'] },
  { title: 'title5', q: ['question1', 'question2', 'question3'] },
  { title: 'title6', q: ['question1', 'question2', 'question3'] },
];

const startAppend = () => {
  if (document.querySelector(`.main-test-container`)) {
    setCounter();
    // проверяем наличие прохождения теста
    const storage = JSON.parse(localStorage.getItem('test'));
    if (!storage) {
      amountQestionsIndex = 0;
    } else {
      amountQestionsIndex = findIndex();
    }
    appendElement(amountQestionsIndex);
  }
};

// ищем последний отвеченный вопрос
const findIndex = () => {
  const answersNumberIndex = Object.keys(
    JSON.parse(localStorage.getItem('test'))
  );
  answersNumberIndex.sort((a, b) => a - b);
  for (let i = 0; i < qestionsArr.length; i++) {
    if (i !== +answersNumberIndex[i]) {
      return i;
    }
  }
};

// добавление шаблона
const appendElement = (index) => {
  changeCounter(index);
  const container = document.querySelector(`.main-test-container`);
  container.innerHTML = ``;
  amountQestionsIndex = index;
  container.appendChild(
    addScreenElement(setTemplate(qestionsArr[amountQestionsIndex]))
  );
};

const addScreenElement = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

// выбор шаблона, можно добавить в бек тип шаблона
const setTemplate = (data) => {
  if (data) {
    template = questionsTemplate(data);
  } else {
    window.location.href = '/test-end.html';
  }
  return template;
};

// шаблоны
const questionsTemplate = (data) => `
<h3 class="main-test-title">${data.title}</h3>
  ${questions(data)} 
`;

const endTestTemplate = () => `
<p>Тест завершен</p>
<a href="./index.html" class="btn btn--primary">На главную</a>
<button class="btn--primary" onclick="clearTest()"> Пройти снова </button>
 `;

const questions = (data) => {
  let question = ``;
  for (let i = 0; i < data.q.length; i++) {
    question += `<input
    type="radio"
    id="question${i}"
    name="question"
    value="answer${i}"
    class="btn--radio--nolabel"
    onchange="onShowNextBtn()"
  />
  <label for="question${i}">${data.q[i]}</label> `;
  }
  return question;
};

// вспомогательные функции
const onPrewPage = () => {
  if (amountQestionsIndex > 0) {
    appendElement(amountQestionsIndex - 1);
  } else {
    window.history.back();
  }
};
const onShowNextBtn = () => {
  const mobileBp = 812;
  const windowWidth = window.innerWidth;
  if (windowWidth <= mobileBp) {
    const btn = document.querySelector('.btn--next-page');
    btn.classList.add('btn--next-page--show');
  }
};
const onHideNextBtn = () => {
  const mobileBp = 812;
  const windowWidth = window.innerWidth;
  if (windowWidth <= mobileBp) {
    const btn = document.querySelector('.btn--next-page');
    btn.classList.remove('btn--next-page--show');
  }
};
// меняем счетчик страниц
const changeCounter = (index) => {
  const currentPageContainer = document.querySelector(
    '.main-test-counter-current'
  );
  currentPageContainer.innerHTML = `${index + 1}`;
};
// Устанавливаем счетчик страниц
const setCounter = () => {
  const totalCounter = qestionsArr.length;
  const totalCounterPageContainer = document.querySelector(
    '.main-test-counter-total'
  );
  totalCounterPageContainer.innerHTML = `${totalCounter + 1}`;
};

const onNextPeage = () => {
  const form = document.getElementById('qForm');
  const radios = form.querySelectorAll('input[type="radio"]');
  radios.forEach((item) => {
    if (item.checked) {
      let obj = {};
      if (JSON.parse(localStorage.getItem('test'))) {
        obj = JSON.parse(localStorage.getItem('test'));
      }
      obj[amountQestionsIndex] = item.value;
      localStorage.setItem('test', JSON.stringify(obj));
    }
  });
  onHideNextBtn();
  if (amountQestionsIndex < qestionsArr.length) {
    appendElement(amountQestionsIndex + 1);
  }
};

const clearTest = () => {
  localStorage.clear();
  startAppend();
};
const submitStartForm = () => {
  window.location.href = '/test.html';
};
// test end

// help
const openPopupVideo = () => {
  stopScroll();
  document.querySelector('#headVideo').pause();
  $('#popup-wrapper-video').fadeIn(500);
  document.querySelector('#popup-video').play();
};

const closePopupVideo = () => {
  renewScroll();
  document.querySelector('#popup-video').pause();
  document.querySelector('#headVideo').play();
  $('#popup-wrapper-video').fadeOut(500);
};

const spoilerToogle = (el) => {
  $(el).toggleClass('spoiler--opened');
  var animateEL = $(el).children('.spoiler-text-wrapper');
  animateEL.slideToggle(200);
};

const showPopup = (el, id) => {
  stopScroll();
  const popup = $('#popup-wrapper');
  let data;
  if ($(el).data('popup-index')) {
    data = $(el).data('popup-index');
  } else {
    data = id;
  }
  $(`#${data}`).addClass('js-show-popup');
  popup.fadeIn(500);
};

const closePopup = () => {
  renewScroll();
  const popup = $('#popup-wrapper');
  popup.fadeOut(500);
  popup.find('.js-show-popup').removeClass('js-show-popup');
};
const closeMailPopup = () => {
  const popup = $('#popup-mail');
  popup.fadeOut(500);
};
const onSumbmitEmalForm = () => {
  const btnForm = document.querySelector('.popup-mail-button');
  const inputForm = document.querySelector('#mailInput');
  btnForm.classList.add('popup-mail-button--success');
  btnForm.setAttribute('disabled', 'disabled');
  inputForm.setAttribute('disabled', 'disabled');
};
const stopScroll = () => {
  $('html, body').css({
    overflow: 'hidden',
  });
};

const renewScroll = () => {
  $('html, body').css({
    overflow: 'auto',
  });
};

const getScroll = () => {
  const element = document.querySelector('.head-block-text');
  if (element) {
    const elementHeight = element.offsetHeight;
    const buttonEl = document.querySelector('.btn-header--mobile');
    window.onscroll = function () {
      if (
        Math.round(
          this.pageYOffset ||
            (document.documentElement && document.documentElement.scrollTop) ||
            (document.body && document.body.scrollTop)
        ) >= elementHeight
      ) {
        buttonEl.classList.add('btn-header--mobile--show');
      } else {
        buttonEl.classList.remove('btn-header--mobile--show');
      }
    };
  }
};

const changeTabs = (el) => {
  const tabIndex = el.value;
  const tabsEl = document.querySelectorAll('.lk-reserve-tab-wrapper');
  const activetab = document.querySelector('.lk-reserve-tab-wrapper--show');
  for (const tab of tabsEl) {
    if (tab.getAttribute('data-tabIndex') === tabIndex) {
      activetab.classList.remove('lk-reserve-tab-wrapper--show');
      tab.classList.add('lk-reserve-tab-wrapper--show');
    }
  }
};
