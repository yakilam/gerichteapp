import { Component } from '@angular/core';
import { ProfilService } from './services/profil.service';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {

  constructor(private profilService: ProfilService) { }

  username: string = "";
  anzahlGerichte: number = 0;

  ngOnInit(): void {
    this.profilService.hasUserLoaded.subscribe(value => {
      if(value == true){
        this.username = this.profilService.user.userName;
      }
    });

    this.profilService.finishedCount.subscribe(value => {
      if(value == true){
        this.anzahlGerichte = this.profilService.meineGerichteAnzahl;
      }
    });

    this.profilService.getInfos();
  }

}
