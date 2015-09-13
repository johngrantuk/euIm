Package.describe({
  name: 'eqls',
  summary: "EQLS package for EULife AppChallenge",
  version: '1.0.0'
});

Package.onUse(function (api) {
  api.versionsFrom('0.9.4');
  api.addFiles('eqls.js', 'server');
  api.export('Eqls');
});
