// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => console.log('Service Worker Registered'))
      .catch((error) => console.error('Service Worker Registration Failed:', error));
  }
  
  // Install button logic
  let deferredPrompt;
  const installBtn = document.getElementById('install-btn');
  
  // Listen for the beforeinstallprompt event
  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent the default install prompt
    e.preventDefault();
    deferredPrompt = e;

    // Show the install button
    installBtn.hidden = false;

    installBtn.addEventListener("click", () => {
      // Show the install prompt
      deferredPrompt.prompt();

      // Handle the user's choice
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }

        // Clear the deferred prompt
        deferredPrompt = null;
      });
    });
  });

  // Hide the install button once installed
  window.addEventListener("appinstalled", () => {
    console.log("PWA installed");
    installBtn.hidden = true;
  });
