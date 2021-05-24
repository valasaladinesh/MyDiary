function contactus() {
    console.log("myDiaryClicked");
    fetch("http://localhost:3000/contactus", {
        method: "GET"
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
  