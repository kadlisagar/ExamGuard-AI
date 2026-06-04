import { Exam, ExamAttemptResult, Question, StudentLiveStatus, User } from './types';

export const INITIAL_EXAMS: Exam[] = [
  {
    id: 'exam-1',
    name: 'Advanced Artificial Intelligence Concepts',
    subject: 'Computer Science',
    duration: 45,
    questionsCount: 5,
    startTime: '2026-06-05T10:00:00Z',
    endTime: '2026-06-05T12:00:00Z',
    marks: 50,
    negativeMarking: true,
    randomize: false,
    questions: [
      {
        id: 'q1',
        text: 'Which of the following activation functions can mitigate the vanishing gradient problem in deep neural networks?',
        type: 'mcq',
        options: ['Sigmoid', 'Tanh', 'Rectified Linear Unit (ReLU)', 'Linear'],
        correctAnswer: 'Rectified Linear Unit (ReLU)',
        difficulty: 'medium',
        marks: 10
      },
      {
        id: 'q2',
        text: 'Select all features that are typically associated with Transformers (Attention mechanisms) compared to traditional RNNs:',
        type: 'multiselect',
        options: [
          'Parallelizable training paths',
          'Strict reliance on recurrence sequence steps',
          'Self-attention for capturing long-range dependencies',
          'Fixed context window without dynamic weighting'
        ],
        correctAnswer: ['Parallelizable training paths', 'Self-attention for capturing long-range dependencies'],
        difficulty: 'hard',
        marks: 10
      },
      {
        id: 'q3',
        text: 'Explain the difference between Supervised Learning and Unsupervised Learning, describing at least one scenario where Unsupervised Learning would be preferred over Supervised Learning.',
        type: 'subjective',
        difficulty: 'easy',
        marks: 10
      },
      {
        id: 'q4',
        text: 'What search algorithm guarantees finding the shortest path first in an unweighted graph structure?',
        type: 'mcq',
        options: ['Depth First Search (DFS)', 'Breadth First Search (BFS)', 'Greedy Best-First Search', 'A* Search'],
        correctAnswer: 'Breadth First Search (BFS)',
        difficulty: 'easy',
        marks: 10
      },
      {
        id: 'q5',
        text: 'A Neural Network starts overfitting the validation set. Select all practical strategies to directly reduce overfitting:',
        type: 'multiselect',
        options: [
          'Apply L2 regularization (weight decay)',
          'Increase model size and remove dropout layers',
          'Introduce dropout during feed-forward layers',
          'Obtain more high-quality training dataset instances'
        ],
        correctAnswer: ['Apply L2 regularization (weight decay)', 'Introduce dropout during feed-forward layers', 'Obtain more high-quality training dataset instances'],
        difficulty: 'hard',
        marks: 10
      }
    ]
  },
  {
    id: 'exam-2',
    name: 'Relational Database Management Systems & SQL',
    subject: 'Information Technology',
    duration: 60,
    questionsCount: 4,
    startTime: '2026-06-06T14:00:00Z',
    endTime: '2026-06-06T16:00:00Z',
    marks: 40,
    negativeMarking: false,
    randomize: true,
    questions: [
      {
        id: 'db-q1',
        text: 'Which SQL statement is used to remove all records from a table without logging individual row deletions?',
        type: 'mcq',
        options: ['DELETE TABLE', 'DROP TABLE', 'TRUNCATE TABLE', 'REMOVE TABLE'],
        correctAnswer: 'TRUNCATE TABLE',
        difficulty: 'easy',
        marks: 10
      },
      {
        id: 'db-q2',
        text: 'Select the primary characteristics of the ACID properties in transactions:',
        type: 'multiselect',
        options: ['Atomicity', 'Consistency', 'Isolation', 'Durability', 'Availability'],
        correctAnswer: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
        difficulty: 'medium',
        marks: 10
      },
      {
        id: 'db-q3',
        text: 'Describe 3NF (Third Normal Form) and contrast it with BCNF (Boyce-Codd Normal Form) using an illustrative schema candidate.',
        type: 'subjective',
        difficulty: 'hard',
        marks: 10
      },
      {
        id: 'db-q4',
        text: 'Which indexing type is best suited for exact-match key lookups rather than range scans?',
        type: 'mcq',
        options: ['B-Tree Index', 'Bitmap Index', 'Hash Index', 'Clustered Index'],
        correctAnswer: 'Hash Index',
        difficulty: 'medium',
        marks: 10
      }
    ]
  },
  {
    id: 'exam-3',
    name: 'Advanced Software Engineering Methodologies',
    subject: 'Software Engineering',
    duration: 30,
    questionsCount: 3,
    startTime: '2026-06-10T09:00:00Z',
    endTime: '2026-06-10T12:00:00Z',
    marks: 30
  }
];

