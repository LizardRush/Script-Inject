document.addEventListener('DOMContentLoaded', function() {
  var openTabAndExecuteButton = document.getElementById('unsubAllChannels');

  openTabAndExecuteButton.addEventListener('click', function() {
    chrome.tabs.create({ url: "https://www.youtube.com/feed/channels" }, function(tab) {
      setTimeout(function() {
        chrome.tabs.executeScript(tab.id, {
          code: `
            (async function iife() {
              var UNSUBSCRIBE_DELAY_TIME = 500;
              var runAfterDelay = (fn, delay) => new Promise((resolve, reject) => {
                setTimeout(() => {
                  fn();
                  resolve();
                }, delay);
              });

              var channels = Array.from(document.getElementsByTagName('ytd-channel-renderer'));
              console.log(\`\${channels.length} channels found.\`);

              var ctr = 0;
              for (const channel of channels) {
                channel.querySelector('[aria-label^="Unsubscribe from"]').click();
                await runAfterDelay(async () => {
                  await runAfterDelay(() => {
                    document.querySelector('yt-confirm-dialog-renderer paper-button#confirm-button').click();
                    console.log(\`Unsubscribed \${ctr + 1}/\${channels.length}\`);
                    ctr++;
                  }, UNSUBSCRIBE_DELAY_TIME);
                }, UNSUBSCRIBE_DELAY_TIME);
              }
            })();
          `
        });
      }, 10000); // 10 seconds delay
    });
  });
});
