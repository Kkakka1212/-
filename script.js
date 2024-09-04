const postsData = [];

document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();
    const tagsSelect = document.getElementById('tags');
    const selectedTags = Array.from(tagsSelect.selectedOptions).map(option => option.value);

    const imageSrc = document.getElementById('imagePreview').src;

    if (title && content && selectedTags.length > 0) {
        const newPost = {
            title: title,
            content: content,
            moreContent: '추가적인 내용이 여기에 들어갑니다.',
            tags: selectedTags,
            image: imageSrc
        };

        postsData.push(newPost);
        showChannel('전체');

        document.getElementById('postForm').reset();
        clearImagePreview();
    }
});

document.getElementById('imageInput').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagePreviewContainer = document.getElementById('imagePreviewContainer');
            const imagePreview = document.getElementById('imagePreview');
            const removeImageButton = document.getElementById('removeImageButton');

            imagePreview.src = e.target.result;
            imagePreviewContainer.style.display = 'inline-block';
            removeImageButton.style.display = 'inline';
        };
        reader.readAsDataURL(file);
    }
});

function removeImage() {
    const imageInput = document.getElementById('imageInput');
    clearImagePreview();
    imageInput.value = ''; // 선택된 파일 초기화
}

function clearImagePreview() {
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const removeImageButton = document.getElementById('removeImageButton');

    imagePreview.src = '';
    imagePreviewContainer.style.display = 'none';
    removeImageButton.style.display = 'none';
}

function showChannel(channelName) {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';

    const filteredPosts = postsData.filter(post => post.tags.includes(channelName) || channelName === '전체');

    filteredPosts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <h2>${post.title}</h2>
            <div class="tags">${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
            <p class="post-content">${post.content} <span class="more-content">${post.moreContent}</span></p>
            ${post.image ? `<img src="${post.image}" alt="게시글 이미지" class="post-image">` : ''}
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

// 초기 상태로 전체 게시글 표시
showChannel('전체');
