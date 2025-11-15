import React from 'react';
import DomainAssessment from '../components/DomainAssessment';
import { subdomains } from '../data/biomarkersQuestions'; // Import the questions

const BiomarkersAssessment = () => {

  return (
    <DomainAssessment
      domainName="biomarkers"
      domainTitle="Biomarkers"
      subdomains={subdomains}
      skipTypeSelection
    />
  );
};

export default BiomarkersAssessment;

