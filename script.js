// script.js

const postsContainer = document.getElementById('postsContainer');
const imagePreview = document.getElementById('imagePreview');
const selectedTags = document.getElementById('selectedTags');
const tagSelect = document.getElementById('tagSelect');

// 예시 게시글 데이터
const posts = [
    { title: '안내글', content: '태그를 다세요! 태그를 설정한뒤 글을 업로드 하여야 서버 저장에 용이합니다!', tags: ['태그1'] },
    { title: '두 번째 게시글', content: '이미지 첨부 기능은 테스트 기능입니다. 작동 여부가 확실치 못합니다', tags: ['태그2'] }
];

// 게시글을 화면에 표시하는 함수
function displayPosts(posts) {
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <div class="tags">${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
            <p>${post.content}</p>
        `;
        postsContainer.appendChild(postElement);
    });
}

// 검색 기능 구현
function searchPosts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
    );
    displayPosts(filteredPosts);
}

// 이미지 미리보기 및 삭제 기능
function previewImages() {
    imagePreview.innerHTML = '';
    const files = document.getElementById('files').files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(event) {
            const imageItem = document.createElement('div');
            imageItem.classList.add('image-item');

            const img = document.createElement('img');
            img.src = event.target.result;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '삭제';
            deleteButton.onclick = function() {
                const newFiles = Array.from(files).filter((_, index) => index !== i);
                const dataTransfer = new DataTransfer();
                newFiles.forEach(file => dataTransfer.items.add(file));
                document.getElementById('files').files = dataTransfer.files;
                previewImages(); // 업데이트된 이미지 미리보기
            };

            imageItem.appendChild(img);
            imageItem.appendChild(deleteButton);
            imagePreview.appendChild(imageItem);
        };

        reader.readAsDataURL(file);
    }
}

// 태그 추가 및 삭제 기능
function addTag() {
    const tag = tagSelect.value;
    if (tag && !Array.from(selectedTags.children).some(child => child.textContent === tag)) {
        const tagItem = document.createElement('span');
        tagItem.textContent = tag;
        tagItem.classList.add('tag');
        tagItem.onclick = function() {
            selectedTags.removeChild(tagItem);
        };
        selectedTags.appendChild(tagItem);
        tagSelect.value = ''; // 선택한 태그 초기화
    }
}

// 초기 게시글 표시
displayPosts(posts);
