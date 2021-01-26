## stepChain 步骤链

用于复杂或者逻辑频繁更变代码中

```typescript
import {StepChain} from './StepChain'

let stepChain = new StepChain()
stepChain.add('step1', (ctx, action) => {
    console.log('step1')
    action.break() //or action.next('step2')
})
stepChain.after('step1', 'step2', () => {
    console.log('step2')
})
let context = {}
stepChain.handle(context)
```
