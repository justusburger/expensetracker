describe('Component base class', () => {
    var component: ExpenseTracker.Component;

    beforeEach(() => {
        component = new ExpenseTracker.Component();
    });

    describe('Loading states', () => {
        it('isLoading() should return true when beginUpdate()', () => {
            expect(component.isLoading()).toBe(false);
            component.beginUpdate();
            expect(component.isLoading()).toBe(true);

            component.endUpdate();
            expect(component.isLoading()).toBe(false);
        });
        it('isLoading("value") should return true when beginUpdate("value")', () => {
            expect(component.isLoading()).toBe(false);
            expect(component.isLoading("value")).toBe(false);

            component.beginUpdate("value");
            expect(component.isLoading()).toBe(false);
            expect(component.isLoading("value")).toBe(true);

            component.beginUpdate();
            expect(component.isLoading()).toBe(true);
            expect(component.isLoading("value")).toBe(true);

            component.endUpdate("value");
            expect(component.isLoading()).toBe(true);
            expect(component.isLoading("value")).toBe(false);

            component.endUpdate();
            expect(component.isLoading()).toBe(false);
            expect(component.isLoading("value")).toBe(false);
        });
    });
}); 