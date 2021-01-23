const modal = document.getElementById('modal')
const modalShow = document.getElementById('show-modal')
const modalClose = document.getElementById('close-modal')
const bookmarkForm = document.getElementById('bookmark-form')
const websiteNameEl = document.getElementById('website-name')
const websiteUrlEl = document.getElementById('website-url')
const bookmarksContainer = document.getElementById('bookmarks-container')

let bookmarks = []

// Show modal and focus on the first input
function showModal() {
    modal.classList.add('show-modal')
    websiteNameEl.focus()
}

modalShow.addEventListener('click', showModal)
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'))
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false ))

// Validate with Regex
function validate(nameValue, urlValue) {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression)
    if (!nameValue || !urlValue) {
        alert('Please submit values for both fields.')
        return false
    }
    if (!urlValue.match(regex)) {
        alert('Please provide a valid web address')
        return false
    }

    // Valid
    return true
}

function buildBookmarks() {
    // remove all
    bookmarksContainer.textContent = ''

    bookmarks.forEach((bookmark) => {
        const { name, url } = bookmark
        // Item
        const item = document.createElement('div')
        item.classList.add('item')
        // close
        const closeIcon = document.createElement('i')
        closeIcon.classList.add('fas', 'fa-times')
        closeIcon.setAttribute('title', 'Delete Bookmark')
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`)
        // favicon / link container
        const linkInfo = document.createElement('div')
        linkInfo.classList.add('name')
        // favicon
        const favicon = document.createElement('img')
        favicon.setAttribute('src', `favicon.png`)
        favicon.setAttribute('alt', 'Favicon')
        // Link
        const link = document.createElement('a')
        link.setAttribute('href', `${url}`)
        link.setAttribute('target', '_blank')
        link.textContent = name
        // Append all
        linkInfo.append(favicon, link)
        item.append(closeIcon, linkInfo)
        bookmarksContainer.appendChild(item)
    })
}

// Fetch Bookmarks from localStorage
function fetchBookmarks() {
    // only if available
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    } else {
        bookmarks = [
            {
                name: 'Jacinto Design',
                url: 'https://jacinto.design'
            }
        ]
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }
    buildBookmarks()
}

function deleteBookmark(url) {
    // the foreach method can become very expensive the more bookmarks you get, a better future proof perf option would be to start the bookmarks as an object
    bookmarks.forEach((bookmark, i) => {
        if (bookmark.url === url) {
            bookmarks.splice(i, 1)
        }
    })
    // Update bookmarks array in localStorage, repopulate DOM
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    fetchBookmarks()
}

function storeBookmark(e) {
    e.preventDefault()
    const nameValue = websiteNameEl.value
    let urlValue = websiteUrlEl.value
    if (!urlValue.includes('http://') && !urlValue.includes('https://')) {
        urlValue = `https://${urlValue}`
    }
    if (!validate(nameValue, urlValue)) {
        return false
    }
    const bookmark = {
        name: nameValue,
        url: urlValue
    }
    bookmarks.push(bookmark)
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    fetchBookmarks()
    bookmarkForm.reset()
    websiteNameEl.focus()
}

bookmarkForm.addEventListener('submit', storeBookmark)
fetchBookmarks()