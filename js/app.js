// calling seacr button 
const searchPhone = () => {
        const searchField = document.getElementById('search-field');
        const searchText = searchField.value;
        // clear data 
        searchField.value = '';
        // error msg 
        if (searchText == '') {
            alert("Please Write Something To Display")
        } else {
            const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

            fetch(url)
                .then(res => res.json())
                .then(data => displaySearchReult(data.data));
        }
    }
    // search result 
const displaySearchReult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const phoneDetail = document.getElementById('phone-datil');
    // clear data 
    phoneDetail.textContent = '';
    // error msg
    const errorMsg = document.getElementById('error-msg');
    if (phones.length == 0) {
        errorMsg.style.display = 'block';
    } else {
        errorMsg.style.display = 'none';
        // added div
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100 pt-4 shadow rounded">
                <img src="${phone.image}" class="card-img-top img-fluid w-50 mx-auto" alt="...">
                <div class="card-body">
                    <h5 class="card-title ps-5">${phone.phone_name}</h5>
                    <p class="ps-5">Brand : ${phone.brand}</p>
                    <button type="button" class="ms-5 px-4 btn btn-dark btn-sm" <button type="button" class="btn btn-info" onclick="loadPhoneDetail('${phone.slug}')">Explore</button>
                </div>
            </div>
            `
            searchResult.appendChild(div);
        });
    }

}

// load data 
const loadPhoneDetail = PhoneId => {

    const url = `https://openapi.programming-hero.com/api/phone/${PhoneId}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));
}

const displayPhoneDetail = phone => {
    console.log(phone);
    // show datails 
    const phoneDetail = document.getElementById('phone-datil');
    // clear data 
    phoneDetail.textContent = '';
    // added div 
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${phone.image}" class="card-img-top img-fluid w-50 mx-auto py-4" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.name}</h5>
            <p class="card-text">Brand: ${phone.brand}</p>
            <p class="card-text">Release Date: ${phone.releaseDate ? phone.releaseDate : "Release Date Not Found"}</p>
        </div>
        // Main Features
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><b>Main Features</b></li>
            <li class="list-group-item">chip Set : ${phone.mainFeatures.chipSet}</li>
            <li class="list-group-item">Display : ${phone.mainFeatures.displaySize}</li>
            <li class="list-group-item">Memory : ${phone.mainFeatures.memory}</li>
            <li class="list-group-item">Storage : ${phone.mainFeatures.storage}</li>
        
        </ul>
        // Sensors
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><b>Sensors</b></li>
            <li class="list-group-item">${phone.mainFeatures.sensors.toString()}</li>
        </ul>

        // Others Features
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><b>Others</b></li>
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