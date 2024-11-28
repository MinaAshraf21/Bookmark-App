var siteNameInput = document.getElementById("site_name");
var siteUrlInput = document.getElementById("site_url");
var Sites = [];
if (JSON.parse(localStorage.getItem("sitesArray")) !== null)
  Sites = JSON.parse(localStorage.getItem("sitesArray"));

function displayData() {
  cartona = "";
  for (var i = 0; i < Sites.length; i++) {
    cartona += `
            <tr class="text-center">
              <td class="vert-align-middle">${i + 1}</td>
              <td class="vert-align-middle">${
                Sites[i].name.charAt(0).toUpperCase() + Sites[i].name.slice(1)
              }</td>
              <td><a class="btn btn-success" href="https://${
                Sites[i].url
              }" target="_blank"><i class="fa-solid fa-eye pe-1"></i> Visit</a></td>
              <td><a class="btn btn-danger" onclick="deleteSite(${i})"
              }"><i class="fa-solid fa-trash-can pe-1"></i> Delete</a></td>
            </tr>
`;
  }
  document.getElementById("table-body").innerHTML = cartona;
}
function addSite() {
  var site = {
    name: siteNameInput.value.toLowerCase(),
    url: siteUrlInput.value.toLowerCase(),
  };
  for (var i = 0; i < Sites.length; i++) {
    if (Sites[i].name == site.name) {
      alert("this Site already exists");
      return;
    }
  }
  if (!validateInput(siteNameInput) || !validateInput(siteUrlInput)) {
    alert("Site Name must be at least 2 Chars\nSite URL must be a Valid one");
    return;
  }
  document.getElementById("table-body").innerHTML += `<tr class="text-center">
  <td class="vert-align-middle">${Sites.length + 1}</td>
  <td class="vert-align-middle">${
    site.name.charAt(0).toUpperCase() + site.name.slice(1)
  }</td>
  <td><a class="btn btn-success" href="https://${
    site.url
  }" target="_blank"><i class="fa-solid fa-eye pe-1"></i> Visit</a></td>
  <td><a class="btn btn-danger" onclick="deleteSite(${Sites.length})"
  }"><i class="fa-solid fa-trash-can pe-1"></i> Delete</a></td>
</tr>
`;
  Sites.push(site);
  localStorage.setItem("sitesArray", JSON.stringify(Sites));
  clear();
}
function deleteSite(index) {
  Sites.splice(index, 1);
  localStorage.setItem("sitesArray", JSON.stringify(Sites));
  displayData();
}

function clear() {
  siteNameInput.value = null;
  siteUrlInput.value = null;
}

function validateInput(element) {
  var regex = {
    site_name: /^[\w ]{2,29}[\w]$/,
    site_url: /^[a-zA-Z]{2}[\w]*\.[a-zA-Z]{2,}$/,
  };
  var match = regex[element.id].test(element.value);
  if (match == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}

displayData();
