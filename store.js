const store = {
    questions: [
      {
        question: 'On average, how many hours a day does a newborn need to sleep?',
        answers: [
          '8 hours',
          '12 hours',
          '17 hours',
          '21 hours'
        ],
        correctAnswer: '17 hours'
      },
      {
        question: 'What is the term for when a baby sleeps a lot during the day and is wakeful at night?',
        answers: [
          'Reverse cycling',
          'Night alertness',
          'Day cycling',
          'Night waking'
        ],
        correctAnswer: 'Reverse cycling'
      },
      {
        question: 'How does white noise help infants sleep better?',
        answers: [
          'The sound reminds them of being in the womb',
          'Drowns out other sounds to keep them from waking',
          'Associating it with a bedtime routine helps them fall asleep',
          'All of the above'
        ],
        correctAnswer: 'All of the above'
      },
      {
        question: 'At what age are most babies able to sleep through the night?',
        answers: [
          '1-3 months',
          '4-6 months',
          '7-10 months',
          '11-13 months'
        ],
        correctAnswer: '4-6 months'
      },
      {
        question: 'Which of these is a sign baby is tired and ready for a nap?',
        answers: [
          'Shaking their head side to side',
          'Blinking a lot',
          'Pulling their ears',
          'Frowning'
        ],
        correctAnswer: 'Pulling on their ears'
      }
    ],
    quizStarted: false,
    questionNumber: 0,
    score: 0
  };