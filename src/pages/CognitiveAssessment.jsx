import React from 'react';
import DomainAssessment from '../components/DomainAssessment';

const CognitiveAssessment = () => {
  const subdomains = [
    {
      title: 'General',
      items: [
        {
          
          text: "Please tell us today's date in dd/mm/yyyy, today's day and the location you are present at?",
          inputType: 'text',
        },
      ],
    },
    {
      title: 'Word Recall',
      items: [
        {
          
          text: 'Display a list of 10 words for 10 seconds. List as many words as you can remember (to be asked at the end again).',
          inputType: 'text',
        },
        {
          
          text: 'List as many words as you can remember from the list shown in the beginning.',
          inputType: 'text',
        },
      ],
    },
    {
      title: 'Verbal Fluency',
      items: [
        {
          
          text: 'Displaying a picture and asking user to name the object (verbally).',
          inputType: 'radio',
          options: ['Answered correctly', 'Answered incorrectly'],
        },
      ],
    },
    {
      title: 'Object Naming',
      items: [
        {
          text: 'Show two images and label them.',
          inputType: 'radio',
          options: ['Answered correctly', 'Answered incorrectly'],
        },
        {
          text: 'Show two images and label them.',
          inputType: 'radio',
          options: ['Answered correctly', 'Answered incorrectly'],
        },
      ],
    },
    {
      title: 'Number Series',
      items: [
        {
          text: 'Answer the following: a) 7, 8, _, 10   b) 8, _ , 12, 14   c) 18, 10, 6, _ , 3',
          inputType: 'radio',
          options: [
            '1) 9, 10, 5',
            '2) 9, 10, 4',
          ],
        },
      ],
    },
    {
      title: 'Backward Counting',
      items: [
        {
          text: 'Backward count from 20 to 10 and 100 to 80.',
          inputType: 'text',
        },
      ],
    },
    {
      title: 'Serial 7s Subtraction',
      items: [
        {
          text: 'Backward count from 100 skipping 7s.',
          inputType: 'text',
        },
      ],
    },
    {
      title: 'Computation',
      items: [
        {
          text: 'A shop is having a sale and selling all items at half price. Before the sale, a sari costs 300 Rs. How much will it cost in the sale?',
          inputType: 'radio',
          options: ['Answered correctly', 'Answered incorrectly'],
        },
      ],
    },
    {
      title: 'Drawing',
      items: [
        {
          text: 'Do you see this picture? Please draw that picture on this paper.',
          inputType: 'radio',
          options: ['Answered correctly', 'Answered incorrectly'],
        },
      ],
    },
  ];

  return (
    <DomainAssessment
      domainName="cognitive"
      domainTitle="Cognitive"
      subdomains={subdomains}
      skipTypeSelection
    />
  );
};

export default CognitiveAssessment;

