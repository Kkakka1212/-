// 태그 선택 기능
function updateSelectedTag() {
    const tagSelect = document.getElementById('tags');
    const selectedTag = tagSelect.options[tagSelect.selectedIndex].text;
    document.getElementById('selectedTag').textContent = `선택된 태그: ${selectedTag}`;
}

// 이미지 미리보기 기능
function previewImage() {
    const fileInput = document.getElementById('imageUpload');
    const previewContainer = document.getElementById('imagePreviewContainer');
    
    previewContainer.innerHTML = ''; // 기존 미리보기 삭제

    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;

            const removeBtn = document.createElement('div');
            removeBtn.textContent = '삭제';
            removeBtn.classList.add('removeImageBtn');
            removeBtn.onclick = function() {
                fileInput.value = ''; // 파일 선택 취소
                previewContainer.innerHTML = ''; // 미리보기 삭제
            };

            previewContainer.appendChild(img);
            previewContainer.appendChild(removeBtn);
        };
        reader.readAsDataURL(file);
    }
}

// 게시글 작성 기능
function submitPost(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const selectedTag = document.getElementById('tags').value;

    const postsContainer = document.getElementById('postsContainer');
    const newPost = document.createElement('div');
    newPost.classList.add('post');
    newPost.setAttribute('data-tags', selectedTag);

    newPost.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
        <p><strong>태그:</strong> ${selectedTag}</p>
    `;

    postsContainer.appendChild(newPost);
    document.getElementById('postForm').reset();
    document.getElementById('selectedTag').textContent = '선택된 태그 없음';
    document.getElementById('imagePreviewContainer').innerHTML = ''; // 이미지 미리보기 초기화
}

// 게시글 필터링 (태그에 따라)
function filterPosts(tag) {
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        if (tag === '전체' || post.getAttribute('data-tags') === tag) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    // 이미지 미리보기 기능
    const imageInput = document.getElementById('imageInput');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const imagePreview = document.getElementById('imagePreview');
    
    imageInput.addEventListener('change', () => {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                imagePreviewContainer.style.display = 'flex';
            };
            reader.readAsDataURL(file);
        }
 
        // 이미지 삭제 기능
    document.getElementById('removeImageButton').addEventListener('click', () => {
        imagePreview.src = '';
        imagePreviewContainer.style.display = 'none';
        imageInput.value = '';
    });
});
