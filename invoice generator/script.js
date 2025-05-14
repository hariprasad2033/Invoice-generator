function updateAmounts() {
  let subtotal = 0;
  document.querySelectorAll("#items tbody tr").forEach(row => {
    const qty = parseFloat(row.querySelector(".qty").value) || 0;
    const rate = parseFloat(row.querySelector(".rate").value) || 0;
    const amount = qty * rate;
    row.querySelector(".amount").textContent = amount.toFixed(2);
    subtotal += amount;
  });

  const tax = subtotal * 0.10;
  const total = subtotal + tax;

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("tax").textContent = tax.toFixed(2);
  document.getElementById("total").textContent = total.toFixed(2);
}

document.getElementById("add-item").addEventListener("click", () => {
  const tbody = document.querySelector("#items tbody");
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td><input type="text" class="desc" /></td>
    <td><input type="number" class="qty" value="1" /></td>
    <td><input type="number" class="rate" value="0" /></td>
    <td class="amount">0</td>
    <td><button class="remove-btn">X</button></td>
  `;
  tbody.appendChild(newRow);
  attachEvents(newRow);
  updateAmounts();
});

function attachEvents(row) {
  row.querySelectorAll("input").forEach(input =>
    input.addEventListener("input", updateAmounts)
  );
  row.querySelector(".remove-btn").addEventListener("click", () => {
    row.remove();
    updateAmounts();
  });
}

document.querySelectorAll("#items tbody tr").forEach(attachEvents);
updateAmounts();
