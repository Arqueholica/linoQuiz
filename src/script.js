const quizContainer = document.getElementById('quiz');
const questionElement = document.getElementById('question');    
const optionsContainer = document.getElementById('options');
const submitButton = document.getElementById('submit');
const resultElement = document.getElementById('result');

let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

const quizData = [
    {
    question: "¿Cuál de estos libros no fue escrito por Julio Verne?",
    options: [
        {text: "La casa de Vapor", correct: false},
        {text: "El hombre invisible", correct: true},
        {text: "El faro del fin del mundo", correct: false}, 
        ],
    },

    {
    question: "Dónde nació Julio Verne?",
    options: [
        {text: "Bélgica", correct: false},
        {text: "Reino Unido", correct: false},
        {text: "Francia", correct: true}, 
        ],
    }, 

    { 
    question: "¿Cuál de estos personajes protagoniza su libro 'De la Tierra a la Luna'?",
     options: [
        {text: "Impey Barbicane", correct: true},
        {text: "El capitán Nemo", correct: false},
        {text: "El capitán Hatteras", correct: false}, 
        ],
    }, 

    { 
    question: "Cuántas leguas recorre el submarino Nautilus en la novela de Verne?",
    options: [
        {text: "30.000 leguas", correct: false},
        {text: "10.000 leguas", correct: false},
        {text: "20.000 leguas", correct: true}, 
        ],
    }, 

    { 
    question: "¿Cuál de estos libros fue escrito por Julio Verne?",
      options: [
        {text: "Los viajes de Gulliver", correct: false},
        {text: "La estrella del Sur", correct: true},
        {text: "La isla del tesoro", correct: false}, 
        ],
    }
    ];
    
function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';
    resultElement.textContent = '';
    selectedOption = null;

    currentQuestion.options.forEach((option, idx) => {
        const optionBtn = document.createElement('button');
        optionBtn.textContent = option.text;
        optionBtn.className = "block w-full text-left px-4 py-2 mb-2 border rounded cursor-pointer hover:bg-blue-100";
        optionBtn.onclick = () => {
            Array.from(optionsContainer.children).forEach(btn => btn.classList.remove('bg-blue-200'));
            optionBtn.classList.add('bg-blue-200');
            selectedOption = idx;
        };
        optionsContainer.appendChild(optionBtn);
    });
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
        resultElement.className = "mt-4 text-green-500 font-semibold";
    } else {
        resultElement.textContent = "Incorrecto.";
        resultElement.className = "mt-4 text-red-500 font-semibold";
    }
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);
};

function showResult() {
    questionElement.textContent = "Quiz finalizado";
    optionsContainer.innerHTML = '';
    submitButton.style.display = 'none';
    resultElement.textContent = `Tu puntaje: ${score} de ${quizData.length}`;
    resultElement.className = "mt-4 text-blue-700 font-bold";
}

showQuestion();

   