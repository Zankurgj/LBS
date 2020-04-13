document.addEventListener('DOMContentLoaded', function () {
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
