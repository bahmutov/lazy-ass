import rewire from "rewire"
const index = rewire("./index")
const isArrayLike = index.__get__("isArrayLike")
const toStringArray = index.__get__("toStringArray")
const isPrimitive = index.__get__("isPrimitive")
const isError = index.__get__("isError")
const replacer = index.__get__("replacer")
const toString = index.__get__("toString")
const endsWithNewLine = index.__get__("endsWithNewLine")
const formMessage = index.__get__("formMessage")
const lazyAssLogic = index.__get__("lazyAssLogic")
// @ponicode
describe("isArrayLike", () => {
    test("0", () => {
        let callFunction: any = () => {
            isArrayLike(0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            isArrayLike(true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            isArrayLike(100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            isArrayLike("rgb(20%,10%,30%)")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            isArrayLike("green")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            isArrayLike(NaN)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("toStringArray", () => {
    test("0", () => {
        let callFunction: any = () => {
            toStringArray(true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let object: any = [[10, -45.9, 103.5, 0.955674], ["a", "b", "043", "foo bar"], [10, -45.9, 103.5, 0.955674]]
        let object2: any = [["foo bar", -0.353, "**text**", 4653], ["foo bar", -0.353, "**text**", 4653], [-1, 0.5, 1, 2, 3, 4, 5]]
        let object3: any = [[-1, 0.5, 1, 2, 3, 4, 5], [10, -45.9, 103.5, 0.955674], ["foo bar", -0.353, "**text**", 4653]]
        let object4: any = [[10, -45.9, 103.5, 0.955674], ["foo bar", -0.353, "**text**", 4653], ["foo bar", -0.353, "**text**", 4653]]
        let object5: any = [[10, -45.9, 103.5, 0.955674], ["a", "b", "043", "foo bar"], [10, -45.9, 103.5, 0.955674]]
        let param1: any = [object, object2, object3, object4, object5]
        let callFunction: any = () => {
            toStringArray(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let object: any = [[-1, 0.5, 1, 2, 3, 4, 5], [-1, 0.5, 1, 2, 3, 4, 5], ["foo bar", -0.353, "**text**", 4653]]
        let object2: any = [["a", "b", "043", "foo bar"], ["a", "b", "043", "foo bar"], ["foo bar", -0.353, "**text**", 4653]]
        let object3: any = [[10, -45.9, 103.5, 0.955674], [10, -45.9, 103.5, 0.955674], ["foo bar", -0.353, "**text**", 4653]]
        let object4: any = [["foo bar", -0.353, "**text**", 4653], [10, -45.9, 103.5, 0.955674], ["foo bar", -0.353, "**text**", 4653]]
        let object5: any = [[-1, 0.5, 1, 2, 3, 4, 5], ["a", "b", "043", "foo bar"], [10, -45.9, 103.5, 0.955674]]
        let param1: any = [object, object2, object3, object4, object5]
        let callFunction: any = () => {
            toStringArray(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            toStringArray(false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let object: any = [[10, -45.9, 103.5, 0.955674], [-1, 0.5, 1, 2, 3, 4, 5], [-1, 0.5, 1, 2, 3, 4, 5]]
        let object2: any = [[-1, 0.5, 1, 2, 3, 4, 5], ["foo bar", -0.353, "**text**", 4653], ["foo bar", -0.353, "**text**", 4653]]
        let object3: any = [[-1, 0.5, 1, 2, 3, 4, 5], [10, -45.9, 103.5, 0.955674], ["foo bar", -0.353, "**text**", 4653]]
        let object4: any = [["foo bar", -0.353, "**text**", 4653], ["a", "b", "043", "foo bar"], [-1, 0.5, 1, 2, 3, 4, 5]]
        let object5: any = [["a", "b", "043", "foo bar"], ["foo bar", -0.353, "**text**", 4653], ["foo bar", -0.353, "**text**", 4653]]
        let param1: any = [object, object2, object3, object4, object5]
        let callFunction: any = () => {
            toStringArray(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            toStringArray(Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("isPrimitive", () => {
    test("0", () => {
        let callFunction: any = () => {
            isPrimitive(false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            isPrimitive(32)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            isPrimitive(true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            isPrimitive(0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            isPrimitive("Foo bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            isPrimitive(-Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("isError", () => {
    test("0", () => {
        let callFunction: any = () => {
            isError(false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            isError(true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            isError(0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            isError(-5.48)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            isError("something.example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            isError(NaN)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("replacer", () => {
    test("0", () => {
        let callFunction: any = () => {
            replacer("Elio", 32)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            replacer("bc23a9d531064583ace8f67dad60f6bb", false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            replacer("Dillenberg", 16)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            replacer("elio@example.com", 32)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            replacer("bc23a9d531064583ace8f67dad60f6bb", "Elio")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            replacer(Infinity, true)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("toString", () => {
    test("0", () => {
        let callFunction: any = () => {
            toString("This is a Text", "#FF00FF")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            toString(true, true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            toString("Foo bar", "#F00")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            toString("foo bar", "green")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            toString(true, false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            toString({ key1: "", key5: NaN, message: "", name: "" }, NaN)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("endsWithNewLine", () => {
    test("0", () => {
        let callFunction: any = () => {
            endsWithNewLine(-100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            endsWithNewLine("email@Google.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            endsWithNewLine("ponicode.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            endsWithNewLine("TestUpperCase@Example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            endsWithNewLine("user@host:300")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            endsWithNewLine(-Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("formMessage", () => {
    test("0", () => {
        let callFunction: any = () => {
            formMessage(true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            formMessage([0, -100, 100, -100, 1, 0, 1, -5.48])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            formMessage(false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            formMessage([-100, 1, 1, -5.48, 1, 0, 0, 100])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            formMessage([-100, -100, 1, -5.48, 100, -5.48, 0, -100])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            formMessage("")
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("lazyAssLogic", () => {
    test("0", () => {
        let callFunction: any = () => {
            lazyAssLogic("methodical", [true, 0, true, false])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            lazyAssLogic("callback detected, not supported yet", [false, 0, true, true])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            lazyAssLogic({ key3: 100 }, ["Data Scientist"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            lazyAssLogic({ key3: -5.48 }, ["Data Scientist"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            lazyAssLogic({ key3: -5.48 }, ["Chief Product Officer"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            lazyAssLogic({ key3: -Infinity }, [])
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("index.lazyAssync", () => {
    test("0", () => {
        let callFunction: any = () => {
            index.lazyAssync("logistical", ["Sales", 0, -100, 100, -5.48])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            index.lazyAssync("logistical", [0, 0, "Software Engineer"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            index.lazyAssync(-100, [true, false])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            index.lazyAssync("methodical", ["Chief Product Officer", -5.48, 1, 100, -100])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            index.lazyAssync("value-added", [-100, 100, "Data Scientist"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            index.lazyAssync(Infinity, [])
        }
    
        expect(callFunction).not.toThrow()
    })
})
