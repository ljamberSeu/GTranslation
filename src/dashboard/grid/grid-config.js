
export const headCells = [
  {
    id: 'original',
    numeric: true,
    disablePadding: true,
    label: 'Original string',
    sortabled: true,
  },
  {
    id: 'gptTranslation',
    numeric: false,
    disablePadding: false,
    label: 'GPT Translation',
    sortabled: true,
  },
  {
    id: 'devComment',
    numeric: true,
    disablePadding: false,
    label: 'Dev comment',
    sortabled: true,
  },
  {
    id: 'stringOwner',
    numeric: true,
    disablePadding: false,
    label: 'String owner',
    sortabled: true,
  },
  {
    id: 'reviewer',
    numeric: true,
    disablePadding: false,
    sortabled: true,
    label: 'Lasted reviewer',
  },
  {
    id: 'finalTranslation',
    numeric: true,
    disablePadding: false,
    sortabled: true,
    label: 'Final translation',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    sortabled: true,
    label: 'Status',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    sortabled: false,
    label: 'Actions',
  },
];