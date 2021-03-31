'use strict'
{
  class panel {
    constructor(){
      
      const section =document.createElement('div');
      section.classList.add('panel');
      
      this.img = document.createElement('img');
      this.img.src = this.getRabomImage();
      
      this.timeoutId = undefined;
      

      this.stop = document.createElement('div');
      // this.stop.textContent = 'STOP';
      this.stop.classList.add('stop', 'inactive');
      this.stop.addEventListener('click', () => {
        if (this.stop.classList.contains('inactive')){
          return ;
        }
        this.stop.classList.add('inactive');
     
        clearTimeout(this.timeoutId);
        
        panlsLeft--;
        
        if (panlsLeft === 0) {
          start.classList.remove('inactive');
          push.classList.remove('inactive');
          panlsLeft = 3;
          checkResult();
        }
      });

      section.appendChild(this.img);
      section.appendChild(this.stop);

      const slotwapper = document.getElementById('slot-wapper');
      slotwapper.appendChild(section);

    }

      getRabomImage() {
        const images = [
          'img/slot1.jpg',
          'img/slot2.jpg',
          'img/slot3.jpg',
          'img/slot4.jpg',
        ];

        return images[Math.floor(Math.random() * images.length)];
      }

      spin(){
        this.img.src = this.getRabomImage();
        this.timeoutId = setTimeout(() => {
          this.spin();
        },50);
      }
    
      isUnmatched(p1,p2){
        return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
      }

      unmatch(){
        this.img.classList.add('unmatch');
      }

      isMatched(p1,p2){
        return this.img.src === p1.img.src && this.img.src === p2.img.src;
      }

      activate() {
        this.img.classList.remove('unmatch');
        this.stop.classList.remove('inactive');
      }
  }

  function checkResult() {
    if (panels[0].isUnmatched(panels[1], panels[2])) {
      panels[0].unmatch();
    }
    
    if (panels[1].isUnmatched(panels[0], panels[2])) {
      panels[1].unmatch();
    }

    if (panels[2].isUnmatched(panels[0],panels[1])) {
      panels[2].unmatch();
    }

    if (panels[0].isMatched(panels[1],panels[2])) {

        console.log('大当たり');
      // bonuswind.classList.remove('hidden');

      // mask.classList.remove('hidden');
      push.click();

    }

  }

  

  const panels = [
    new panel(),
    new panel(),
    new panel(),
  ]

  let panlsLeft = 3;

  const push = document.getElementById("push");
  const start = document.getElementById("start");
  start.addEventListener('click', () => {
    if(start.classList.contains('inactive')){
      return ;
    }

    start.classList.add('inactive');
    push.classList.add('inactive');
    panels.forEach(panel => {
      panel.activate();
      panel.spin();
    });
  });

  const bonuswind = document.getElementById("bonus");
  const close = document.getElementById("bonus-close");
  const mask = document.getElementById("mask");


  close.addEventListener('click', () => {
    bonuswind.classList.add('hidden');
    mask.classList.add('hidden');

  });

  mask.addEventListener('click', () => {
    close.click();
  });

  push.addEventListener('click', () => {
    if(push.classList.contains('inactive')){
      return ;
    }
    bonuswind.classList.remove('hidden');
    mask.classList.remove('hidden');
  });


}