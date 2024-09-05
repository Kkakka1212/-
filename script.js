// 태그 선택 시, 선택된 태그명 표시
function updateSelectedTags() {
    const select = document.getElementById('tags');
    const selectedOptions = Array.from(select.selectedOptions);
    const selectedTags = selectedOptions.map(option => option.text).join(', ');

    const selectedTagsText = selectedTags ? `선택된 태그: ${selectedTags}` : '선택된 태그 없음';
    document.getElementById('selectedTags').textContent = selectedTagsText;
}

// 이미지 미리보기 및 삭제 기능
function previewImage(event) {
    const input = event.target;
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const removeImageButton = document.getElementById('removeImageButton');

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            imagePreviewContainer.style.display = 'block';
            removeImageButton.style.display = 'inline';
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function removeImage() {
    const input = document.getElementById('imageInput');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const removeImageButton = document.getElementById('removeImageButton');

    input.value = '';  // 입력값 초기화
    imagePreview.src = '';  // 이미지 미리보기 초기화
    imagePreviewContainer.style.display = 'none';
    removeImageButton.style.display = 'none';
}
