export const payments = [
  {
    year: '2022',
    payments: [
      {
        type: 'Repayment',
        amount: '+$270',
        date: '21st May 2022',
      },
      {
        type: 'Weekly account keeping fee',
        amount: '-$1.50',
        date: '21st May 2022',
      },
      {
        type: 'Repayment',
        amount: '+$270',
        date: '21st May 2022',
      },
      {
        type: 'Weekly account keeping fee',
        amount: '-$1.50',
        date: '21st May 2022',
      },
      {
        type: 'Repayment',
        amount: '+$270',
        date: '21st May 2022',
      },
    ],
  },
  {
    year: '2021',
    payments: [
      {
        type: 'Repayment',
        amount: '+$270',
        date: '21st May 2022',
      },
      {
        type: 'Weekly account keeping fee',
        amount: '-$1.50',
        date: '21st May 2022',
      },
      {
        type: 'Repayment',
        amount: '+$270',
        date: '21st May 2022',
      },
    ],
  },
] as const;

export const documents = [
  {
    type: 'Account statement',
    date: 'May 2022',
    documentId: 'bab9746b-e8d9-476f-932b-f58fb72557a2',
  },
  {
    type: 'Payout statement',
    date: 'May 2022',
    documentId: '656217b0-e260-48fe-94ed-085ed2ada0d7',
  },
  {
    type: 'Brighte finance contract',
    date: 'May 2022',
    documentId: '34db7708-683e-43de-88d5-35a7fbd58d83',
  },
  {
    type: 'Repayment schedule',
    date: 'May 2022',
    documentId: '534def27-1868-47cd-b041-d34ccb43c9c7',
  },
  {
    type: 'Payment details',
    date: 'May 2022',
    documentId: '7542a7a9-1cb6-4601-a168-d2ea9d4169d9',
  },
] as const;
