// 댓글 창 열고 닫기 기능
document.querySelectorAll('.toggle-comments').forEach(function(toggle) {
    toggle.addEventListener('click', function() {
        const commentSection = this.nextElementSibling;
        if (commentSection.style.display === 'none' || commentSection.style.display === '') {
            commentSection.style.display = 'block';
            this.textContent = '댓글 숨기기';
        } else {
            commentSection.style.display = 'none';
            this.textContent = '댓글 보기';
        }
    });
});

// 댓글 추가 기능
function addComment(button) {
    const commentSection = button.closest('.comment-section');
    const textarea = commentSection.querySelector('textarea');
    const commentList = commentSection.querySelector('.comment-list');

    if (textarea.value.trim() !== '') {
        const newComment = document.createElement('li');
        newComment.textContent = textarea.value;
        commentList.appendChild(newComment);
        textarea.value = ''; // 텍스트 필드 초기화
    } else {
        alert('댓글을 작성하세요!');
    }
}

// 대분류와 소분류 연결
document.getElementById('category').addEventListener('change', function() {
    const subcategory = document.getElementById('subcategory');
    subcategory.innerHTML = ''; // 기존 소분류 옵션 삭제

    let options = [];

    switch (this.value) {
        case 'technology':
            options = ['소프트웨어', '하드웨어', '인공지능'];
            break;
        case 'health':
            options = ['영양', '운동', '정신 건강'];
            break;
        case 'entertainment':
            options = ['영화', '음악', '게임'];
            break;
        default:
            options = [];
    }

    options.forEach(function(option) {
        const opt = document.createElement('option');
        opt.value = option.toLowerCase();
        opt.textContent = option;
        subcategory.appendChild(opt);
    });
});
