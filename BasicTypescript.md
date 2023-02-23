# Typescript + React

타입스크립트를 공부하며 기록한 레포지토리입니다.

## 타입스크립트

타입스크립트는 자바스크립트 문법에 타입 표기 구문을 추가한 것이다. 코드를 작성한 시점에 타입이 고정되어 있기 때문에, 의도치 않은 방식의 코드 실행을 잡아낼 수 있고, 런타임에 오류를 찾을 필요 없이 코드 작성 시점에 오류를 발견할 수 있다는 이점이 있다.

브라우저에서 실행하기 위해 타입스크립트를 자바스크립트로 컴파일 해야 한다. 자바스크립트는 타입 표기를 이해하지 못하기 때문에, 컴파일이 진행되는 동안 타입 표기는 모두 삭제된다.

<br />

## 타입추론

```javascript
let name = "Kim Jihyeon";
name = 1234; // ERROR!!
```

변수를 만들고 바로 값을 할당하면, 타입스크립트는 해당 값을 변수의 타입으로 여긴다. 이후 다른 값을 할당하려고 하면 오류가 발생한다. 불필요한 타입 지정을 줄이고 타입 추론 기능을 활용하는 것이 권장되는 방식이다.

<br />

## Union 타입

한 개 이상의 타입을 하나의 변수에 지정할 수 있게 해주는 기능

```javascript
let ID: string | number = "Kim Jihyeon";
ID = 1234;
```

<br />

## Type Aliases

동일한 타입을 반복해서 정의해야 하는 경우. 기본 타입을 만들어 복잡한 타입을 정의해두고, 타입 별칭을 사용한다.

```javascript
type Person = {
  name: string,
  age: number,
};

let person: Person;
let people: Person[];
```

<br />

## void 타입

함수의 반환 타입에 사용되며, 함수에 반환값이 없다는 것을 뜻한다.

```javascript
function printOutput(value: any): void {
  console.log(value);
}
```

<br/>

## generics(제네릭) 타입

어떤 타입이든 사용할 수 있지만, 특정 타입을 사용해 함수를 실행하고 나면 해당 타입이 고정되어 작동한다.

```javascript
function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array];
  return newArray;
}

const numberArray = insertAtBeginning([1, 2, 3], -1);
const stringArray = insertAtBeginning(["a", "b", "c"], "d");

numberArray[0].split(""); //ERROR!!!
stringArray[0].split("");
```

제네릭이 필요한 이유
<br />
`① function insertAtBeginning(array: any[], value: any)` 와 `② function insertAtBeginning<T>(array: T[], value: T)` 의 차이
<br />

①은 함수의 결과를 any[]로 추론하기 때문에, 함수를 호출한 다음 타입스크립트로부터 어떤 지원도 받을 수 없다. (ERROR라고 주석이 달린 부분이 런타임에 발견이 된다.) any 타입이 필요한데, any를 사용하면 타입스크립트의 기능을 사용할 수 없는 상황. 이럴 때 필요한 것인 제네릭이다. ②의 경우, array배열과 value의 값이 같은 타입이라는 것을 알리고, 타입스크립트에 인수의 정확한 값을 살펴봐야 한다는 것을 알린다. 타입스크립트가 any가 아닌 타입을 추론하기 때문에, 함술르 실행한 이후 타입스크립트의 기능을 사용할 수 있다.

<br/>

## type casting(타입 캐스팅)

타입 캐스팅은 타입스크립트에게 뒤에 오는 표현식이 어떤 타입이 될 것인지 알려주는 것이다. 캐스팅하는 방법은 아래 두가지이다.

- 껵쇄 괄호를 입력하고 변환(cast)하려는 타입 입력
- `as HTMLDivElement`와 같은 형태를 추가

```javascript
class ProjectInput {
  tempalteElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;

  constructor(){
    this.tempalteElement = document.getElementById('project-input')! as HTMLTemplateElement
    this hostElement = document.getElementById('app')!
  }
}
```
