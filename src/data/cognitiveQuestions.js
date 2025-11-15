export const subdomains = [
    {
      title: 'General Orientation',
      items: [
        // This single question covers features mh002-mh008. Using mh005 as the primary code.
        {
          code: 'mh005',
          text: "Please tell us today's date in dd/mm/yyyy, today's day, and the location you are present at.",
          inputType: 'text',
          benchmark: null, // Manual scoring needed for text field
          weight: 15.1461,
        },
      ],
    },
    {
      title: 'Word Recall',
      items: [
        // Corresponds to mh012_56
        {
          code: 'mh012_56_a',
          text: 'Display a list of 10 words for 10 seconds. List as many words as you can remember.',
          inputType: 'text',
          benchmark: 5, // Example: must remember at least 5 words
          weight: 11.2137,
        },
        {
          code: 'mh012_56_b',
          text: 'List as many words as you can remember from the list shown in the beginning.',
          inputType: 'text',
          benchmark: 3, // Example: must remember at least 3 words
          weight: 11.2137, // Using same weight for recall part
        },
      ],
    },
    {
      title: 'Verbal Fluency',
      items: [
        // Corresponds to mh017
        {
          code: 'mh017',
          text: 'Displaying a picture and asking user to name the object (verbally).',
          inputType: 'radio',
          options: ['Answered correctly', 'Answered incorrectly'],
          benchmark: 'Answered correctly',
          weight: 1.7228,
        },
      ],
    },
    {
      title: 'Object Naming',
      items: [
        // Corresponds to mh019
        {
          code: 'mh019',
          text: 'Show the first image and ask the user to label it.',
          inputType: 'radio',
          options: ['Answered correctly', 'Answered incorrectly'],
          benchmark: 'Answered correctly',
          weight: 6.9751,
        },
        // Corresponds to mh020
        {
          code: 'mh020',
          text: 'Show the second image and ask the user to label it.',
          inputType: 'radio',
          options: ['Answered correctly', 'Answered incorrectly'],
          benchmark: 'Answered correctly',
          weight: 6.9751, // Using same weight as mh019
        },
      ],
    },
    {
      title: 'Numerical fill ups: math sequences',
      items: [
        // Corresponds to mh021, mh022, mh023
        {
          code: 'mh021',
          text: 'Answer the following: a) 7, 8, _, 10 b) 8, _ , 12, 14 c) 18, 10, 6, _ , 3. The correct sequence is 9, 10, 4.',
          inputType: 'radio',
          options: ['Correct', 'Incorrect'],
          benchmark: 'Correct',
          weight: 11.7293,
        },
      ],
    },
    {
      title: 'Backward counting',
      items: [
        // Corresponds to mh036 and mh038_1
        {
          code: 'mh036',
          text: 'Backward count from 20 to 10 and 100 to 80.',
          inputType: 'radio',
          options: ['Correct', 'Incorrect'],
          benchmark: 'Correct',
          weight: 15.5601,
        },
      ],
    },
    {
      title: 'Serial 7 counting',
      items: [
        // Corresponds to mh040-mh044
        {
          code: 'mh040',
          text: 'Backward count from 100 skipping 7s (e.g., 100, 93, 86...).',
          inputType: 'radio',
          options: ['Correct', 'Incorrect'],
          benchmark: 'Correct',
          weight: 15.8764,
        },
      ],
    },
    {
      title: 'Computation',
      items: [
        // Corresponds to mh046 and mh047
        {
          code: 'mh046',
          text: 'A shop is having a sale and selling all items at half price. Before the sale, a sari costs 300 Rs. How much will it cost in the sale?',
          inputType: 'radio',
          options: ['Answered correctly', 'Answered incorrectly'],
          benchmark: 'Answered correctly',
          weight: 14.0255,
        },
      ],
    },
    {
      title: 'Execution',
      items: [
        // Corresponds to mh051
        {
          code: 'mh051',
          text: 'Do you see this picture? Please draw that picture on this paper.',
          inputType: 'radio',
          options: ['Answered correctly', 'Answered incorrectly'],
          benchmark: 'Answered correctly',
          weight: 7.751,
        },
      ],
    },
  ];