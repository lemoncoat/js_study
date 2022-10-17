//전역변수, 함수 정의 영역

//게임데이터 객체
//실제 정답, 사용자 선택한 정답, 최소값, 최대값
//x이상 y이하 랜덤 정수 생성 공식
//Math.floor(Math.random()*(y-x+1))+x
const gameDatas = {
    secret: Math.floor(Math.random()*100)+1,
    answer: null,
    min:1 ,
    max:100
};
//숫자 아이콘 생성 함수
function makeIcons(){

    const $numbers = document.getElementById('numbers');
    const $middle = document.createDocumentFragment();
    for(let n=1; n<=100; n++){
        const $div = document.createElement('div');
        $div.classList.add('icon');
        $div.textContent=n;
        $middle.appendChild($div);
    }
    $numbers.appendChild($middle);
}
//아이콘 지우기
function clearIcons($target, isUp){
    const $numbers = document.getElementById('numbers');

    let $delTarget = $target;
    while($delTarget !== null){
        let $next = isUp   
                        ? $delTarget.previousElementSibling
                        : $delTarget.nextElementSibling;
        $numbers.removeChild($delTarget);
        $delTarget = $next;
    }
}
//업다운 렌더링 처리
function proceesUpDownCase($target,isUp){
    const ANI_CLASS_NAME = 'selected';
    const [$up,$down] = [...document.querySelector('aside.result').children]


    if(isUp){ //up인경우
        $down.classList.remove(ANI_CLASS_NAME);
        $up.classList.add(ANI_CLASS_NAME);
        gameDatas.min=gameDatas.answer+1;
        document.getElementById('begin').textContent=gameDatas.min;
    }else{ //down인경우
        $up.classList.remove(ANI_CLASS_NAME);
        $down.classList.add(ANI_CLASS_NAME);
        gameDatas.max=gameDatas.answer-1;
        document.getElementById('end').textContent=gameDatas.max;
    }
    clearIcons($target, isUp);
}
//정답시 화면 렌더링 처리    
function processCorrect($target){
    //1.축하박스 등장 처리
    document.getElementById('finish').classList.add('show');
    //2.정답 아이콘에 id = move부여
    $target.setAttribute('id','move');

    document.getElementById('numbers').onclick=null;
}
//정답 검증
function checkAnswer($target){

    //객체 디스트럭처링
    const {secret, answer} = gameDatas;

    if(secret===answer){ //정답인경우
        processCorrect($target);
    }else if(secret>answer){ //up인경우
        proceesUpDownCase($target,true);
    }else{//다운인경우
        proceesUpDownCase($target,false);
    }

}
//실행코드 영역
(function(){
    //백개의 아이콘 그리기
    makeIcons();

    const $numbers = document.getElementById('numbers');
    $numbers.onclick= function (e){
        if(!e.target.matches('#numbers .icon')) return;
        // console.log('아이콘 클릭');
        //사용자가 선택한 숫자를 객체에 answer프로퍼티에 저장
        gameDatas.answer= +e.target.textContent;
        console.log(gameDatas);
        
        //정담 검증
        checkAnswer(e.target);
    };
}) ();