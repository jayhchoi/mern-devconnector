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
    placeholder: '*Skills'
  },
  {
    name: 'github',
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
