const quizContainer = document.getElementById('quiz');
const questionElement = document.getElementById('question');    
const optionsContainer = document.getElementById('options');
const submitButton = document.getElementById('submit');

let currentQuestionIndex = 0;
let score = 0;

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


   