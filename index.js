var wordList = [
    { word: 'apple', meaning: '사과', unit: 'fruit' },
    { word: 'banana', meaning: '바나나', unit: 'fruit' },
    { word: 'pear', meaning: '배', unit: 'fruit' },
    { word: 'grape', meaning: '포도', unit: 'fruit' },
    { word: 'peach', meaning: '복숭아', unit: 'fruit' },
    { word: 'strawberry', meaning: '딸기', unit: 'fruit' },
    { word: 'dog', meaning: '개', unit: 'animal' },
    { word: 'elephant', meaning: '코끼리', unit: 'animal' },
    { word: 'cat', meaning: '고양이', unit: 'animal' },
    { word: 'lion', meaning: '사자', unit: 'animal' },
    { word: 'tiger', meaning: '호랑이', unit: 'animal' },
    { word: 'hamster', meaning: '햄스터', unit: 'animal' },
];


function searchWords() {
    var searchInput = document.getElementById('searchWord').value.toLocaleLowerCase();
    var searchResultElement = document.getElementById('searchResult');
    if (!searchResultElement)
        return; //  searchResultElement 가 null 이면 함수 종료
    searchResultElement.innerHTML = '';
    if (searchInput === '') {
        return; // 검색어가 비어있으면 검색 결과 표시하지 않음
    }
    // const matchedWords = wordList.filter(wordObject => {
    //     return wordObject.word.includes(searchInput);
    // });
    // matchedWords.forEach(wordObject => {
    //     const listItem = document.createElement('li');
    //     listItem.textContent = `${wordObject.word}: ${wordObject.meaning}`;
    //     searchResultElement.appendChild(listItem)
    // })


    wordData.words.forEach(function(group) {
        group.list.forEach(function(wordObject) {
            if (wordObject.word.includes(searchInput)) {
                const listItem = document.createElement('li');
                listItem.textContent = `${wordObject.word}: ${wordObject.mean}`;
                searchResultElement.appendChild(listItem);
            }
        });
    });


}
function updateWordList(selectedUnit) {
    var wordListElement = document.getElementById('searchResult2');
    if (!wordListElement)
        return;
    wordListElement.innerHTML = ''; // 목록 초기화

    // wordList.forEach(function (wordObject) {
    //     if (selecteUnit === 'all' || wordObject.unit === selecteUnit) {
    //         var listItem = document.createElement('li');
    //         listItem.textContent = "".concat(wordObject.word, ": ").concat(wordObject.meaning);
    //         wordListElement.appendChild(listItem);
    //     }
    // });

    wordData.words.forEach(function(group) {
        group.list.forEach(function(wordObject) {
            if (selectedUnit === 'all' || wordObject.unit === selectedUnit) {
                var listItem = document.createElement('li');
                listItem.textContent = `${wordObject.word}: ${wordObject.mean}`;
                wordListElement.appendChild(listItem);
            }
        });
    });
}
function changeUnit() {
    var unitSelect = document.getElementById('unitSelect');
    var selecteUnit = unitSelect.value;
    updateWordList(selecteUnit); // 선택된 단원에 해당하는 단어들로 목록을 업데이트
}

