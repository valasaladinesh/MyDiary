function myDiaryClick() {
    console.log("myDiaryClicked");
    fetch("/mydiary", {
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