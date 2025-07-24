document.addEventListener('DOMContentLoaded', function() {
  const quizContainer = document.getElementById('quiz');
  const questionElement = document.getElementById('question');    
  const optionsContainer = document.getElementById('options');
  const submitButton = document.getElementById('submit');
  const resultElement = document.getElementById('result');

  const resetButton = document.getElementById('reset');
  const backButton = document.getElementById('back');

  let currentQuestionIndex = 0;
  let score = 0;
  let selectedOption = null;
  let quizData = [];

  function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';
    resultElement.textContent = '';
    selectedOption = null;

    currentQuestion.options.forEach((option, idx) => {
        const optionBtn = document.createElement('button');
        optionBtn.textContent = option.text;
        optionBtn.className = "block w-full text-left px-4 py-2 mb-2 border rounded cursor-pointer hover:bg-yellow-400";
        optionBtn.onclick = () => {
            Array.from(optionsContainer.children).forEach(btn => {
                btn.classList.remove('bg-yellow-200');
                btn.classList.remove('ring-2');
            });
            optionBtn.classList.add('bg-yellow-200');
            optionBtn.classList.add('ring-2');
            selectedOption = idx;
        };
        optionsContainer.appendChild(optionBtn);
    });
    if (backButton) {
        backButton.onclick = function() {
            quizContainer.classList.add('hidden');
            const welcomeDiv = document.getElementById('welcomeElements');
            if (welcomeDiv) welcomeDiv.style.display = '';
        };
    }
  }

  submitButton.onclick = function() {
    if (selectedOption === null) {
        resultElement.textContent = "Por favor, selecciona una opción.";
        resultElement.className = "mt-4 text-red-500 font-semibold";
        return;
    }
    const correct = quizData[currentQuestionIndex].options[selectedOption].correct;
    if (correct) {
        score++;
        resultElement.textContent = "¡Correcto!";
        resultElement.className = "mt-4 text-green-500 font-bold";
    } else {
        resultElement.textContent = "Incorrecto.";
        resultElement.className = "mt-4 text-red-500 font-bold";
    }
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1500);
  };

  function showResult() {
    questionElement.textContent = "Quiz finalizado";
    optionsContainer.innerHTML = '';
    submitButton.style.display = 'none';
    resultElement.textContent = `Tu puntaje: ${score} de ${quizData.length}`;
    resultElement.className = "mt-4 text-blue-700 font-bold";
  }

  quizContainer.classList.add('hidden');

  function cargarNivel(nivel) {
    let script;
    if (nivel === 1) script = linoquiz_plugin_url + 'assets/js/preguntasNivel1.js';
    else if (nivel === 2) script = linoquiz_plugin_url + 'assets/js/preguntasNivel2.js';
    else if (nivel === 3) script = linoquiz_plugin_url + 'assets/js/preguntasNivel3.js';
    if (script) {
        const s = document.createElement('script');
        s.src = script;
        s.onload = function() {
            quizData = window['preguntasNivel' + nivel];
            currentQuestionIndex = 0;
            score = 0;
            selectedOption = null;
            const welcomeDiv = document.getElementById('welcomeElements');
            if (welcomeDiv) welcomeDiv.style.display = 'none';
            quizContainer.classList.remove('hidden');
            showQuestion();
        };
        document.body.appendChild(s);
    }
  }

  document.getElementById('nivel1').onclick = function() { cargarNivel(1); };
  document.getElementById('nivel2').onclick = function() { cargarNivel(2); };
  document.getElementById('nivel3').onclick = function() { cargarNivel(3); };

  resetButton.onclick = function() {
    currentQuestionIndex = 0;
    score = 0;
    selectedOption = null;
    submitButton.style.display = 'block';
    showQuestion();
    resultElement.textContent = '';
  };
});
