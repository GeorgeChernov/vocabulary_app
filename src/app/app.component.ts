import { Component } from '@angular/core';
import { WordService } from './word.service'
import { Word } from './word.model'
import { WordStorageService } from "./word-storage.service";
import { WordExistException } from "./word-exist-exception";

@Component({
  selector: 'my-app',
  providers: [WordService, WordStorageService],
  template: `

    <div *ngIf="listIsVisible">
    
      <button (click)="addClick()">Add</button>
  
      <ul class="words">
          <li *ngFor="let word of words">
              <div>
                  <span>{{word.inEnglish}} / {{word.inRussian}}</span>
              </div>
          </li>
       </ul>
    
    </div>
    
    <div *ngIf="!listIsVisible">
    
        <button (click)="saveNewWord(newWord)">Save</button>
        <br/>
        <input placeholder="eng" [(ngModel)]="newWord.inEnglish" />
        <br/>
        <input placeholder="rus" [(ngModel)]="newWord.inRussian"/>
    
    </div>

    
    `
})

export class AppComponent  {

  private listIsVisible = true;

  constructor(private wordService: WordService){

    this.wordService = wordService;
  }

  words: Word[] = this.wordService.getAll();

  newWord: Word = new Word();

  addClick() {
    this.listIsVisible = false;
  };

  saveNewWord(word: Word) {

    try{

      this.wordService.add(word);

      this.listIsVisible = true;
      this.newWord = new Word();

    } catch (e){

      if (e instanceof WordExistException) {
        console.log('the word already exist - ' + e.name);
      } else {
        console.log(e.name);
      }
    }
  };
}
