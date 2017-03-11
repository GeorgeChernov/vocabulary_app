import { Word } from './word.model'
import {Injectable} from "@angular/core";

@Injectable()
export class WordStorageService {

    private words: Word[] = [{inEnglish: 'cat', inRussian: 'кошка'}];

    getAll(): Word[] {
        return this.words;
    }
}