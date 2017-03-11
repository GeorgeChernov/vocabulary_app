import { Word } from './word.model'
import {Injectable} from "@angular/core";

@Injectable()
export class WordStorageService{

    private words: Word[] = [];

    getAll(): Word[] {
        return this.words;
    }
}