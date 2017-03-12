import { Word } from './word.model'
import {Injectable} from "@angular/core";

@Injectable()
export class WordStorageService {

    getAll(): Word[] {

        var words = new Array<Word>();
        words = JSON.parse(localStorage.getItem('words'));
        return words;
    }

    save(words: Word[]): void{
        localStorage.setItem('words', JSON.stringify(words));
    }
}