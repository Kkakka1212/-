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
