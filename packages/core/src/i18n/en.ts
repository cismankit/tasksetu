export const en = {
  app: {
    name: 'TaskSetu',
    tagline: 'Your life admin, handled.',
  },
  common: {
    continue: 'Continue',
    save: 'Save',
    cancel: 'Cancel',
    search: 'Search',
    back: 'Back',
    next: 'Next',
    done: 'Done',
    share: 'Share',
  },
  onboarding: {
    welcome: 'Welcome to TaskSetu',
    selectLanguage: 'Choose your language',
    selectRegion: 'Where are you based?',
    selectUserType: 'What best describes you?',
  },
  dashboard: {
    pendingTasks: 'Pending tasks',
    upcomingReminders: 'Upcoming reminders',
    missingDocuments: 'Missing documents',
    recommendations: 'Recommended for you',
    quickAction: 'What do you need to do?',
  },
  doc: {
    aadhaar: 'Aadhaar',
    pan: 'PAN Card',
    passport: 'Passport',
    driving_license: 'Driving License',
    voter_id: 'Voter ID',
    birth_certificate: 'Birth Certificate',
    death_certificate: 'Death Certificate',
    income_certificate: 'Income Certificate',
    caste_certificate: 'Caste Certificate',
    domicile_certificate: 'Domicile Certificate',
    marksheet: 'Marksheet',
    degree: 'Degree',
    bank_document: 'Bank Document',
    insurance: 'Insurance',
    medical_prescription: 'Medical Prescription',
    warranty_invoice: 'Warranty / Invoice',
    rental_agreement: 'Rental Agreement',
    property_paper: 'Property Paper',
    other: 'Other',
  },
  tasks: {
    incomeCertificate: 'Income Certificate',
    casteCertificate: 'Caste Certificate',
    domicileCertificate: 'Domicile Certificate',
    scholarshipPack: 'Scholarship Documents',
    studentExamPack: 'Student Exam & Admission',
  },
  recommendations: {
    missingDoc: 'You may need this document',
    nextTask: 'Suggested next step',
    expirySoon: 'Document expiring soon',
  },
};

export type TranslationKeys = typeof en;
export type TranslationSchema = {
  [K in keyof TranslationKeys]: {
    [P in keyof TranslationKeys[K]]: string;
  };
};
