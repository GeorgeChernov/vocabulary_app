import {WordStorageService} from './wordStorage.service'
import {WordService} from './word.service'
import {Word} from './word.model'

describe('WordStorageService', function () {

    let expectedWords: Word[] = [{inEnglish: 'cat', inRussian: 'кошка'}, {inEnglish: 'dog', inRussian: 'собака'}];
    let mockService = <WordStorageService> {getAll: () => expectedWords };
    let testWord = {inEnglish: 'fox', inRussian: 'лиса'};

    it('wordServise getAll returns all words', () => {

        let ws = new WordService(mockService);
        expect(2).toEqual(ws.getAll().length);
    });

    it('wordServise add adds a new word1', () => {

        let ws = new WordService(mockService);

        ws.add(testWord);
        expect(3).toEqual(ws.getAll().length);
    });

    it('wordServise add adds a new word1', () => {

        let ws = new WordService(mockService);

        ws.remove(testWord);
        expect(2).toEqual(ws.getAll().length);
    });
});
