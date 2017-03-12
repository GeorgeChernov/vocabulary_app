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
    
    <div>
        <a class="add-button" (click)="addClick()">+</a>
    </div>
      
  
    <ul class="word-list">
         <li *ngFor="let word of words">
              <div class="card">
                  <div class="word-in-eng">{{word.inEnglish}}</div>
                  <div class="word-in-rus">{{word.inRussian}}</div>
              </div>
         </li>
    </ul>
    
    </div>
    
    <div class="add-word-form" *ngIf="!listIsVisible">
    
        <div>
            <a class="save-button" (click)="saveNewWord(newWord)">OK</a>
        </div>
        
        <input placeholder="eng" [(ngModel)]="newWord.inEnglish" />
        <input placeholder="rus" [(ngModel)]="newWord.inRussian"/>
    
    </div>

    `,
  styles:[`

        .word-list{
            margin-top: 15px;
            list-style: none;
            padding: 0;
            float: left;
            width: 100%;
        }
        
        .word-list .card{  
            background: #e8e7e7;
            border: gray solid 1px;
            margin-bottom: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
        
        .word-list .card .word-in-eng {  
            text-align: center;
            font-size: 22px;
            font-weight: 100;
            font-family: Arial, Helvetica, sans-serif;
            padding-top: 10px;
        }
        
        .word-list .card .word-in-rus {
            text-align: center;
            font-size: 16px;
            font-family: Arial, Helvetica, sans-serif;
            padding-bottom: 10px;
            padding-top: 5px;
        }
        
        .add-button{
            float:right;
            font-size: 24px;
            padding-right: 10px;
            color: blue;
        }
        
        .save-button{
            float:right;
            font-size: 16px;
            font-family: Arial, Helvetica, sans-serif;
            padding: 8px;
            color: blue;
        }
        
        .add-word-form input {
            font-size: 16px;
            float:left;
            width: calc(100% - 10px);
            margin: 5px;
        }

    `]
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
