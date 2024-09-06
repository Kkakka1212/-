const imagePreview = document.getElementById('imagePreview');
const selectedTags = document.getElementById('selectedTags');
const tagSelect = document.getElementById('tagSelect');

function previewImages() {
    imagePreview.innerHTML = ''; // 이전 이미지 미리보기 삭제
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
                imageItem.remove(); // 이미지 삭제
            };

            imageItem.appendChild(img);
            imageItem.appendChild(deleteButton);
            imagePreview.appendChild(imageItem);
        };

        reader.readAsDataURL(file);
    }
}

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
