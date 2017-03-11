import { Word } from './word.model'
import { WordStorageService } from './wordStorage.service'
import { WordExistException } from './word-exist-exception'
import {Injectable} from "@angular/core";

@Injectable()
export class WordService {

    private words: Word[] = [];

    constructor (wordStorage: WordStorageService){
        this.words = wordStorage.getAll();
    }

    getAll(): Word[] {
        return this.words;
    };

    add(word: Word): void {

        var existedWord = this.words.filter(function(wordFromList){
            return wordFromList.inEnglish === word.inEnglish;
        });

        if(existedWord.length){
            throw new WordExistException();
        }

        this.words.push(word);
    };

    remove(word: Word): void {

        var index = this.words.indexOf(word, 0);
        if (index > -1) {
            this.words.splice(index, 1);
        }
    };

}