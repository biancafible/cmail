import { Component } from '@angular/core';


//Annotation
@Component({
    selector:'cmail-header', //define nome da tag no html
    templateUrl:'./header.component.html', //delcara nome no arquivo html
    styleUrls:['./header.component.css',
    './header-search.css'
   
]
})
export class HeaderComponent {

    isMenuOpen = false


    toggleMenu(){
        this.isMenuOpen = !this.isMenuOpen
    }



}