import { translations, Language } from './languages';
import tr from './locales/tr.json';
import en from './locales/en.json';

export const textSources = (language: Language) => ({
  literature: () => {
    const literatureTexts = language === 'tr' ? tr.textSources.literature : en.textSources.literature;
    const firstIndex = Math.floor(Math.random() * literatureTexts.length);
    let secondIndex = Math.floor(Math.random() * literatureTexts.length);

    while (firstIndex === secondIndex) {
      secondIndex = Math.floor(Math.random() * literatureTexts.length);
    }

    const combinedLiterature = `${literatureTexts[firstIndex]}\n\n${literatureTexts[secondIndex]}`;
    return Promise.resolve(combinedLiterature);
  },
  randomWords: () => {
    const wordBank = language === 'tr' ? tr.wordBank : en.wordBank;
    const generateLine = () => Array.from({ length: 10 }, () => wordBank[Math.floor(Math.random() * wordBank.length)]).join(' ');
    const lines = Array.from({ length: 50 }, () => generateLine()); // 50 satır üret
    return Promise.resolve(lines.join('\n\n')); // Satırları iki boşlukla birleştir
  },
  code: () => {
    const codeSnippets = [
      "function factorial(n) {\n  if (n === 0) {\n    return 1;\n  }\n  return n * factorial(n - 1);\n}",
      "const fibonacci = (num) => {\n  const sequence = [0, 1];\n  for (let i = 2; i <= num; i++) {\n    sequence.push(sequence[i - 1] + sequence[i - 2]);\n  }\n  return sequence.slice(0, num + 1);\n};",
      "class Animal {\n  constructor(name) {\n    this.name = name;\n  }\n  speak() {\n    console.log(`${this.name} makes a sound.`);\n  }\n}\n\nclass Dog extends Animal {\n  speak() {\n    console.log(`${this.name} barks.`);\n  }\n}",
      "import React from 'react';\nimport ReactDOM from 'react-dom/client';\n\nfunction App() {\n  return (\n    <div>\n      <h1>Hello, React!</h1>\n      <p>This is a simple React component.</p>\n    </div>\n  );\n}\n\nconst root = ReactDOM.createRoot(document.getElementById('root'));\nroot.render(<App />);",
      "def greet(name):\n    return f\"Hello, {name}!\"",
      "def add_numbers(a, b):\n    return a + b",
      "def is_prime(num):\n    if num < 2:\n        return False\n    for i in range(2, int(num**0.5) + 1):\n        if num % i == 0:\n            return False\n    return True",
      "my_list = [1, 2, 3, 4, 5]\nfor item in my_list:\n    print(item)",
      "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return f\"{self.name} says Woof!\"",
      "def factorial(n):\n    if n == 0:\n        return 1\n    else:\n        return n * factorial(n-1)",
      "data = {'name': 'Alice', 'age': 30}\nprint(data['name'])",
      "with open('example.txt', 'w') as f:\n    f.write('Hello, Python!')",
      "import math\nprint(math.sqrt(16))",
      "// Java example\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}",
      "// C++ example\n#include <iostream>\n\nint main() {\n    std::cout << \"Hello, World!\" << std::endl;\n    return 0;\n}",
      "// JavaScript Array methods\nconst numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(num => num * 2);\nconst evens = numbers.filter(num => num % 2 === 0);\nconst sum = numbers.reduce((acc, curr) => acc + curr, 0);",
      "// Asynchronous JavaScript\nasync function fetchData() {\n  try {\n    const response = await fetch('https://api.example.com/data');\n    const data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error('Error fetching data:', error);\n  }\n}",
      "// CSS example\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  background-color: #f0f0f0;\n}\n\n.button {\n  padding: 10px 20px;\n  border-radius: 5px;\n  background-color: #007bff;\n  color: white;\n  font-size: 16px;\n  cursor: pointer;\n}",
      "// HTML structure\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Document</title>\n</head>\n<body>\n    <div id=\"root\"></div>\n</body>\n</html>"
    ];
    const randomIndex = Math.floor(Math.random() * codeSnippets.length);
    return Promise.resolve(codeSnippets[randomIndex]);
  },
  custom: (customText?: string) => {
    return Promise.resolve(customText || '');
  },
});

export type TextSource = keyof ReturnType<typeof textSources>;

export const getTextSourceOptions = (language: Language) => {
  const t = translations[language];
  return [
    { value: "literature", label: t.literature },
    { value: "randomWords", label: t.randomWords },
    { value: "code", label: t.code },
    { value: "custom", label: t.custom },
  ];
};
