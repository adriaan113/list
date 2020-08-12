



let allJobs;
const app = document.querySelector('#app');



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

    let filterMenu = document.querySelector('.filter-menu');

    let items = [];

    for(let i=0;i<AllLiItems.length;i++){
      AllLiItems[i].addEventListener('click', (e)=>{
        //console.log(e.target.textContent);

        items.push(e.target.textContent);
        console.log(items);

       //filterMenu.appendChild(e.target);


              //placeItemsInFilterMenu(e);

              filterItems(items);
      })
    } 
  });




  function removeEmptySpan(){
    const job= document.querySelectorAll('.job-description');

    console.log(job[0].children[0].children[0]);
  }


  // function placeItemsInFilterMenu(e){
    
  //   const filterMenu = document.querySelector('.filter-menu');
  //   const ul = document.createElement('UL');
  //   const li= document.createElement('LI');

  //   li.appendChild(e.target.textContent);

  //   ul.appendChild(li);
  //   filterMenu.appendChild(ul);
  // }




  function filterItems(x){

    //let a = x.indexOf('Frontend');

    let a = x;
    
    if(a[a.length -1] === 'Frontend'){
      console.log(true);
    }else{
      console.log(false);
    }
    
  }