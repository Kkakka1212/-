script>
    // 좋아요 버튼 클릭 시 좋아요 수 증가 및 취소
    function likePost(button) {
        // 현재 좋아요 수 가져오기
        const likeCountSpan = button.querySelector('.like-count');
        let likeCount = parseInt(likeCountSpan.textContent, 10);
        const isLiked = button.classList.contains('liked');

        if (isLiked) {
            // 좋아요 취소
            likeCount--;
            button.classList.remove('liked'); // 'liked' 클래스 제거
        } else {
            // 좋아요 추가
            likeCount++;
            button.classList.add('liked'); // 'liked' 클래스 추가
        }

        // 좋아요 수 업데이트
        likeCountSpan.textContent = likeCount;
    }
</script>
