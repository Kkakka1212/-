// 기본 게시글 추가
document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('postsContainer');
    
    const initialPost = {
        title: "공지 사항입니다",
        content: "여기에 공지 내용이 들어갑니다.",
        tags: ["공지"],
        imageUrl: ""
    };

    addPostToContainer(initialPost);

    function addPostToContainer(post) {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.dataset.tags = post.tags.join(',');

        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            ${post.imageUrl ? `<img src="${post.imageUrl}" alt="첨부 이미지">` : ''}
        `;
        
        postsContainer.appendChild(postElement);
    }

    window.addPostToContainer = addPostToContainer;
});

// 게시글 검색 기능
function searchPosts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const posts = document.querySelectorAll('#postsContainer .post');

    posts.forEach(post => {
        const title = post.querySelector('h3').textContent.toLowerCase();
        const tags = post.dataset.tags.toLowerCase();

        if (title.includes(searchInput) || tags.includes(searchInput)) {
            post.style.display = '';
        } else {
            post.style.display = 'none';
        }
    });
}

// 이미지 미리보기 및 삭제 기능
const imageInput = document.getElementById('imageInput');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
const imagePreview = document.getElementById('imagePreview');

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreviewContainer.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

function removeImage() {
    imagePreview.src = '';
    imagePreviewContainer.style.display = 'none';
    imageInput.value = '';
}
