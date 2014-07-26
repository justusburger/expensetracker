describe('Component base class', function () {
    var component;

    beforeEach(function () {
        component = new ExpenseTracker.Component();
    });

    describe('Loading states', function () {
        it('isLoading() should return true when beginUpdate()', function () {
            expect(component.isLoading()).toBe(false);
            component.beginUpdate();
            expect(component.isLoading()).toBe(true);

            component.endUpdate();
            expect(component.isLoading()).toBe(false);
        });
        it('isLoading("value") should return true when beginUpdate("value")', function () {
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
