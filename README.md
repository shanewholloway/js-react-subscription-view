# react-subscription-view

HOC render-function for subscribe() compatible objects

#### Example

###### in `main.jsy` :

```javascript
::
  const app_model = new MyAppModel().init('example')

  setInterval @
    () => app_model.increment()
    1000

  ReactDOM.render @
    <App model={app_model} />
    window.main

```

###### in `app/view.jsy` :

```javascript
import reactSubscribedView from 'react-subscribed-view'
const subscribedViewOf = reactSubscribedView(React)

export function App({model}) ::
  subscribedViewOf @ model, model => @
    <b>App name: {model.name} counter: {model.counter}</b>
```

###### in `app/model.jsy` :

```javascript
import {ObjectFunctional} from 'object-functional'

export class MyAppModel extends ObjectFunctional ::

  asAction = this.init
  init(name) ::
    this.name = name
    this.counter = 0
    return this

  asAction = this.increment
  increment(d=1) ::
    this.counter += d
    return this

  format() ::
    return `Counter "${this.name}": ${this.counter}`
```

