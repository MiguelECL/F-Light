import sum from "../components/function";
import { describe, expect, test} from "vitest"

describe("sum", () => {
    test("testing sum", () => {
        expect(sum(1,2)).toBe(3);
    })
})