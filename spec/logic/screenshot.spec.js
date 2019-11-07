var Facade = require('../../src/logic/facade');
const exec = require('child_process').exec;

describe('Screenshot', () => {

    const facade = new Facade();
    const source = 'https://loukaskotas.com';
    const pathToSave = 'temp_screenshots';
    const elementId = 'about';

    beforeAll(async() => {
        exec(`mkdir ${pathToSave}`);
    });

    afterAll(async() => {
        exec(`rm -rf ${pathToSave}`);
    });

    beforeEach(async() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
    });

    it(`should screenshot whole page ${source}`, async() => {
        const res = await facade.screenshot_whole_page(source, pathToSave);
        expect(res.title).toBeDefined();
    });


    xit(`should screenshot part of page ${source}`, async() => {
        const res = await facade.screenshot_part_page(source, pathToSave, 0, 0, 200, 200);
        expect(res).toBeDefined();
    })

    // TODO: Re-import this test when inter-module communication issue has been resolved.
    xit(`should screenshot element: ${elementId} of page ${source}`, async() => {
        const res = await facade.screenshot_element(source, elementId);
        expect(res).toBeDefined();
    });


});