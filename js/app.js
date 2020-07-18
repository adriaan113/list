



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

        if(newJob === true){
          newJob = 'NEW!'
        }else{
          newJob = '';
        }

        if(featured === true){
          featured = 'FEATURED'
        }else{
          featured = ''; //hier moet je hem gewoon helemaal niet aanmaken. Dan is het probleem al opgelost denk ik.
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
        `
        app.appendChild(li);

        checkNewAndFeatured(i);
      }


    // checkNewAndFeatured();
  
    }catch(error){
      console.log(`sorry, could not load jobs because of ${error}`);
    }
  }

  getJobs();


  // function checkNewAndFeatured(){
  //   const newJobSpanFilled = document.querySelector('.job-description-company span');

  //   if(newJobSpanFilled.textContent.length > 0){
  //     console.log('ja');
  //   }else{
  //     console.log('nee');
  //   }
  // }

  function checkNewAndFeatured(i){
  
    if(allJobs[i].new){
      console.log(true);

    }else{
      console.log(false);

      const newJobSpanFilled = document.querySelectorAll('.job-description-company');
        //newJobSpanFilled[i].style.backgroundColor= 'none';
        newJobSpanFilled[i].removeChild(newJobSpanFilled.children[0]);
     
    }
  }







// new Vue ({
//     el: '#app',
//     data:{
//           //job: satan
//     }
// });