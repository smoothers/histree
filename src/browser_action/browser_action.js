// We don't know what context this runs in, but it seems like we don't have access to the console
// Instead of using console.log in this file, use this method to append messages to the popup
function log(message) {
  var messageLi = document.createElement('li')
  messageLi.textContent = JSON.stringify(message);
  document.getElementById('log').append(messageLi);
}

var exampleTree = {
  url: 'moo.com',
  children: [
    {
      url: 'moo.com/boo',
      children: [
        {
          url: 'power.rangers'
        }
      ]
    },
    {
      url: 'moo.chim',
      children: []
    }
  ]
}



chrome.extension.sendMessage({ from: 'browser_action' }, function(response) {
  // Log the response
  log(response);
});
