import React from 'react';
import DomainAssessment from '../components/DomainAssessment';
import { subdomains } from '../data/mentalQuestions'; 

const MentalAssessment = () => {

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

