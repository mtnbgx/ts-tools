import {StepChain} from "../src/stepChain";

interface TestContext {
    index: number
}

const sleep = function (ms: number) {
    return new Promise((resolve => {
        setTimeout(() => {
            resolve(1)
        }, ms)
    }))
}

describe('StepChain', () => {
    //测试上下文可更改
    test('context', async () => {
        let stepChain = new StepChain<TestContext>()
        stepChain.add('step1', (ctx, action) => {
            ctx.index++
        })
        stepChain.add('step2', (ctx) => {
            ctx.index++
        })
        let context = {index: 0}
        await stepChain.handle(context)
        expect(context.index).toBe(2)
    })
    //测试可跳步
    test('skip', async () => {
        let stepChain = new StepChain<TestContext>()
        stepChain.add('step1', (ctx, action) => {
            if (ctx.index == 2) {
                return
            }
            ctx.index = 1
        })
        stepChain.add('step2', (ctx, action) => {
            if (ctx.index == 2) {
                return
            }
            ctx.index = 2
            action.next('step1')
        })
        let context = {index: 0}
        await stepChain.handle(context)
        expect(context.index).toBe(2)
    })
    //测试异步方法
    test('async', async () => {
        let stepChain = new StepChain<TestContext>()
        stepChain.add('step1', async (ctx) => {
            await sleep(1000)
            ctx.index = 2
        })
        let context = {index: 0}
        await stepChain.handle(context)
        expect(context.index).toBe(2)
    })
})

