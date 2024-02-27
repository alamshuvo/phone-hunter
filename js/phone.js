const loadPhone=async (searchPhone,isShowAll)=>{
const res=await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`)
const data=await res.json();
const phones=data.data;
displayPhones(phones,isShowAll);

}

const displayPhones=(phones,isShowAll)=>{
    const phoneContainer=document.getElementById("phone-container");
    phoneContainer.innerText='';
    // console.log(phones.length);
    const showAllContainer=document.getElementById("show-all-container");

    if (phones.length>12 && !isShowAll) {
        showAllContainer.classList.remove("hidden");
        
    }
    else{
        showAllContainer.classList.add("hidden")
    }
   if (!isShowAll) {
    phones=phones.slice(0,12);    
   }
  phones.forEach(phone => {
//   console.log(phone);
   const phoneCard=document.createElement('div');
   phoneCard.classList =`card p-4 bg-gray-100 shadow-xl`;
   phoneCard.innerHTML =`
   <figure><img src="${phone.image
   }" alt="phone" /></figure>
   <div class="card-body">
     <h2 class="card-title">${phone.phone_name}</h2>
     <p>If a dog chews shoes whose shoes does he choose?</p>
     <div class="card-actions justify-center">
       <button onclick="handleShowEvnet('${phone.slug}')" class="btn btn-primary">Show Details</button>
     </div>
   </div>
   `;
   phoneContainer.appendChild(phoneCard);
 
  
 });
 loadingDots(false);
}
const handleShowEvnet=async (id)=>{
    // console.log(id);
    // load single phone data
    const res=await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const phone=await res.json();
    phoneDetails(phone);
}
const phoneDetails=(phone)=>{
    console.log(phone.data.others);
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.data.name;
    // console.log(phoneName);
    const showDetailContainer=document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `   
    <img src="${phone.data.image}"alt="" />
    <p><span>storage:${phone.data.mainFeatures.storage}</span></p>
    <p><span>display Size:${phone.data.mainFeatures.displaySize}</span></p>
    <p><span>chipSet:${phone.data.mainFeatures.chipSet}</span></p>
    <p><span>memory:${phone.data.mainFeatures.memory}</span></p>
    <p><span>WLAN:${phone.data.others.WLAN}</span></p>
    <p><span>Bluetooth:${phone.data.others.Bluetooth}</span></p>
    <p><span>GPS:${phone.data.others.GPS}</span></p>
    <p><span>NFC:${phone.data.others.NFC}</span></p>
    <p><span>Radio:${phone.data.others.Radio}</span></p>
   
    `
    const showModalDetal=document.getElementById('modal-details');
    showModalDetal.innerText =`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.`
     
    showDetailsModal.showModal()
}
const handleSearch=(isShowAll)=>{
    loadingDots(true);
    const searchField=document.getElementById("searchField");
    const searchText=searchField.value;
    loadPhone(searchText,isShowAll);
  
}
const loadingDots=(isLoading)=>{
    const loadingElement=document.getElementById('loading');
    
  if (isLoading) {
    loadingElement.classList.remove('hidden')
  }
  else{
    loadingElement.classList.add('hidden')
  }
 
}
const handleShowAll=()=>{
    handleSearch(true);
}

loadPhone();