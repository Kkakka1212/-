let tagList = [];
let fileList = [];

function updateSubTags() {
    const mainTag = document.getElementById('mainTag').value;
    const subTagSelect = document.getElementById('subTag');
    subTagSelect.innerHTML = '';

    if (mainTag) {
        const subTags = {
            '태그1': ['소태그1-1', '소태그1-2'],
            '태그2': ['소태그2-1', '소태그2-2'],
            '태그3': ['소태그3-1', '소태그3-2'],
            '태그4': ['소태그4-1', '소태그4-2'],
            '태그5': ['소태그5-1', '소태그5-2'],
        };

        subTags[mainTag].forEach(tag => {
            const option = document.createElement('option');
            option.value = tag;
            option.textContent = tag;
            subTagSelect.appendChild(option);
        });
    }
}

function addTag() {
    const mainTag = document.getElementById('mainTag').value;
    const subTag = document.getElementById('subTag').value;

    if (mainTag && !tagList.includes(mainTag)) {
        tagList.push(mainTag);
    }

    if (subTag && !tagList.includes(subTag)) {
        tagList.push(subTag);
    }

    renderSelectedTags();
}

function renderSelectedTags() {
    const selectedTagsDiv = document.getElementById('selectedTags');
    selectedTagsDiv.innerHTML = '';

    tagList.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'tag';
        tagSpan.textContent = tag;
        selectedTagsDiv.appendChild(tagSpan);
    });
}

function previewImages() {
    const fileInput = document.getElementById('files');
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.innerHTML = '';

    Array.from(fileInput.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'image-item';
            const btn = document.createElement('button');
            btn.textContent = '삭제';
            btn.onclick = function() {
                removeImage(file);
            };
            const container = document.createElement('div');
            container.className = 'image-item-container';
            container.appendChild(img);
            container.appendChild(btn);
            imagePreview.appendChild(container);
        };
        reader.readAsDataURL(file);
    });
}

function removeImage(fileToRemove) {
    fileList = Array.from(document.getElementById('files').files).filter(file => file !== fileToRemove);
    const dataTransfer = new DataTransfer();
    fileList.forEach(file => dataTransfer.items.add(file));
    document.getElementById('files').files = dataTransfer.files;
    previewImages();
}

function showChannel(channelName) {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = ''; // 기존 게시글 제거

    // 게시글 필터링 및 추가 (예시 데이터)
    const posts = getPosts(); // 게시글 데이터를 가져오는 함수
    const filteredPosts = posts.filter(post => post.tags.includes(channelName));

    filteredPosts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <h2>${post.title}</h2>
            <div class="tags">${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
            <p>${post.content}</p>
            <div class="comment-section">
                <h3>댓글</h3>
                <textarea rows="3" placeholder="댓글을 작성하세요..."></textarea>
                <button type="button" onclick="addComment(this)">댓글 달기</button>
                <ul class="comment-list"></ul>
            </div>
        `;
        postsContainer.appendChild(postDiv);
    });

    // 활성화된 채널 메뉴 항목 업데이트
    const channels = document.querySelectorAll('.channel');
    channels.forEach(channel => {
        channel.classList.toggle('active', channel.textContent === channelName);
    });
}

function getPosts() {
    // 예시 게시글 데이터
    return [
        { title: '첫 번째 게시글', content: '이것은 첫 번째 게시글의 내용입니다.', tags: ['공지', '태그1', '태그2'] },
        { title: '두 번째 게시글', content: '이것은 두 번째 게시글의 내용입니다.', tags: ['공지', '태그3', '태그4'] },
        // 실제 데이터는 서버에서 받아오는 부분으로 대체
    ];
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
