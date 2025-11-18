// All questions are assumed to be filled out with the help of lab assisstant
export const subdomains = [
    {
      title: 'General Orientation',
      items: [
        {
          code: 'mh002', // mh002, mh003, mh004, mh005 corresponds to date, month, year and day respectively
          text: "Please tell us today's date in dd/mm/yyyy and today's day?",
          inputType: 'text',
          benchmark: null, // Manual scoring needed for text field
        },
        {
          code: 'mh007', // mh007, mh008corresponds to city and place
          text: "Please mention Location you are present at: place and city",
          inputType: 'text',
          benchmark: null, // Manual scoring needed for text field
        },
      ],
      weight: 0.265729,
    },
    {
      title: 'Word Recall',
      items: [
        // Ask first
        {
          code: 'mh012_56',
          text: 'Display a list of 10 words for 10 seconds.  Enter how many words could the user recall.',
          inputType: 'text',
          benchmark: 4,
          
        },
        // Ask this question at the end
        {
          code: 'mh012_56',
          text: 'Enter how many words could the user recall from the list shown in the beginning.',
          inputType: 'text',
          benchmark: 3,
          
        }, // mh012_56 is calculated after both questions are answered.
      ],
      weight: 0.204194,
    },
    // NO MORE VERBAL FLUENCY: rita thinks its trash
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
        },
        // Corresponds to mh020
        {
          code: 'mh020',
          text: 'Show the second image and ask the user to label it.',
          inputType: 'radio',
          options: ['Answered correctly', 'Answered incorrectly'],
          benchmark: 'Answered correctly',
        },
      ],
      weight: 0.142491,
    },
    {
      title: 'Arithematic Questions',
      items: [
        
        {
          code: 'mh021',  // Corresponds to mh021, mh022, mh023
          text: 'Answer the following: a) 7, 8, _, 10 b) 8, _ , 12, 14 c) 18, 10, 6, _ , 3. The correct sequence is 9, 10, 4.',
          inputType: 'radio',
          options: ['Correct', 'Incorrect'],
          benchmark: 'Correct',
          
        },
        {
          code: 'mh036',  // Corresponds to mh036 and mh038_1. Any error: seedha 0. To be filled by lab assisstant.
          text: 'Backward count from 20 to 10 and 100 to 80.',
          inputType: 'radio',
          options: ['Correct', 'Incorrect'],
          benchmark: 'Correct',
          
        },
        {
          code: 'mh040',  // Corresponds to mh040, mh041, mh042, mh043, mh044
          text: 'Backward count from 100 skipping 7s upto next 5 numbers (e.g., 100, 93, 86...).',
          inputType: 'radio',
          options: ['Correct', 'Incorrect'],
          benchmark: 'Correct',
          
        },
        {
          code: 'mh046',  // Correponds to mh046 and mh047
          text: 'A shop is having a sale and selling all items at half price. Before the sale, a sari costs 300 Rs. How much will it cost in the sale?',
          inputType: 'radio',
          options: ['Answered correctly', 'Answered incorrectly'],
          benchmark: 'Answered correctly',
          
        },
      ],
      weight: 0.260725,
    },
    
    {  
      title: 'Execution',
      items: [
        // Corresponds to mh051
        {
          code: 'mh051',
          text: 'Do you see this picture? Please draw that picture on this paper.',
          inputType: 'radio',
          options: ['Drew correctly', 'Drew incorrectly'],
          benchmark: 'Drew correctly',
        },
        // Corresponds to mh050
        {
          code: 'mh050',
          text: 'Fold this paper twice, turn it over and hand it back',
          inputType: 'radio',
          options: ['Followed correctly', 'Followed incorrectly'],
          benchmark: 'Followed correctly',
        },
      ],
      weight: 0.126862,
    },
  ];