export const subdomains = [
  {
    title: 'Blood Pressure',
    items: [
      { 
        code: 'bm017', 
        text: 'Systolic Reading (mmHg)', 
        inputType: 'number', 
        scoreKey: 'bp_score', 
        weight: 3.7910 // Weight assigned to BP Score
      },
      { 
        code: 'bm018', 
        text: 'Diastolic Reading (mmHg)', 
        inputType: 'number', 
        scoreKey: 'bp_score', 
        weight: 0 // Weight already handled by bm017
      }
    ],
  },
  {
    title: 'Pulse',
    items: [
      { 
        code: 'bm019', 
        text: 'Pulse (bpm)', 
        inputType: 'number', 
        scoreKey: 'pulse_score', 
        weight: 3.4844
      }
    ],
  },
  {
    title: 'Grip Strength',
    items: [
      { 
        code: 'bm028', 
        text: 'Left Hand Measure (kg)', 
        inputType: 'number', 
        scoreKey: 'grip_strength_score', 
        weight: 13.8644
      },
      { 
        code: 'b029', 
        text: 'Right Hand Measure (kg)', 
        inputType: 'number', 
        scoreKey: 'grip_strength_score', 
        weight: 0 
      },
    ],
  },
  {
    title: 'Balance',
    items: [
      // Semi-tandem and Side-by-Side removed as per model
      { 
        code: 'bm049_iwer', 
        text: 'Completed full tandem stand for 30/60 sec?', 
        inputType: 'radio', 
        options: [{label: 'Yes', value: '1'}, {label: 'No', value: '0'}],
        scoreKey: 'passed_full_tandem', 
        weight: 3.8980
      },
    ],
  },
  {
    title: 'Timed Walk',
    items: [
      { 
        code: 'bm056', 
        text: 'Walking speed time (seconds)', 
        inputType: 'number', 
        scoreKey: 'timed_walk_score', 
        weight: 28.6259
      },
    ],
  },
  {
    title: 'Vision Tests',
    items: [
      { 
        code: 'bm060a', 
        text: 'Left eye vision test passed?', 
        inputType: 'radio', 
        options: [{label: 'Yes', value: '1'}, {label: 'No', value: '0'}],
        scoreKey: 'vision_score',
        weight: 0 
      },
      { 
        code: 'bm060b', 
        text: 'Right eye vision test passed?', 
        inputType: 'radio', 
        options: [{label: 'Yes', value: '1'}, {label: 'No', value: '0'}],
        scoreKey: 'vision_score',
        weight: 0 
      },
      { 
        code: 'bm061', 
        text: 'Left eye distance vision (e.g., 20/40)', 
        inputType: 'text',
        scoreKey: 'vision_score',
        weight: 7.0818 // Weight assigned to Vision Score
      },
      { 
        code: 'bm063', 
        text: 'Left eye near vision (e.g., 20/40)', 
        inputType: 'text',
        scoreKey: 'vision_score',
        weight: 0 
      },
      // Add bm062/bm064 if you collect right eye specifics, 
      // but weight sits on the primary input to avoid double counting.
    ],
  },
  {
    title: 'Anthropometry (Waist-to-Hip)',
    items: [
      // Height/Weight removed as BMI was excluded
      { 
        code: 'bm076', 
        text: 'Waist Measurement (cm)', 
        inputType: 'number', 
        scoreKey: 'whr_score', 
        weight: 4.0912
      },
      { 
        code: 'bm079', 
        text: 'Hip Measurement (cm)', 
        inputType: 'number', 
        scoreKey: 'whr_score', 
        weight: 0 
      },
    ],
  },
  // Lung Function removed as per previous instructions
  {
    title: 'Dried Blood Spot Test',
    items: [
      { 
        code: 'hb', 
        text: 'Hemoglobin (g/dL)', 
        inputType: 'number', 
        scoreKey: 'anemia_score', 
        weight: 0.5603
      },
      { 
        code: 'hba1c', 
        text: 'Glycated Hemoglobin (HbA1c %)', 
        inputType: 'number', 
        scoreKey: 'hba1c_score', 
        weight: 22.1970
      },
      { 
        code: 'crp', 
        text: 'C-Reactive Protein (mg/L)', 
        inputType: 'number', 
        scoreKey: 'crp_score', 
        weight: 12.4060
      },
    ],
  },
  {
     title: 'Demographics (Required for Scoring)',
     items: [
       { code: 'gender', text: 'Gender', inputType: 'radio', options: ['Male', 'Female'], weight: 0 },
       // Age is less critical now without Lung Function, but good to keep
       { code: 'age', text: 'Age', inputType: 'number', weight: 0 }
     ]
  }
];