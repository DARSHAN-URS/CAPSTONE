import React from 'react';
import DomainAssessment from '../components/DomainAssessment';
import { subdomains } from '../data/cognitiveQuestions'; 

const CognitiveAssessment = () => {

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

