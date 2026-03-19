const commitTypes = [
  '🎉 Init',
  '✨ Feat',
  '🐛 Fix',
  '♻️ Refactor',
  '🔧 Chore',
  '🎨 Style',
  '📝 Docs',
  '🔀 Merge',
  '🚚 Rename',
  '🔥 Remove',
];

module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern:
        /^(\S+\s(?:Init|Feat|Fix|Refactor|Chore|Style|Docs|Merge|Rename|Remove)):\s(.+)$/,
      headerCorrespondence: ['type', 'subject'],
    },
  },
  rules: {
    'type-enum': [2, 'always', commitTypes],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'body-leading-blank': [2, 'always'],
    'body-max-line-length': [2, 'always', 72],
  },
};