var quiz_area = document.querySelector(".quiz_area");
var answerArea = document.querySelector(".answerArea");
var selectedLesson = document.getElementById("quiz_lesson");
var quiz_list = document.querySelector(".quiz_list");
var next_btn = document.querySelector(".next");
var answerCheck_btn = document.querySelector(".answerCheck");
var answerPercent = document.querySelector(".answerPercent");
var choice_word = document.querySelector(".choice_word");
var choice_words = [];
var selectList = [];
var quiz_current = 1;
var quiz_length = 1;
var wrongAnswer = [];
var answer = false;
var answerCount = 0;
var chooseList = [];
// function changeLesson() {
//     var chocieLesson = document.querySelector(".lesson-title");
//     chocieLesson.textContent = "\uC120\uD0DD\uB41C \uB2E8\uC6D0\uC740 ".concat(selectedLesson.value, " \uC785\uB2C8\uB2E4");
//     // if(selectedLesson.value === "lesson"){
//     //     chocieLesson.textContent = ""
//     // }
//     choice_words = [];
//     selectList = [];
//     answerCount = 0;
//     if (selectedLesson.value === "선택") {
//         quiz_list.replaceChildren();
//         choice_word.innerText = "";
//         chocieLesson.textContent = "단원을 선택해주세요";
//     }
//     else {
//         quiz_list.replaceChildren(); // replaceChildren()   js 에서 자식을 모두 삭제하는 함수 
//         var selectedLessonWord = wordList.filter(function (word) { return word.unit === selectedLesson.value; });
//         var randomList = selectedLessonWord.sort(function () { return 0.5 - Math.random(); });
//         var randomNum = Math.floor(Math.random() * randomList.length);
//         var random_box = [];
//         randomList.forEach(function (word) { return selectList.push(word); });
//         quiz_length = randomList.length;
//         choice_words.push(randomList[randomNum]);
//         choice_word.innerText = randomList[randomNum].word;
//         random_box.push(randomList[randomNum].meaning);
//         // console.log(randomList[randomNum]);
//         wrongAnswer = randomList.filter(function (word) { return word.word !== randomList[randomNum].word; });
//         for (var i = 0; i < 3; i++) {
//             random_box.push(wrongAnswer[i].meaning);
//         }
//         random_box.sort(function () { return 0.5 - Math.random(); });
//         // console.log(choice_words);
//         for (var i = 0; i < random_box.length; i++) {
//             var li = document.createElement("li");
//             li.innerText = random_box[i];
//             quiz_list.append(li);
//         }
//         // var selectedAnsArray = Array.from(selectedAnsList); 
//         // console.log(selectedAnsList);
//     }
//     // console.log(choice_words);
// }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function changeLesson() {
    var chocieLesson = document.querySelector(".lesson-title");
    chocieLesson.textContent = "\uC120\uD0DD\uB41C \uB2E8\uC6D0\uC740 ".concat(selectedLesson.value, " \uC785\uB2C8\uB2E4");
    
    choice_words = [];
    selectList = [];
    answerCount = 0;
    
    if (selectedLesson.value === "선택") {
        quiz_list.replaceChildren();
        choice_word.innerText = "";
        chocieLesson.textContent = "단원을 선택해주세요";
    }
    else {
        quiz_list.replaceChildren(); // 자식 요소 모두 제거
        // var selectedLessonWord = wordData.words.find(function (lesson) { return lesson.title === selectedLesson.value; });
        var selectedLessonWord = wordData.words.find(function (lesson) { 
            return lesson.list && lesson.list.some(function (word) { 
                return word.title === selectedLesson.value; 
            });
        });
        // console.log(wordData.words);
        if (!selectedLessonWord) {
            console.error("선택한 단원을 찾을 수 없습니다.");
            return;
        }
        
        var randomList = selectedLessonWord.list.sort(function () { return 0.5 - Math.random(); });
        var randomNum = Math.floor(Math.random() * randomList.length);
        var random_box = [];
        
        randomList.forEach(function (word) { return selectList.push(word); });
        quiz_length = randomList.length;
        choice_words.push(randomList[randomNum]);
        choice_word.innerText = randomList[randomNum].word;
        random_box.push(randomList[randomNum].mean);
        
        var wrongAnswer = randomList.filter(function (word) { return word.word !== randomList[randomNum].word; });
        
        for (var i = 0; i < 3; i++) {
            random_box.push(wrongAnswer[i].mean);
        }
        
        random_box.sort(function () { return 0.5 - Math.random(); });
        
        for (var i = 0; i < random_box.length; i++) {
            var li = document.createElement("li");
            li.innerText = random_box[i];
            quiz_list.append(li);
        }
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// prev_btn.addEventListener("click",function(){
//     console.log("이전버튼");
//     // quiz_num = 
//     // console.log(selectedAnsArray);
// })
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// next_btn.addEventListener("click", function (e) {
//     var selectedAnsList = document.querySelectorAll(".quiz_list li");
//     var selectedAnsArray = Array.from(selectedAnsList);
//     var ansCheck = 0;
//     for (var _i = 0, selectedAnsArray_1 = selectedAnsArray; _i < selectedAnsArray_1.length; _i++) {
//         var selectedAns = selectedAnsArray_1[_i];
//         if (selectedAns.classList.contains("selected")) {
//             // chooseList.push()
//             ansCheck++;
//             // console.log(selectedAns);
//         }
//     }
//     if (ansCheck === 0) {
//         return alert("정답을 입력해주세요");
//     }
//     if (answer === true) {
//         answerCount++;
//     }
//     console.log(answerCount); // 정답 체크
//     quiz_list.replaceChildren();
//     quiz_current++;
    // var exceptList = selectList.filter(function (x) { return !choice_words.includes(x); }); // 차집합 배열 
    // var randomNumber = Math.floor(Math.random() * exceptList.length);
    // wrongAnswer = [];
    // var random_box = [];
    // choice_words.push(exceptList[randomNumber]);
    // choice_word.innerText = exceptList[randomNumber].word;
    // random_box.push(exceptList[randomNumber].meaning);
    // wrongAnswer = selectList.filter(function (word) { return word.word !== exceptList[randomNumber].word; });
    // // console.log(exceptList[randomNumber])
    // // console.log(wrongAnswer);
    // for (var i = 0; i < 3; i++) {
    //     random_box.push(wrongAnswer[i].meaning);
    // }
    // random_box.sort(function () { return 0.5 - Math.random(); });
    // for (var i = 0; i < random_box.length; i++) {
    //     var li = document.createElement("li");
    //     li.innerText = random_box[i];
    //     quiz_list.append(li);
    // }
//     if (quiz_current === quiz_length) {
//         next_btn.style.display = "none";
//         answerCheck_btn.style.display = "block";
//     }
// });
// answerCheck_btn.addEventListener("click", function () {
//     quiz_area.style.display = "none";
//     answerArea.style.display = "block";
//     var percent = Number((answerCount / selectList.length).toFixed(2));
//     answerPercent.innerText = "\uC815\uB2F5\uB960\uC740\n    ".concat(percent * 100, "%\n    ").concat(answerCount, " / ").concat(selectList.length, "\n    ");
// });
// 문제에서 답 선택하기 부분 
// quiz_list.addEventListener("click", function (e) {
//     var target = e.target;
//     var allList = document.querySelectorAll(".quiz_list li");
//     allList.forEach(function (li) {
//         li.classList.remove("selected"); // 모든 li 요소에서 selected 클래스 제거
//     });
//     if (target && target.matches(".quiz_list li")) {
//         target.classList.add("selected"); // 클릭된 li에 selected 클래스 추가
//     }
//     if (choice_words[choice_words.length - 1].meaning === target.innerText) { // 정답확인
//         answer = true;
//     }
//     else {
//         answer = false;
//     }
//     // console.log(choice_words[choice_words.length -1].meaning === target.innerText);
// });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function shuffleArray(array) {                      // Fisher-Yates 알고리즘을 사용하여 배열을 섞는 함수
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

next_btn.addEventListener("click", function (e) {
    var selectedAnsList = document.querySelectorAll(".quiz_list li");
    var selectedAnsArray = Array.from(selectedAnsList);
    var ansCheck = 0;
    for (var _i = 0, selectedAnsArray_1 = selectedAnsArray; _i < selectedAnsArray_1.length; _i++) {
        var selectedAns = selectedAnsArray_1[_i];
        if (selectedAns.classList.contains("selected")) {
            // chooseList.push()
            ansCheck++;
            // console.log(selectedAns);
        }
    }
    if (ansCheck === 0) {
        return alert("정답을 입력해주세요");
    }
    if (answer === true) {
        answerCount++;
    }
    console.log(answerCount); // 정답 체크
    quiz_list.replaceChildren();
    quiz_current++;

    var selectedLessonWords = wordData.words.find(function (lesson) {
        return lesson.list.some(function (word) {
            return word.title === selectedLesson.value;
        });
    });
    
    if (selectedLessonWords) {
        selectedLessonWords = selectedLessonWords.list;
    } else {
        // 선택한 단원에 대한 데이터를 찾을 수 없는 경우에 대한 처리
    }

    var exceptList = selectedLessonWords.filter(function (x) { return !choice_words.includes(x); }); // 차집합 배열 
    var randomNumber = Math.floor(Math.random() * exceptList.length);
    wrongAnswer = [];
    var random_box = [];
    choice_words.push(exceptList[randomNumber]);
    choice_word.innerText = exceptList[randomNumber].word;
    random_box.push(exceptList[randomNumber].mean);
    wrongAnswer = selectedLessonWords.filter(function (word) { return word.word !== exceptList[randomNumber].word; });
    wrongAnswer = shuffleArray(wrongAnswer) // 배열을 한번 섞음

    for (var i = 0; i < 3; i++) {
        random_box.push(wrongAnswer[i].mean);
    }
    
    random_box.sort(function () { return 0.5 - Math.random(); });
    for (var i = 0; i < random_box.length; i++) {
        var li = document.createElement("li");
        li.innerText = random_box[i];
        quiz_list.append(li);
    }

    if (quiz_current === quiz_length) {
        next_btn.style.display = "none";
        answerCheck_btn.style.display = "block";
    }
});

answerCheck_btn.addEventListener("click", function () {
    // if (ansCheck === 0) {
        // return alert("정답을 입력해주세요");
    // }
    if (answer === true) {
        answerCount++;
    }
    quiz_area.style.display = "none";
    answerArea.style.display = "block";
    var selectedLessonWords = wordData.words.find(function (lesson) {
        return lesson.list.some(function (word) {
            return word.title === selectedLesson.value;
        });
    }).list;
    var percent = Number((answerCount / selectedLessonWords.length).toFixed(2));
    answerPercent.innerText = "\uC815\uB2F5\uB960\uC740\n    ".concat(percent * 100, "%\n    ").concat(answerCount, " / ").concat(selectedLessonWords.length, "\n    ");
});

quiz_list.addEventListener("click", function (e) {
    var target = e.target;
    var allList = document.querySelectorAll(".quiz_list li");
    allList.forEach(function (li) {
        li.classList.remove("selected"); // 모든 li 요소에서 selected 클래스 제거
    });
    if (target && target.matches(".quiz_list li")) {
        target.classList.add("selected"); // 클릭된 li에 selected 클래스 추가
        var selectedMeaning = target.innerText;
        var currentChoice = choice_words[choice_words.length - 1];
        if (currentChoice && currentChoice.mean === selectedMeaning) { // 정답확인
            answer = true;
        } else {
            answer = false;
        }
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// console.log(updateWordList("animal"));
// 페이지 로드 시 전체 단어 목록 표시
// updateWordList('all');