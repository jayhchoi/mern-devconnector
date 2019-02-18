export const profileFields = [
  {
    name: 'handle',
    type: 'text',
    component: 'input',
    placeholder: '*Profile Handle'
  },
  {
    name: 'status',
    type: 'text',
    component: 'select',
    options: [
      {
        value: '',
        label: '*Select Professional Status'
      },
      {
        value: 'developer',
        label: 'Developer'
      },
      {
        value: 'junior-developer',
        label: 'Junior Developer'
      },
      {
        value: 'senior-developer',
        label: 'Senior Developer'
      }
    ]
  },
  {
    name: 'company',
    type: 'text',
    component: 'input',
    placeholder: 'Company'
  },
  {
    name: 'website',
    type: 'text',
    component: 'input',
    placeholder: 'Website'
  },
  {
    name: 'location',
    type: 'text',
    component: 'input',
    placeholder: 'Location'
  },
  {
    name: 'skills',
    type: 'text',
    component: 'input',
    placeholder: 'e.g. Django,NodeJS,ReactJS,GraphQL',
    label: '*Skills in comma separated form'
  },
  {
    name: 'githubusername',
    type: 'text',
    component: 'input',
    placeholder: 'Github Username'
  },
  {
    name: 'bio',
    type: 'text',
    component: 'textarea',
    placeholder: 'Short Bio of Yourself'
  }
];

export const socialFields = [
  {
    prepend: true,
    icon: 'fab fa-facebook',
    name: 'facebook',
    type: 'text',
    component: 'input',
    placeholder: 'Facebook Page URL'
  },
  {
    prepend: true,
    icon: 'fab fa-twitter',
    name: 'twitter',
    type: 'text',
    component: 'input',
    placeholder: 'Twitter Page URL'
  },
  {
    prepend: true,
    icon: 'fab fa-instagram',
    name: 'instagram',
    type: 'text',
    component: 'input',
    placeholder: 'Instagram Page URL'
  },
  {
    prepend: true,
    icon: 'fab fa-linkedin',
    name: 'linkedin',
    type: 'text',
    component: 'input',
    placeholder: 'LinkIn Profile URL'
  },
  {
    prepend: true,
    icon: 'fab fa-youtube',
    name: 'youtube',
    type: 'text',
    component: 'input',
    placeholder: 'Youtube Page URL'
  }
];

export const experienceFields = [
  {
    name: 'title',
    type: 'text',
    component: 'input',
    placeholder: '*Title'
  },
  {
    name: 'company',
    type: 'text',
    component: 'input',
    placeholder: '*Company'
  },
  {
    name: 'location',
    type: 'text',
    component: 'input',
    placeholder: 'Location'
  },
  {
    name: 'from',
    type: 'date',
    component: 'input',
    label: '*From Date'
  },
  {
    name: 'to',
    type: 'date',
    component: 'input',
    label: 'To Date'
  },
  {
    name: 'current',
    type: 'checkbox',
    component: 'input',
    placeholder: 'Current Job'
  },
  {
    name: 'description',
    type: 'text',
    component: 'textarea',
    placeholder: 'Description'
  }
];

export const educationFields = [
  {
    name: 'school',
    type: 'text',
    component: 'input',
    placeholder: '*School'
  },
  {
    name: 'degree',
    type: 'text',
    component: 'input',
    placeholder: '*Degree'
  },
  {
    name: 'fieldofstudy',
    type: 'text',
    component: 'input',
    placeholder: '*Field of Study'
  },
  {
    name: 'from',
    type: 'date',
    component: 'input',
    label: '*From Date'
  },
  {
    name: 'to',
    type: 'date',
    component: 'input',
    label: 'To Date'
  },
  {
    name: 'current',
    type: 'checkbox',
    component: 'input',
    placeholder: 'Current Education'
  },
  {
    name: 'description',
    type: 'text',
    component: 'textarea',
    placeholder: 'Description'
  }
];
