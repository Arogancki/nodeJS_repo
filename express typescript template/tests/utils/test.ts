import formatRouterModuleName from "../../src/utils/formatRouterModuleName";

describe("utils", () => {
    it("", () => {
        const testName = "test";
        const formattedTestName = formatRouterModuleName(testName);
        expect(formattedTestName).toBe("testRouter");
    });
});
