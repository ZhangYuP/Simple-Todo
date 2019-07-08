var AV = require('leancloud-storage');

var APP_ID = 'cYc0s0wraLNbPuKaAmN2smLT-gzGzoHsz';
var APP_KEY = '20F8YLbSIRQiopXIScbF6apv';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV

export function signUp(username, password, successFn, errorFn){
  var user = new AV.User()
  user.setUsername(username)
  user.setPassword(password)
  user.signUp().then(function(loggedInUser){
    let user = getUserFromAVUser(loggedInUser)
    successFn.call(null, user)
  }, function(error){
    errorFn.call(null, error)
  })
}

function getUserFromAVUser(AVUser){
  return {
    id: AVUser.id,
    ...AVUser.attributes
  }
}