export const INITIAL_RESULTS: ExamAttemptResult[] = [
  {
    examId: 'exam-legacy-1',
    examName: 'Data Structures and Algorithms Midterm',
    subject: 'Computer Science',
    score: 42,
    maxScore: 50,
    percentage: 84,
    rank: 12,
    totalCandidates: 145,
    timeTaken: '34 mins 20 secs',
    accuracy: 88,
    aiFeedback: {
      strengths: [
        'Excellent understanding of complex tree operations & balanced tree properties.',
        'Perfect score in time-complexity analysis questions.',
        'Accurate application of greedy choice principles.'
      ],
      weaknesses: [
        'Minor calculation errors in dynamic programming space-optimized arrays.',
        'Slight struggle with subjective algorithm trade-offs descriptions.'
      ],
      suggestions: [
        'Practice mapping out 2D grid DP tables before drafting recursive paths.',
        'Review the amortized cost proof for self-balancing structures to strengthen short answers.'
      ]
    },
    subjectAnalysis: [
      { subject: 'Trees & Graphs', score: 95, average: 72 },
      { subject: 'Dynamic Programming', score: 68, average: 55 },
      { subject: 'Big-O Analysis', score: 100, average: 81 },
      { subject: 'Sorting & Searching', score: 85, average: 74 }
    ]
  },
  {
    examId: 'exam-legacy-2',
    examName: 'Introduction to Cloud Architectures',
    subject: 'Cloud Computing',
    score: 27,
    maxScore: 30,
    percentage: 90,
    rank: 4,
    totalCandidates: 98,
    timeTaken: '18 mins 10 secs',
    accuracy: 92,
    aiFeedback: {
      strengths: [
        'Demonstrated mastery of microservices connectivity over Virtual Networks.',
        'Strong knowledge of multi-region fault tolerance techniques.'
      ],
      weaknesses: [
        'Confused cloud storage tiers properties in low-frequency backup scenarios.'
      ],
      suggestions: [
        'Examine AWS S3 glacier vs deep archive retention constraints.'
      ]
    },
    subjectAnalysis: [
      { subject: 'Network Virtualization', score: 100, average: 68 },
      { subject: 'Compute & Auto-Scaling', score: 90, average: 72 },
      { subject: 'Cloud Storage Tiering', score: 75, average: 60 }
    ]
  }
];

export const LIVE_STUDENTS_MOCK: StudentLiveStatus[] = [
  { id: '1', name: 'James Carter', riskScore: 82, currentQuestion: 'Q4 (In Progress)', status: 'online', alertsCount: 3, latestViolation: 'Tab Switching Detected', avatarColor: 'bg-emerald-100 text-emerald-800' },
  { id: '2', name: 'Sophia Lin', riskScore: 12, currentQuestion: 'Q5 (Complete)', status: 'online', alertsCount: 0, avatarColor: 'bg-indigo-100 text-indigo-800' },
  { id: '3', name: 'Arjun Mehta', riskScore: 95, currentQuestion: 'Q2 (Analyzing)', status: 'online', alertsCount: 6, latestViolation: 'Multiple Faces Detected', avatarColor: 'bg-amber-100 text-amber-800' },
  { id: '4', name: 'Emily Watson', riskScore: 4, currentQuestion: 'Q4 (In Progress)', status: 'online', alertsCount: 0, avatarColor: 'bg-rose-100 text-rose-800' },
  { id: '5', name: 'David Kim', riskScore: 45, currentQuestion: 'Q1 (Complete)', status: 'away', alertsCount: 1, latestViolation: 'Mobile Phone Detected', avatarColor: 'bg-violet-100 text-violet-800' },
  { id: '6', name: 'Sarah Ahmed', riskScore: 8, currentQuestion: 'Q3 (In Progress)', status: 'online', alertsCount: 0, avatarColor: 'bg-teal-100 text-teal-800' }
];

export const INITIAL_QUESTION_BANK = [
  { id: 'qb-1', question: 'What is the runtime complexity of Breadth-First Search on a graph G(V, E)?', type: 'mcq', difficulty: 'easy', marks: 5 },
  { id: 'qb-2', question: 'Identify all standard database anomalies solved by normal forms:', type: 'multiselect', difficulty: 'medium', marks: 10 },
  { id: 'qb-3', question: 'Write a TypeScript function that deep copies a nested object reference.', type: 'subjective', difficulty: 'hard', marks: 15 },
  { id: 'qb-4', question: 'Which HTTP status code is returned for a successful request that created a new resource?', type: 'mcq', difficulty: 'easy', marks: 5 },
  { id: 'qb-5', question: 'Select all mechanisms that maintain mutual exclusion in concurrent applications:', type: 'multiselect', difficulty: 'hard', marks: 10 }
];
