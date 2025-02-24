async function generateSQL() {
  const query = document.getElementById("queryInput").value;
  const outputDiv = document.getElementById("output");
  const loader = document.getElementById("loader");

  if (!query.trim()) {
    alert("Please enter a query!");
    return;
  }

  outputDiv.style.display = "none";
  loader.style.display = "block";

  try {
    const response = await fetch(
      "https://xcalibre-assingment.onrender.com/hospitalAi/query",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ naturalQuery: query }),
      }
    );

    const data = await response.json();
    loader.style.display = "none";
    outputDiv.style.display = "block";

    if (data.error) {
      outputDiv.textContent = "Error: " + data.error;
      outputDiv.style.color = "red";
    } else {
      outputDiv.textContent = JSON.stringify(data);
      outputDiv.style.color = "black";
    }
  } catch (error) {
    loader.style.display = "none";
    outputDiv.style.display = "block";
    outputDiv.textContent = "Error: Failed to fetch data";
    outputDiv.style.color = "red";
  }
}
