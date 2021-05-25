function saveContent(value, content) {

  let data = {
    date: value,
    content: content
  }
  //console.log("Before save post - ", JSON.stringify(data));
  //var data = `{"date":"${value}","content":"${content}"}`;
  fetch("/save", {
    method: "POST", // or 'PUT'
    headers: {"Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify(data)
  })
    .then((response) => {
      console.log("response - ", response.text());
      return response;
    })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


function saveContentAsync(value, content) {
  let data = {
    date: value,
    content: content
  }
  (async () => {
    const rawResponse = await fetch('http://localhost:3000/save', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const content = await rawResponse.json();
  
    console.log(content);
  })();
}