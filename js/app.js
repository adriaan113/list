



let allJobs;
const app = document.querySelector('#app');

let items = [];

async function getJobs(){
    try{
      const result = await fetch('./data.json');
  
      allJobs = await result.json();
      
      for(let i=0;i<allJobs.length;i++){ 

        const logo = allJobs[i].logo;
        const company = allJobs[i].company;
        const position = allJobs[i].position;
        
        let newJob = allJobs[i].new;
        let featured = allJobs[i].featured;

        const level = allJobs[i].level;
        const role = allJobs[i].role;

        if(newJob === true){
          newJob = 'NEW!'
        }else{
          newJob = '';
        }

        if(featured === true){
          featured = 'FEATURED'
        }else{
          featured = ''; 
        }


        const li = document.createElement('LI');
        li.classList.add('job-overview');
        li.innerHTML=
        `
            <img src="${logo}" alt="" class="job-logo">
            <div class="job-description">
              <h2 class="job-description-company">${company}<span>${newJob}</span><span>${featured}</span></h2>
              <h1 class="job-description-position">${position}</h1>
              <ul class="job-description-extra">
                  <li class="job-description-extra-item">${allJobs[i].postedAt}</li>
                  <li class="job-description-extra-item">${allJobs[i].contract}</li>
                  <li class="job-description-extra-item">${allJobs[i].location}</li>
              </ul>
            </div>

            <div>
              <ul class="language-filter">
                <li>${level}</li>
                <li>${role}</li>
              </ul>
            </div>
        `
        app.appendChild(li);  
    }

      removeEmptySpan();

    }catch(error){
      console.log(`sorry, could not load jobs because of ${error}`);
    }
  }

  getJobs().then(()=>{
 
    const ul= document.querySelectorAll('.language-filter')
    let li;

    for(let i=0;i<ul.length;i++){

      for(let j=0;j<allJobs[i].languages.length;j++){
        //console.log(allJobs[i].languages[j]);
        liLanguage= document.createElement('LI');
        liLanguage.innerHTML=`${allJobs[i].languages[j]}`
        ul[i].appendChild(liLanguage);
      }

      for(let j=0;j<allJobs[i].tools.length;j++){
        //console.log(allJobs[i].languages[j]);
        liTools= document.createElement('LI');
        liTools.innerHTML=`${allJobs[i].tools[j]}`
        ul[i].appendChild(liTools);
      }
      
    }
  }).then(()=>{
    const AllLiItems = document.querySelectorAll('.language-filter li');
    const filterMenu = document.querySelector('.filter-menu');
    const ul = document.createElement('UL');

    for(let i=0;i<AllLiItems.length;i++){
      AllLiItems[i].addEventListener('click', (e)=>{
      let li= document.createElement('LI');
      li.textContent = e.target.textContent;
      ul.appendChild(li);
      filterMenu.appendChild(ul);
      items.push(e.target.textContent);
      })
    } 
    //console.log(items);
  }).then(()=>{
    displayFilterItems();
    clearFilter();
  });

  function displayFilterItems() {

    const filter = document.querySelector('.filter-menu');
    const cardItems = document.querySelectorAll('.language-filter');

    for(let i=0;i<cardItems.length;i++){
      cardItems[i].addEventListener('click', (e)=>{
      filter.children[1] += e.target;
      filter.insertBefore(filter.children[1], filter.childNodes[0]);
      compareFilterResults(e);
     });
   }
  };


  function compareFilterResults(e){

    const cardItems = document.querySelectorAll('.language-filter');

    for(let i=0;i<cardItems.length;i++){
      for(let j=0;j<cardItems[i].children.length;j++){
         if(e.target.textContent === cardItems[i].children[j].textContent){
          cardItems[i].children[j].parentElement.parentNode.parentNode.style.display = 'none';
        }else{
          console.log('too fucking bad');
        }
      }
    }
  }

  function removeEmptySpan(){
    const job= document.querySelectorAll('.job-description');

    console.log(job[0].children[0].children[0]);
  };


  function clearFilter(){
    clearBtn = document.querySelector('.filter-menu button');

    clearBtn.addEventListener('click', ()=>{
      const list= document.querySelectorAll('.filter-menu ul li'); 
      const ul= document.querySelector('.filter-menu ul');
      for(let item of list){
        ul.removeChild(item);
        //resetCards();
      }
    })
  } 

  // function resetCards(){

  //   const ul= document.querySelectorAll('.language-filter')
  //   let li;

  //   for(let i=0;i<ul.length;i++){

  //     for(let j=0;j<allJobs[i].languages.length;j++){

  //       liLanguage= document.createElement('LI');
  //       liLanguage.innerHTML=`${allJobs[i].languages[j]}`
  //       ul[i].appendChild(liLanguage);
  //     }

  //     for(let j=0;j<allJobs[i].tools.length;j++){

  //       liTools= document.createElement('LI');
  //       liTools.innerHTML=`${allJobs[i].tools[j]}`
  //       ul[i].appendChild(liTools);
  //     }
      
   // }

  //}// het moet dus zo zijn dat de cards weer terugfloepen als je clear drukt