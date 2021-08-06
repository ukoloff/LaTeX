setTimeout(init)

function init() {
  var [src, dst] = document.forms[0].getElementsByTagName('textarea')

  src.focus()
  src.oninput = update
  setTimeout(update, 112)


  var prev
  function update() {
    if (prev == src.value) return
    prev = src.value

    dst.value = prev
  }
}
