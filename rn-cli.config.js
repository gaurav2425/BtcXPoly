require('react-native-get-random-values');
global.Buffer = require('buffer').Buffer;

module.exports = {
  resolver: {
    extraNodeModules: require('node-libs-react-native'),
  },
};
