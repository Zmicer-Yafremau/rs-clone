import { create, getEnding } from '../../src/utils/utils';
import { getBoxName } from '../../src/view/boxView/boxManage';
describe('Tests for utils', () => {
    it('checks ending of words', () => {
        const testCases = [
            { number: 10, var1: 'участник', var2: 'участника', var3: 'участников', expected: 'участников' },
            { number: 1, var1: 'участник', var2: 'участника', var3: 'участников', expected: 'участник' },
        ];

        testCases.forEach(({ number, var1, var2, var3, expected }) => {
            const result = getEnding(number, var1, var2, var3);
            expect(result).toBe(expected);
        });
    });
    it('should create div with class', () => {
        const tag = 'DIV';
        const className = 'test';
        const el = create(className, tag);
        expect(el.className).toBe(className);
        expect(el.tagName).toBe(tag);
    });
    it('should camelCase box name', () => {
        const box = getBoxName('Box name');
        expect(box).toBe('BoxName');
    });
});
