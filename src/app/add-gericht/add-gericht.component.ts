import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { GerichtResponse } from '../gerichte-my/gerichtResponse';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button'; 
import { NgFor } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar} from '@angular/material/snack-bar';
import { GerichteMyService } from '../gerichte-my/services/gerichte-my.service';
import  {MatSelectModule } from '@angular/material/select';



@Component({
  selector: 'app-add-gericht',
  standalone: true,
  imports: [
    MatInputModule,
    MatSidenavModule,
    MatButtonModule,
    NgFor,
    ReactiveFormsModule,
    MatChipsModule,
    MatSelectModule
  ],
  templateUrl: './add-gericht.component.html',
  styleUrl: './add-gericht.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddGerichtComponent implements OnInit {

  @Input() gewaehltesGericht: GerichtResponse | undefined;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private gerichteMyService: GerichteMyService) { }

  tags: String[] = [];
  selectedFiles: File[] = [];
  base64Images: string[] = [];
  gerichtForm!: FormGroup;
  isButtonDisabled: boolean = false;

  neuseGericht: GerichtResponse = {
    name: "",
    author: "",
    zutaten: [],
    anleitung: "",
    tags: [],
    images: []
  };

  getZutaten(){
    return this.gerichtForm.get('zutaten') as FormArray;
  }

  ngOnInit(): void {
      this.gerichtForm = this.fb.group({
        gerichtName: new FormControl('',Validators.required),
        gerichtAnleitung: new FormControl('',Validators.required),
        zutaten: this.fb.array([
          this.fb.group({ name:  new FormControl('',Validators.required), menge:  new FormControl('',Validators.required), einheit: new FormControl('',Validators.required)})
        ])
      });
  }

  addZutat(){
    this.getZutaten().push(
      this.fb.group({ name:  new FormControl('',Validators.required), menge:  new FormControl('',Validators.required), einheit: new FormControl('',Validators.required)})
    );
  }

  removeZutat(index: number){
    if(this.getZutaten().length > 1){
      this.getZutaten().removeAt(index);
    }
  }

  addTag(){
    if(this.tags.length < 10){
      const tagId = document.getElementById('tagId') as HTMLInputElement;
      if(tagId.value.length > 1 && tagId.value.length < 30){
        this.tags.push(tagId.value);
        tagId.value="";
      }
      
    }
  }

  removeTag(index: number){
    if (index >= 0 && index < this.tags.length) {
      this.tags.splice(index, 1);
    }
  }

  onFilesSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
    this.base64Images = [];
    if(this.selectedFiles.length < 10){
      for (let file of this.selectedFiles) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.base64Images.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
        this.snackBar.open("Bitte maximal 10 Bilder wählen!", "OK", {
          duration: 3000
        });
    }
    
  }

  uploadGericht(){ //TODO: Make this better!
      if(this.gerichtForm.valid) {
          this.isButtonDisabled = true;
          this.neuseGericht.name = this.gerichtForm.get('gerichtName')?.value;
          this.neuseGericht.images = this.base64Images;
          this.neuseGericht.tags = this.tags;
          this.neuseGericht.anleitung = this.gerichtForm.get('gerichtAnleitung')?.value;
          this.neuseGericht.zutaten = this.gerichtForm.get('zutaten')?.value;
          this.gerichteMyService.pushGericht(this.neuseGericht);
          this.snackBar.open("Gericht erfolgreich hinzugefügt!", "OK", {
            duration: 3000
          });
      } else {
        this.snackBar.open("Formular nicht korrekt ausgefüllt!", "OK", {
          duration: 3000
        });
      }
  }
}
