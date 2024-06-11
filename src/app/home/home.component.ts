import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
interface carouselImages {
    imageSrc: string;
    imageAlt: string;
  }
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
    @Input() images: carouselImages[] = []
    @Input() indicators = true; 
    @Input() controls = true;
    @Input() autoSlide = false;
    @Input() slideInterval = 3000; //Default to 3 seconds
    selectedIndex = 0; 
    imagenes = [
        {
          imageSrc:
            "../../../assets/Diseño Domicilios.jpg",
          imageAlt: 'nature1',
        },
        {
          imageSrc:
            "../../../assets/Ennumeracion mesas.jpg",
          imageAlt: 'nature2',
        },
        {
          imageSrc:
            "../../../assets/Diseño Domicilios.jpg",
          imageAlt: 'person1',
        },
        {
          imageSrc:
            "../../../assets/ricoletto mascota NUEVA.png",
          imageAlt: 'person2',
        },
      ];
      

  ngOnInit(): void {
    this.autoAdvance();
  }

  autoAdvance() {
    setInterval(() => {
      if (this.selectedIndex === this.imagenes.length - 1) {
        this.selectedIndex = 0;
      } else {
        this.selectedIndex++;
      }
    }, 3000); // Avanza cada 2 segundos (2000 ms)
  }

  //Changes slider in every 3 seconds 
  autoSlideImage(): void {
    setInterval(() =>{
      this.onNextClick();
    }, this.slideInterval);
  }
 
  //sets indice of image on dat/indicators click 
  selectedImage(index: number): void {
    this.selectedIndex = index;
  }

  onPrevClick(): void {
    if(this.selectedIndex === 0){
      this.selectedIndex = this.images.length -1;
    } else {
      this.selectedIndex--;
    }
  }

  onNextClick(): void {
    if(this.selectedIndex === this.images.length -1){
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }
}
