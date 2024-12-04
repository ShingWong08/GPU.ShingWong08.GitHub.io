const BackgroundButton = document.querySelector(".Background-Button");
const KeyButtons = document.querySelectorAll(".Key-Button");
const InputContainer = document.querySelector(".Input-Container");
const Counter = document.querySelector(".Counter");

// Count Bytes
function updateCounter() {
  let TotalBytes = 0;
  // RecursiveByte.js
  let WordByte = {
    " ": 0,
    "\n": 0,
    // Symbols
    "ClrMemory": 1,
    "√(": 1,
    "^-1": 1,
    "^(": 1,
    "10^(": 1,
    "e^(": 1,
    "log(": 1,
    "ln(": 1,
    "M+": 1,
    "M-": 1,
    "sin(": 1,
    "cos(": 1,
    "tan(": 1,
    "Abs(": 1,
    "arg(": 1,
    "Conjg(": 1,
    "Pol(": 1,
    "Rec(": 1,
    "Rnd(": 1,
    "Ran#": 1,
    "Ans": 1,
    // Program Keywords
    "If": 1,
    "Then": 1,
    "Else": 1,
    "Goto": 1,
    "Lbl": 1,
    "While": 1,
    "WhileEnd": 1,
    "For": 1,
    "To": 1,
    "Step": 1,
    "Next": 1,
    "Break": 1,
    // Settings
    "Deg": 1,
    "Rad": 1,
    "Gra": 1,
    "Fix": 1,
    "Sci": 1,
    "Norm": 1,
    "FreqOn": 1,
    "FreqOff": 1,
  };

  const InputBoxes = document.querySelectorAll(".InputBox");
  InputBoxes.forEach((InputBox) => {
    let Input = InputBox.value;
    for (let key in WordByte) {
      const EscapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const Regex = new RegExp(EscapedKey, "g");
      Input = Input.replace(Regex, (match) => {
        TotalBytes += WordByte[match];
        return "";
      });
    }
    TotalBytes += Input.length;
  });

  Counter.textContent = TotalBytes + " Bytes";
}

// 更新所有輸入框的事件監聽器
document.addEventListener("input", () => {
  updateCounter();
});

// 新增輸入框的事件監聽器
document.addEventListener("keydown", Event => {
  if (!Event.ctrlKey || Event.key !== "Enter") return;

  const RandomPlaceholder = [
    "Keep Pushing the Limits...",
    "Code Like There's No Tomorrow...",
    "Innovate Without Boundaries...",
    "Build, Break, Repeat...",
    "Crafting the Future, One Line at a Time...",
    "Master the Code, Master the World...",
    "Never Stop Creating...",
    "Code, Debug, Repeat...",
    "The Journey of Code Never Ends...",
    "Transform Ideas into Reality...",
    "Code. Create. Conquer.",
    "Embrace the Debugging Journey...",
    "Shape the Future with Every Line...",
    "Write. Build. Evolve.",
    "Push the Boundaries of Imagination..."
  ];

  const newInputBox = document.createElement("textarea");
  newInputBox.className = "InputBox";
  newInputBox.placeholder = RandomPlaceholder[Math.floor(Math.random() * RandomPlaceholder.length)];

  const ActiveElement = document.activeElement;
  if (ActiveElement.classList.contains("InputBox")) {
    ActiveElement.insertAdjacentElement('afterend', newInputBox);
  } else {
    InputContainer.appendChild(newInputBox);
  }
  newInputBox.focus();

  // 為新輸入框添加事件監聽器
  newInputBox.addEventListener("input", updateCounter);
});

// 刪除輸入框的事件監聽器
document.addEventListener("keydown", Event => {
  if (!Event.ctrlKey || Event.key !== "Backspace") return;
  const ActiveElement = document.activeElement;
  if (!ActiveElement.classList.contains("InputBox")) return;
  const InputBoxes = document.querySelectorAll(".InputBox");
  if (InputBoxes.length <= 1) return;
  const PreviousBox = ActiveElement.previousElementSibling;
  ActiveElement.remove();
  if (PreviousBox && PreviousBox.classList.contains("InputBox")) {
    PreviousBox.focus();
  }
  updateCounter(); // 更新計數器
});

// 按鈕點擊事件監聽器
KeyButtons.forEach(button => {
  button.addEventListener("click", () => {
    const activeInput = document.activeElement;
    if (activeInput && activeInput.classList.contains("InputBox")) {
      activeInput.value += button.textContent; // 將按鈕文本添加到輸入框值中
      updateCounter(); // 每次插入後更新字節計數器
    }
  });
});