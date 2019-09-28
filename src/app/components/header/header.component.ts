import { Component } from '@angular/core';
import { PageDataService } from 'src/app/services/page-data.service';
import { HeaderDataService } from 'src/app/services/header.services';


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
    tituloDaPagina = ''

    toggleMenu(){
        this.isMenuOpen = !this.isMenuOpen
    }

    constructor(private pageService: PageDataService, private headerService: HeaderDataService){
            this.pageService
                .titulo
                .subscribe(novoTitulo => this.tituloDaPagina = novoTitulo)
    }

    handleBuscaChanges({ target }){
        this.headerService.atualizarTermoFiltro(target.value)
        
    }
}