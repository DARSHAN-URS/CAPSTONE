import React from 'react';
import DomainAssessment from '../components/DomainAssessment';
import { subdomains } from '../data/physicalQuestions'; 

const PhysicalAssessment = () => {
  return (
    <DomainAssessment
      domainName="physical"
      domainTitle="Physical"
      subdomains={subdomains}
      skipTypeSelection
    />
  );
};

export default PhysicalAssessment;