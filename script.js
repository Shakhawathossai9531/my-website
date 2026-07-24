const API_URL = "https://script.google.com/macros/s/AKfycbwplA3LKmgevR1jzLNb5jhhoTSvCc-CpMOlAUXTlPf6dCQJm4qb1Y8pgVYgUZcOcWTR/exec";
let quotes = [];
let current = 0;

async function loadQuotes() {

  try {

    const response = await fetch(API_URL);

    quotes = await response.json();

    console.log(quotes);

    if(quotes.length > 0){
      showQuote();
    }

  } catch(error){

    console.error(error);

    alert("API Connection Error");

  }

}

function showQuote(){

  document.getElementById("name").innerText =
  quotes[current].NAME;

  document.getElementById("quote").innerText =
  quotes[current].QUOTE;

  document.getElementById("category").innerText =
  quotes[current].CATEGORY;

  document.getElementById("image").src =
  quotes[current].IMAGE;

}

function nextQuote(){

  current++;

  if(current >= quotes.length){
    current = 0;
  }

  showQuote();

}
function previousQuote(){

current--;

if(current < 0){
current = quotes.length - 1;
}

showQuote();
}
async function submitComment() {

    const user = document.getElementById("username").value.trim();
    const comment = document.getElementById("comment").value.trim();

    if (!user || !comment) {
        alert("Name এবং Comment লিখুন");
        return;
    }

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                quoteId: quotes[current].ID,
                user: user,
                comment: comment
            })
        });

        const text = await response.text();

        console.log("Status:", response.status);
        console.log("Response:", text);

        alert(text);

        document.getElementById("username").value = "";
        document.getElementById("comment").value = "";

    } catch (error) {

        console.error(error);
        alert("Comment Save Failed");

    }

}
