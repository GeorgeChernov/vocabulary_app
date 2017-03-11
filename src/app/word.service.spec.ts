import {WordStorageService} from './word-storage.service'
import {WordService} from './word.service'
import {WordExistException} from './word-exist-exception'
import {Word} from './word.model'

describe('WordService', function () {

    let expectedWords: Word[];
    let mockService: WordStorageService;
    let cat = {inEnglish: 'cat', inRussian: 'кошка'};
    let dog = {inEnglish: 'dog', inRussian: 'собака'};
    let fox = {inEnglish: 'fox', inRussian: 'лиса'};

    beforeEach(function() {

        expectedWords = [ cat, dog ];
        mockService = <WordStorageService> {getAll: () => expectedWords };
    });

    it('getAll returns all words', () => {

        let ws = new WordService(mockService);

        expect(2).toEqual(ws.getAll().length);

        expect("cat").toEqual(ws.getAll()[0].inEnglish);
        expect("кошка").toEqual(ws.getAll()[0].inRussian);

        expect("dog").toEqual(ws.getAll()[1].inEnglish);
        expect("собака").toEqual(ws.getAll()[1].inRussian);
    });

    it('add adds a new word', () => {

        let ws = new WordService(mockService);

        ws.add(fox);

        let wordsLength = ws.getAll().length;

        expect(3).toEqual(wordsLength);

        expect("fox").toEqual(ws.getAll()[wordsLength - 1].inEnglish);
        expect("лиса").toEqual(ws.getAll()[wordsLength - 1].inRussian);

    });

    it('add adds an existing word, the method retuns error - the word already exists', () => {

        let ws = new WordService(mockService);
        let existingWord = {inEnglish: 'cat', inRussian: 'кошка'};

        expect(function(){ ws.add(existingWord); }).toThrow(new WordExistException());
    });

    it('remove removes a word', () => {

        let ws = new WordService(mockService);

        ws.remove(cat);

        expect(1).toEqual(ws.getAll().length);
        expect('dog').toEqual(ws.getAll()[0].inEnglish);
        expect('собака').toEqual(ws.getAll()[0].inRussian);
    });

    it('remove removes a word that does not exist - no errors', () => {

        let ws = new WordService(mockService);

        ws.remove(fox);
        expect(2).toEqual(ws.getAll().length);
    });
});
