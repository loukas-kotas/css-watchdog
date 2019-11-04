const Facade  = require('../../src/logic/facade');

describe('Fields', () => {

    const facade = new Facade();
    const source = 'https://loukaskotas.com';        
    
    beforeEach(async() => {
    });


    it(`should return all the attributes of ${source}`, async () => {
        const attributes = ['h1', 'h2'];
        const tbt = await facade.get_attributes(source, attributes);
        expect(tbt[0].h1).toBeDefined();
        expect(tbt[0].h2).toBeDefined();
    });

    it(`should return all attibutes of ${source} according to tags`, async () => {
        const attributes = ['font-size', 'color', 'font-family'];
        const tags = ['section'];
        const tbt = await facade.get_tags(source, attributes, tags);
        expect(tbt[0].id).toBeDefined();
        expect(tbt[0].tag).toBeDefined();
        expect(tbt[0].color).toBeDefined();
    });

    it(`should return all the attributes of ${source} according to class`, async () => {
        const attributes = ['font-size', 'color', 'font-family'];
        const classToDiscover = 'black-box';
        const tbt = await  facade.get_class(source, attributes, classToDiscover);
        expect(tbt[0].tag).toBeDefined();
        expect(tbt[0].color).toBeDefined();
        expect(tbt[0]['font-family']).toBeDefined();
    });
    
});