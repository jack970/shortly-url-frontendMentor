const onSubmit = (e) => {
  e.preventDefault();

  const { value, style } = e.target[0];
  const message = document.querySelector("#message");

  message.innerHTML = "";
  style.border = "";

  if (!value.length) {
    message.innerHTML = "Please add link";
    style.border = "5px solid var(--error)";
  } else {
    fetch(`https://api.shrtco.de/v2/shorten?url=${value}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.ok) {
          const short_link = json.result.full_short_link;
          geraLink(value, short_link);
        } else {
          message.innerHTML = "Ocorreu um erro na requisição com o servidor!";
          style.border = "5px solid var(--error)";
        }
      })
      .catch((error) => console.error(error));
  }
};

const geraLink = (original_link, short_link) => {
  const results_element = document.querySelector(".results");
  const result_card_html = `
          <div class="result-card">
            <a target="_blank" href=${isValidHttpUrl(
              original_link
            )} rel="noopener noreferrer">${isValidHttpUrl(original_link)}</a>
            <div>
              <a target="_blank" rel="noopener noreferrer" href=${short_link} id="short_link">${short_link}</a>
              <button class="sign" onClick="copyClipBoard(event)">Copy</button>
            </div>
          </div>`;

  results_element.insertAdjacentHTML("afterbegin", result_card_html);
};

const isValidHttpUrl = (urlString) => {
  try {
    const url = URL(urlString);
    return url;
  } catch (_) {
    return "https://" + urlString;
  }
};

const copyClipBoard = async (e) => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const currentElement = e.target;
  const copyText = currentElement.parentElement.firstElementChild.innerHTML;

  try {
    await navigator.clipboard.writeText(copyText);
    currentElement.innerHTML = "Copied!";
    currentElement.style.backgroundColor = "var(--dark-violet)";
    console.log("Copied the text: " + copyText);

    await sleep(3000);
    currentElement.style.backgroundColor = "var(--cyan)";
    currentElement.innerHTML = "Copy";
  } catch (_) {
    console.error("Failed to copy");
  }
};

const ativa_menu_dropdown = (e) => {
  const menu_dropdown = document.getElementById("menu");

  if (menu_dropdown.classList.contains("hidden-menu")) {
    menu_dropdown.classList.remove("hidden-menu");
  } else {
    menu_dropdown.classList.add("hidden-menu");
  }
};
