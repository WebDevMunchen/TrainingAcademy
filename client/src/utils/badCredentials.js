export const badCredentials = () => {
  const modal = document.getElementById("badCredentials");
  if (modal) {
      modal.showModal();
  } else {
      console.error("Modal element not found!");
  }
};