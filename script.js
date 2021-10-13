const synth = window.speechSynthesis;
const joke = [];

async function apiRequest() {
  try {
    const request = await fetch(
      "https://backend-omega-seven.vercel.app/api/getjoke"
    );
    const data = await request.json();
    joke[0] = data[0].question;
    joke[1] = data[0].punchline;

    tellJoke();
  } catch (error) {
    console.log(error);
  }
}

function tellJoke() {
  console.log(`Q: ${joke[0]} \n A: ${joke[1]}`);
  const utterQuestion = new SpeechSynthesisUtterance(joke[0]);
  const utterAnswer = new SpeechSynthesisUtterance(joke[1]);

  synth.speak(utterQuestion);
  synth.speak(utterAnswer);
}

apiRequest();
