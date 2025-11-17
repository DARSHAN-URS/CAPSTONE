export const subdomains = [
    {
      title: 'Blood Pressure',
      items: [
        { code: 'bm017', text: 'Systolic Reading', inputType: 'text', weight: },
        { code: 'bm018', text: 'Diastolic Reading', inputType: 'text', weight: },
        { code: 'bm019', text: 'Pulse', inputType: 'text', weight: }
      ],
    },
    {
      title: 'Grip Strength',
      items: [
        {  code: 'bm028', text: 'Left Hand Measure', inputType: 'text' },
        {  code: 'bm029', text: 'Right Hand Measure', inputType: 'text' },
      ],
    },
    {
      title: 'Balance',
      items: [
        {  text: 'Completed semi tandem for 10 sec', inputType: 'text' },
        {  text: 'Completed side by side for 10 sec', inputType: 'text' },
        {  text: 'Completed full tandem for 30/60 sec', inputType: 'text' },
      ],
    },
    {
      title: 'Timed Walk',
      items: [
        {  text: 'Walking speed time', inputType: 'text' },
      ],
    },
    {
      title: 'Vision Tests',
      items: [
        {  text: 'Left eye vision', inputType: 'radio', options: ['0. No', '1. Yes'] },
        {  text: 'Right eye vision', inputType: 'radio', options: ['0. No', '1. Yes'] },
      ],
    },
    {
      title: 'Distance/Near Vision',
      items: [
        {  text: 'Left eye distance vision', inputType: 'text' },
        {  text: 'Right eye near vision', inputType: 'text' },
      ],
    },
    {
      title: 'Anthropometry',
      items: [
        {  text: 'Height', inputType: 'text' },
        {  text: 'Weight', inputType: 'text' },
        {  text: 'Waist Measurement', inputType: 'text' },
        {  text: 'Hip Measurement', inputType: 'text' },
      ],
    },
    {
      title: 'Lung Function Test',
      items: [
        { code: 'fev1fvc', text: 'FEV1/FVC Ratio', inputType: 'text' },
        { code: 'pre_fvc_gli', text: 'Predicted FVC (GLI)', inputType: 'text' },
        { code: 'repeatable', text: 'If test was repeatable', inputType: 'text' },
      ],
    },
    {
      title: 'Dried Blood Spot Test',
      items: [
        { code: 'hb', text: 'Hemoglobin', inputType: 'text' },
        { code: 'hba1c', text: 'Glycated Hemoglobin (HbA1c)', inputType: 'text' },
        { code: 'crp', text: 'C-Reactive Protein', inputType: 'text' },
      ],
    },
  ];
