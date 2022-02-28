const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchReult(data.data));
}

const displaySearchReult = phones => {
    const searchResult = document.getElementById('search-result');
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 p-3">
            <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p>Brand : ${phone.brand}</p>
                <button type="button" class="btn btn-info" <button type="button" class="btn btn-info" onclick="loadPhoneDetail('${phone.slug}')">Explore</button>
            </div>
        </div>
        `
        searchResult.appendChild(div);
    });
}

const loadPhoneDetail = PhoneId => {

    const url = `https://openapi.programming-hero.com/api/phone/${PhoneId}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));
}

const displayPhoneDetail = phone => {
    console.log(phone);
    const phoneDetail = document.getElementById('phone-datil');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.name}</h5>
            <p class="card-text">Brand: ${phone.brand}</p>
            <p class="card-text">Release Date: ${phone.releaseDate ? phone.releaseDate : "No Release Date Found"}</p>
        </div>

        <ul class="list-group list-group-flush">
            <li class="list-group-item">Main Features</li>
            <li class="list-group-item">chipSet : ${phone.mainFeatures.chipSet}</li>
            <li class="list-group-item">display : ${phone.mainFeatures.displaySize}</li>
            <li class="list-group-item">Memory : ${phone.mainFeatures.memory}</li>
            <li class="list-group-item">Storage : ${phone.mainFeatures.storage}</li>

        </ul>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Sensors</li>
            <li class="list-group-item">${phone.mainFeatures.sensors.toString()}</li>
        </ul>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Others</li>
            <li class="list-group-item">Bluetooth : ${phone.others.Bluetooth}</li>
            <li class="list-group-item">GPS : ${phone.others.GPS}</li>
            <li class="list-group-item">NFC : ${phone.others.NFC}</li>
            <li class="list-group-item">Radio : ${phone.others.Radio}</li>
            <li class="list-group-item">USB : ${phone.others.USB}</li>
            <li class="list-group-item">WLAN : ${phone.others.WLAN}</li>
        </ul>

    `
    phoneDetail.appendChild(div);
}