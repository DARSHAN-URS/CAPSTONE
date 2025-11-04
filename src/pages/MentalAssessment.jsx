import React from 'react';
import DomainAssessment from '../components/DomainAssessment';

const MentalAssessment = () => {
  const subdomains = [
    {
      title: 'Social Group',
      items: [
        {
        
          text: 'Are you a part of any Social Group, if yes how many times do they meet?',
          inputType: 'radio',
          options: [' Yes', ' No'],
        },
      ],
    },
    {
      title: 'Social Group Activity',
      items: [
        {
        
          text: 'Thinking about all the organizations, clubs, or societies that you are a member of, how many meetings/regular gathering, if any, do you attend in a year?',
          inputType: 'radio',
          options: [' Very Frequently', ' Rarely'],
        },
      ],
    },
    {
      title: 'Go out or attend events',
      items: [
        {
          
          text: 'How often do you go out to a park and attend cultural events?',
          inputType: 'radio',
          options: [' Very Frequently', ' Rarely'],
        },
      ],
    },
    {
      title: 'Religious Gathering',
      items: [
        {
          
          text: 'Attend religious functions/events such as bhajan/satsang/prayer',
          inputType: 'radio',
          options: [' Very Frequently', ' Rarely'],
        },
      ],
    },
    {
      title: 'Visit Relatives',
      items: [
        {
          
          text: 'How often do you visit your relatives?',
          inputType: 'radio',
          options: [' Very Frequently', ' Rarely'],
        },
      ],
    },
    {
      title: 'Ever Felt Sad',
      items: [
        {
          
          text: 'During the last 12 months, was there ever a time when you felt sad, blue, or depressed for two weeks or more in a row?',
          inputType: 'radio',
          options: [' No', ' Yes'],
        },
      ],
    },
    {
      title: '2 weeks during when you felt sad',
      items: [
        {
          
          text: 'During that time did the feelings usually last all day long, most of the day, about half the day, or less than half the day?',
          inputType: 'radio',
          options: [' Full day or most of the day', ' Half a day or lesser'],
        },
      ],
    },
    {
      title: 'Lose Interest',
      items: [
        {
          
          text: 'Did you lose interest in most things?',
          inputType: 'radio',
          options: [' Yes', ' No'],
        },
      ],
    },
    {
      title: 'Trouble Concentrating and felt more tired',
      items: [
        {
          
          text: 'Do you have trouble concentrating and felt more tired than usual?',
          inputType: 'radio',
          options: [' Yes', ' No'],
        },
      ],
    },
    {
      title: 'Feel Down/ Negative thoughts',
      items: [
        {
          
          text: 'Did you feel down about yourself and have negative thoughts?',
          inputType: 'radio',
          options: [' Yes', ' No'],
        },
      ],
    },
    {
      title: 'Loose Appetite',
      items: [
        {
        
          text: 'Did you lose your appetite during this time?',
          inputType: 'radio',
          options: [' Yes', ' No'],
        },
      ],
    },
    {
      title: 'Increase Appetite',
      items: [
        {
          
          text: 'Did your appetite increase during this time?',
          inputType: 'radio',
          options: [' Yes', ' No'],
        },
      ],
    },
  ];  

  return (
    <DomainAssessment
      domainName="mental"
      domainTitle="Mental"
      subdomains={subdomains}
      skipTypeSelection
    />
  );
};

export default MentalAssessment;

