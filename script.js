let tagList = [];

function updateSubTags() {
    const mainTag = document.getElementById('mainTag').value;
    const subTagSelect = document.getElementById('subTag');
    subTagSelect.innerHTML = '';

    if (mainTag) {
        // 예시 소태그 목록
        const subTags = {
            '대태그1': ['소태그1-1', '소태그1-2'],
            '대태그2': ['소태그2-1', '소태그2-2'],
            '대태그3': ['소태그3-1', '소태그3-2'],
            '대태그4': ['소태그4-1', '소태그4-2'],
            '대태그5': ['소태그5-1', '소태그5-2'],
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
    const selectedTag = document.getElementById('subTag').value;
    if (selectedTag && !tagList.includes(selectedTag)) {
        tagList.push(selectedTag);
        const tagDiv = document.createElement('div');
        tagDiv.className = 'tag';
        tagDiv.textContent = selectedTag;
        tagDiv.onclick = function() {
            removeTag(selectedTag);
        };
        document.getElementById('selectedTags').appendChild(tagDiv);
        document.getElementById('subTag').value = '';
    }
}

function removeTag(tag) {
    tagList = tagList.filter(t => t !== tag);
    const tagElements = document.querySelectorAll('.selected-tags .tag');
    tagElements.forEach(element => {
        if (element.textContent === tag) {
            element.remove();
        }
    });
}

function previewImages() {
    const files = document.getElementById('files').files;
    const previewContainer = document.getElementById('imagePreview');
    previewContainer.innerHTML = '';

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'image-item';
            img.dataset.filename = file.name; // 파일 이름을 데이터 속성으로 저장
            
            const removeBtn = document.createElement('button');
            removeBtn.textContent = '삭제';
            removeBtn.onclick = function() {
                removeImage(file.name); // 파일 이름으로 제거
            };
            
            const div = document.createElement('div');
            div.className = 'image-item';
            div.appendChild(img);
            div.appendChild(removeBtn);
            previewContainer.appendChild(div);
        };
        reader.readAsDataURL(file);
    }
}

function removeImage(fileName) {
    const imageItems = document.querySelectorAll('#imagePreview .image-item');
    imageItems.forEach(item => {
        const img = item.querySelector('img');
        if (img && img.dataset.filename === fileName) {
            item.remove(); // 이미지 요소를 DOM에서 제거
        }
    });
}

function toggleComments(element) {
    const commentSection = element.nextElementSibling;
    if (commentSection.style.display === "none" || commentSection.style.display === "") {
        commentSection.style.display = "block";
        element.textContent = "댓글 숨기기";
    } else {
        commentSection.style.display = "none";
        element.textContent = "댓글 보기";
    }
}

function addComment(button) {
    const commentSection = button.parentElement;
    const textarea = commentSection.querySelector('textarea');
    const commentList = commentSection.querySelector('.comment-list');
    const commentText = textarea.value.trim();

    if (commentText) {
        const listItem = document.createElement('li');
        listItem.textContent = commentText;
        commentList.appendChild(listItem);
        textarea.value = '';
    }
}
