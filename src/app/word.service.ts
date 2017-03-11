import { Word } from './word.model'
import { WordStorageService } from './word-storage.service'
import { WordExistException } from './word-exist-exception'
import {Injectable} from "@angular/core";

@Injectable()
export class WordService {

    private words: Word[] = [];

    constructor (private wordStorage: WordStorageService){
        this.words = wordStorage.getAll();
    }

    getAll(): Word[] {
        return this.words;
    };

    add(word: Word): void {

        var isWordExist = this.words.some(function(savedWord){
            return savedWord.inEnglish === word.inEnglish;
        });

        if(isWordExist){
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