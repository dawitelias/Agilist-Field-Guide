var insetLarge = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--inset-lg'), 10)
const header = document.querySelector('header')
const nav = document.querySelector('.block--nav')
const modal = document.querySelector('.block--modal')
const modalLinks = document.querySelectorAll('.block--modal a')
var mobileWindowSize = window.matchMedia("(min-width: 900px)")
const linkBlocks = document.querySelectorAll('.block--link')
const sidebarLinks = document.querySelectorAll('aside li a')

function toggleOpen() {
    nav.classList.toggle('open')
    document.body.classList.toggle('modal-open') // fix body position while modal open

    if (this.classList.contains('open')) {
    modal.style.display = 'flex'
    document.querySelector('.block--nav span').innerHTML = 'Close'
    document.querySelector('.block--nav i').innerHTML = 'close'

    } else { 
        modal.style.display = 'none'
        document.querySelector('.block--nav span').innerHTML = 'Jump to'
        document.querySelector('.block--nav i').innerHTML = 'menu'
    }
}

document.body.classList.remove('fade-out')
nav.addEventListener('click', toggleOpen)
modalLinks.forEach(modalLink => modalLink.addEventListener('click', toggleOpen))
windowResizedToMobile(mobileWindowSize) // Call listener function at run time
mobileWindowSize.addListener(windowResizedToMobile) // Attach listener function on state changes

function windowResizedToMobile(a) {
    if (mobileWindowSize.matches) { // If media query matches
        if (nav.classList.contains('open')) {
            modal.style.display = 'none'
            document.querySelector('.block--nav span').innerHTML = 'Jump to'
            document.querySelector('.block--nav i').innerHTML = 'menu'
            nav.classList.toggle('open')
            document.body.classList.toggle('modal-open')
        }
    }
}

// smooth scroll to link section
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault()
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' }) 
    })
})

function isScrolledIntoView(elem) {
    var rect = elem.getBoundingClientRect()
    var isVisible = rect.top <= insetLarge && rect.bottom > insetLarge
    
    return isVisible
}

window.onscroll = function() { 
    if (this.scrollY > insetLarge) { 
        header.classList.add('scrolled')
    } else { header.classList.remove('scrolled') }

    linkBlocks.forEach(linkBlock => {
        sidebarLinks.forEach(sidebarLink => {
            // if the link block is scrolled into view
            if (isScrolledIntoView(linkBlock)) {
                // check if the link block's current id matches the href of the sidebar link
                if (sidebarLink.href.includes(linkBlock.id)) {
                    // if it's a match, give the sidebar link a class of 'current'
                    sidebarLink.parentElement.classList.add('current')
                } else { sidebarLink.parentElement.classList.remove('current') }
                // if scrolled back up to the top (past the first link block), remove 'current' class from the sidebar
            } else if (this.scrollY < linkBlocks[0].offsetTop) { sidebarLink.parentElement.classList.remove('current') }
            
        });
    });
}