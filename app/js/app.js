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
          centerMode: true,
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
    centerMode: true,
    mobileFirst: true,
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
          centerMode: true,
          infinite: false,
          arrows: false,
        },
      },
    ],
  });
  startAppend();
});
// стартовый индекс
let amountQestionsIndex = 0;
// данные с бека
const qestionsArr = [
  { title: 'title1', q: ['question1', 'question2', 'question3'] },
  { title: 'title2', q: ['question1', 'question2', 'question3'] },
  { title: 'title3', q: ['question1', 'question2', 'question3'] },
  { title: 'title4', q: ['question1', 'question2', 'question3'] },
  { title: 'title5', q: ['question1', 'question2', 'question3'] },
  { title: 'title6', q: ['question1', 'question2', 'question3'] },
];

const startAppend = () => {
  if (document.querySelector(`.test-container`)) {
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
  const container = document.querySelector(`.test-container`);
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
    template = endTestTemplate();
  }
  return template;
};
// шаблоны
const questionsTemplate = (data) => `<h1>${data.title}</h1>
<form onsubmit="getFormData();return false" id="qForm">
  ${questions(data)} 
<button type="submit" class="btn--primary"> Ответить </button>
<a href="./index.html" class="btn btn--primary">На главную</a>
</form>
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
    class="btn--radio btn--radio--label"
  />
  <label for="question${i}">${data.q[i]}</label> `;
  }
  return question;
};

// обработка данных формы
const getFormData = () => {
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
      nextPeage();
    }
  });
};

// вспомогательные функции
const prewPage = () => {
  if (amountQestionsIndex > 0) {
    appendElement(amountQestionsIndex - 1);
  }
};
const nextPeage = () => {
  if (amountQestionsIndex < qestionsArr.length) {
    appendElement(amountQestionsIndex + 1);
  }
};

const clearTest = () => {
  localStorage.clear();
  startAppend();
};

// help
const playHeadVideo = (btn) => {
  btn.classList.add('jsHide');
  document.querySelector('#headVideo').play();
};
const stopHeadVideo = () => {
  const btn = document.querySelector('#playHeadBtn');
  btn.classList.remove('jsHide');
  document.querySelector('#headVideo').pause();
};

const spoilerToogle = (el) => {
  $(el).toggleClass('spoiler--opened');
  var animateEL = $(el).children('.spoiler-text-wrapper');
  animateEL.slideToggle(200);
};

const showPopup = (el) => {
  const popup = $('#popup-wrapper');
  const data = $(el).data('popup-index');
  $(`#${data}`).addClass('js-show-popup');
  popup.fadeIn(500);
};

const closePopup = () => {
  const popup = $('#popup-wrapper');
  popup.find('.js-show-popup').removeClass('js-show-popup');
  popup.fadeOut(500);
};

const getScroll = () => {
  const elementHeight = document.querySelector('.head-block-text').offsetHeight;
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
};
