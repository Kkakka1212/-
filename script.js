const postsData = [
    { title: '첫 번째 게시글', content: '이것은 첫 번째 게시글의 내용입니다.', moreContent: '이곳은 더 많은 내용이 추가된 부분입니다. 사용자는 \'더보기\'를 클릭하여 이 부분을 볼 수 있습니다. 추가적인 내용이 여기에 들어갑니다.', tags: ['공지', '태그1', '태그2'] },
    { title: '두 번째 게시글', content: '이것은 두 번째 게시글의 내용입니다.', moreContent: '여기에 추가적인 긴 내용이 포함됩니다. 사용자는 \'더보기\' 버튼을 클릭하여 이 내용을 볼 수 있습니다.', tags: ['공지', '태그3', '태그4'] },
];

function showChannel(channelName) {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';

    // 필터링된 게시글 데이터
    const filteredPosts = postsData.filter(post => post.tags.includes(channelName));

    filteredPosts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <h2>${post.title}</h2>
            <div class="tags">${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
            <p class="post-content">${post.content} <span class="more-content">${post.moreContent}</span></p>
            <button class="toggle-more" onclick="toggleMore(this)">더보기</button>
            <div class="comment-section">
                <h3>댓글</h3>
                <textarea rows="3" placeholder="댓글을 작성하세요..."></textarea>
                <button type="button" onclick="addComment(this)">댓글 달기</button>
                <ul class="comment-list"></ul>
            </div>
        `;
        postsContainer.appendChild(postDiv);
    });

    // 활성화된 채널 버튼 업데이트
    const channels = document.querySelectorAll('.channel');
    channels.forEach(channel => {
        channel.classList.toggle('active', channel.textContent === channelName);
    });
}

function toggleMore(button) {
    const postContent = button.previousElementSibling;
    const moreContent = postContent.querySelector('.more-content');

    if (moreContent.style.display === 'none') {
        moreContent.style.display = 'inline';
        button.textContent = '접기';
    } else {
        moreContent.style.display = 'none';
        button.textContent = '더보기';
    }
}

function addComment(button) {
    const commentSection = button.parentElement;
    const textarea = commentSection.querySelector('textarea');
    const commentList = commentSection.querySelector('.comment-list');
    const comment = textarea.value.trim();

    if (comment) {
        const li = document.createElement('li');
        li.textContent = comment;
        commentList.appendChild(li);
        textarea.value = '';
    }
}
