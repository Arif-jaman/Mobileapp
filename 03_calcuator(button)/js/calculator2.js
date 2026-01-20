'use strict';

// ワークエリア（グローバル変数）
let wkFirst = "1";  // 初回FLG ("1":初回入力、"0":初回入力以外)
let wkTotal = 0;    // 合計
let wkCalc = "+";   // 演算子退避エリア
let wkBefore = "1"; // 1つ前の入力 ("0":数値、"1":演算子)

// ページ上の要素（Element）を参照
const elementcalcLog = document.getElementById("calcLog");   // 1ログ出力エリア
const elementResult = document.getElementById("result");     // 2結果表示エリア

// 数字ボタン
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const num3 = document.getElementById("num3");
const num4 = document.getElementById("num4");
const num5 = document.getElementById("num5");
const num6 = document.getElementById("num6");
const num7 = document.getElementById("num7");
const num8 = document.getElementById("num8");
const num9 = document.getElementById("num9");
const num0 = document.getElementById("num0");

// 演算子ボタン
const elementAdd = document.getElementById("add");
const elementSub = document.getElementById("sub");
const elementMult = document.getElementById("mult");
const elementDiv = document.getElementById("div");

// イコールボタン
const elementEqual = document.getElementById("equal");

// クリアボタン
const elementCancel = document.getElementById("cancel");

// イベントリスナー登録

// 数字ボタン → edit関数呼び出し
num1.addEventListener("click", () => edit(1));
num2.addEventListener("click", () => edit(2));
num3.addEventListener("click", () => edit(3));
num4.addEventListener("click", () => edit(4));
num5.addEventListener("click", () => edit(5));
num6.addEventListener("click", () => edit(6));
num7.addEventListener("click", () => edit(7));
num8.addEventListener("click", () => edit(8));
num9.addEventListener("click", () => edit(9));
num0.addEventListener("click", () => edit(0));


elementAdd.addEventListener("click", () => update("+"));
elementSub.addEventListener("click", () => update("-"));
elementMult.addEventListener("click", () => update("*"));
elementDiv.addEventListener("click", () => update("/"));


elementEqual.addEventListener("click", () => dspResult());


elementCancel.addEventListener("click", () => clear());

/** 数字がクリックされたときの処理 */
function edit(inputValue) {
  if (wkBefore === "0") {

    elementResult.innerHTML = Number(elementResult.innerHTML + inputValue);
  } else {

    elementResult.innerHTML = inputValue;
  }
  wkFirst = "0";
  wkBefore = "0";
}

/** 演算子がクリックされたときの処理 */
function update(calcType) {
  if (wkBefore === "0") {

    elementcalcLog.innerHTML += Number(elementResult.innerHTML) + calcType;
    calculator();
  } else {

    if (wkFirst === "1") {

      elementcalcLog.innerHTML = "0" + calcType;
    } else {

      let lastChar = elementcalcLog.innerHTML.slice(-1);
      if (["+", "-", "*", "/"].includes(lastChar)) {
        elementcalcLog.innerHTML = elementcalcLog.innerHTML.slice(0, -1) + calcType;
      } else {
        elementcalcLog.innerHTML += calcType;
      }
    }
  }
  wkCalc = calcType;
  wkBefore = "1";
}

/** =がクリックされたときの処理 */
function dspResult() {

  if (wkFirst === "0" && wkBefore === "0") {

    elementcalcLog.innerHTML += elementResult.textContent;


    calculator();


    wkCalc = "=";
    wkBefore = "1";
  }
}

/** クリアボタンがクリックされたときの処理 */
function clear() {
  elementResult.innerHTML = "0";
  elementcalcLog.innerHTML = "";
  wkFirst = "1";
  wkTotal = 0;
  wkCalc = "+";
  wkBefore = "1";
}

/** 計算を実行する関数 */
function calculator() {
  const currentValue = Number(elementResult.innerHTML);

  switch (wkCalc) {
    case "+":
      wkTotal = wkTotal + currentValue;
      break;
    case "-":
      wkTotal = wkTotal - currentValue;
      break;
    case "*":
      wkTotal = wkTotal * currentValue;
      break;
    case "/":
      wkTotal = currentValue === 0 ? 0 : wkTotal / currentValue;
      break;
    case "=":
      break;
    default:
      wkTotal = currentValue;
  }

  elementResult.innerHTML = wkTotal;
  wkFirst = "0";
}
