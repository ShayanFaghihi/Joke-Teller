const jokeBox = document.querySelector(".box");
const jokeQuestion = jokeBox.querySelector(".box-question");
const jokeAnswer = jokeBox.querySelector(".box-answer");
const loader = document.querySelector(".loader");
const reload = document.querySelector(".reload");
const synth = window.speechSynthesis;
const joke = [];

async function apiRequest() {
  jokeQuestion.innerText = "";
  jokeAnswer.innerText = "";
  loader.style.display = "block";
  try {
    const request = await fetch(
      "https://backend-omega-seven.vercel.app/api/getjoke"
    );
    if (request.ok) {
      const data = await request.json();
      joke[0] = data[0].question;
      joke[1] = data[0].punchline;
    }

    tellJoke();
  } catch (error) {
    console.log(error);
  }
  loader.style.display = "none";
}

function tellJoke() {
  jokeQuestion.innerText = `Q: ${joke[0]}`;
  jokeAnswer.innerText = `A: ${joke[1]}`;

  const utterQuestion = new SpeechSynthesisUtterance(joke[0]);
  const utterAnswer = new SpeechSynthesisUtterance(joke[1]);

  synth.speak(utterQuestion);
  synth.speak(utterAnswer);
}

apiRequest();

reload.addEventListener("click", apiRequest);
