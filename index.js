const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

document.getElementById('upload-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const mangaTitle = document.getElementById('manga-title').value;
  const mangaDescription = document.getElementById('manga-description').value;
  const mangaLink = document.getElementById('manga-link').value;

  const recaptchaResponse = grecaptcha.getResponse();
  if (recaptchaResponse.length === 0) {
    alert("Please complete the CAPTCHA.");
    return;
  }

  if (!mangaLink) {
    alert("Please provide a Google Drive link.");
    return;
  }

  firestore.collection('mangas').add({
    title: mangaTitle,
    description: mangaDescription,
    fileUrl: mangaLink
  }).then(() => {
    alert("Manga link submitted successfully!");

    const mangaItem = document.createElement('div');
    mangaItem.classList.add('manga-item');
    mangaItem.innerHTML = `
      <h3>${mangaTitle}</h3>
      <p>${mangaDescription}</p>
      <div class="manga-media">
        <iframe src="https://drive.google.com/file/d/${mangaLink.split('/d/')[1].split('/')[0]}/preview" width="100%" height="500px" frameborder="0"></iframe>
      </div>
      <a href="${mangaLink}" target="_blank">Download Manga</a>
    `;
    document.getElementById('manga-items').appendChild(mangaItem);

  }).catch((error) => {
    console.error("Error saving metadata:", error);
    alert("Failed to submit manga link.");
  });
});

const mangaTitle = "Sample Manga";
const mangaDescription = "A great manga to read!";
const mangaLink = "https://drive.google.com/file/d/1oh9oVlgzghm3OeX8DCHz2WC2obuVkH3u/view?usp=sharing";

firestore.collection('mangas').add({
  title: mangaTitle,
  description: mangaDescription,
  fileUrl: mangaLink
}).then(() => {
  const mangaItem = document.createElement('div');
  mangaItem.classList.add('manga-item');
  mangaItem.innerHTML = `
    <h3>${mangaTitle}</h3>
    <p>${mangaDescription}</p>
    <div class="manga-media">
      <iframe src="https://drive.google.com/file/d/${mangaLink.split('/d/')[1].split('/')[0]}/preview" width="100%" height="500px" frameborder="0"></iframe>
    </div>
    <a href="${mangaLink}" target="_blank">Download Manga</a>
  `;
  document.getElementById('manga-items').appendChild(mangaItem);
});
